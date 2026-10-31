import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring trailing effect
  const springConfig = { damping: 24, stiffness: 260, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch-only devices to avoid showing custom cursor
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive]'
        );
        setIsPointer(!!interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsClicking(true);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. Fast Center Dot (snappy directly under pointer) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99998] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isClicking ? '#00F0FF' : '#A855F7',
          boxShadow: isClicking
            ? '0 0 10px #00F0FF, 0 0 20px #00F0FF'
            : '0 0 8px #A855F7',
        }}
        animate={{
          scale: isClicking ? 0.6 : isPointer ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />

      {/* 2. Fluid Trailing Ring with Click Squash & Expand Animations */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99997]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 48 : 30,
          height: isPointer ? 48 : 30,
          scale: isClicking ? 0.68 : 1,
          borderWidth: isClicking ? '2.5px' : '1.5px',
          borderColor: isClicking
            ? '#00F0FF'
            : isPointer
            ? '#EC4899'
            : 'rgba(215, 226, 234, 0.45)',
          backgroundColor: isClicking
            ? 'rgba(0, 240, 255, 0.15)'
            : isPointer
            ? 'rgba(236, 72, 153, 0.1)'
            : 'rgba(255, 255, 255, 0.02)',
          boxShadow: isClicking
            ? '0 0 16px rgba(0, 240, 255, 0.6), inset 0 0 8px rgba(0, 240, 255, 0.4)'
            : isPointer
            ? '0 0 14px rgba(236, 72, 153, 0.4)'
            : '0 0 0px transparent',
        }}
        transition={{
          scale: { type: 'spring', damping: 18, stiffness: 450 },
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          borderColor: { duration: 0.15 },
          backgroundColor: { duration: 0.15 },
        }}
      />
    </>
  );
};

export default CustomCursor;
