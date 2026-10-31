import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  shape: 'circle' | 'star';
  rotation: number;
  rotationSpeed: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  color: string;
  lineWidth: number;
}

interface CoreFlash {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

const PALETTE = [
  '#00F0FF', // Cyan
  '#A855F7', // Neon Purple
  '#EC4899', // Hot Pink
  '#B600A8', // Magenta
  '#FF7A00', // Amber Orange
  '#38BDF8', // Sky Blue
  '#FFFFFF', // Pure White
];

export const ClickSparkEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const flashesRef = useRef<CoreFlash[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // 1. Render Core Flashes
      const flashes = flashesRef.current;
      for (let i = flashes.length - 1; i >= 0; i--) {
        const flash = flashes[i];
        flash.alpha -= flash.decay;
        if (flash.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          flash.x,
          flash.y,
          0,
          flash.x,
          flash.y,
          flash.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flash.alpha * 0.9})`);
        gradient.addColorStop(0.4, `${flash.color}${Math.floor(flash.alpha * 200).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Shockwaves
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const wave = shockwaves[i];
        wave.radius += (wave.maxRadius - wave.radius) * 0.22;
        wave.alpha -= wave.decay;

        if (wave.alpha <= 0 || wave.radius >= wave.maxRadius - 1) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = Math.max(0, wave.alpha);
        ctx.lineWidth = wave.lineWidth * (wave.alpha + 0.2);
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render Particles / Sparks
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.93; // Air friction
        p.vy *= 0.93;
        p.vy += 0.12; // Gentle gravity
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.shape === 'star') {
          drawStar(ctx, 0, 0, 4, p.size * 2, p.size * 0.6);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Keep running if there are items left, otherwise idle
      if (particles.length > 0 || shockwaves.length > 0 || flashes.length > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        isRunningRef.current = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const startLoopIfNeeded = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    const spawnClickEffect = (x: number, y: number) => {
      // 1. Core flash at click point
      const primaryColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      flashesRef.current.push({
        x,
        y,
        radius: 28,
        alpha: 0.9,
        decay: 0.08,
        color: primaryColor,
      });

      // 2. Primary expanding shockwave
      shockwavesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: 52,
        alpha: 0.85,
        decay: 0.045,
        color: primaryColor,
        lineWidth: 2.5,
      });

      // 3. Secondary offset shockwave
      const secondaryColor = PALETTE[(PALETTE.indexOf(primaryColor) + 2) % PALETTE.length];
      shockwavesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: 36,
        alpha: 0.7,
        decay: 0.05,
        color: secondaryColor,
        lineWidth: 1.8,
      });

      // 4. Burst of dynamic particles (16 to 22 sparks)
      const particleCount = 18 + Math.floor(Math.random() * 6);
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.45;
        const speed = 3.5 + Math.random() * 5.5;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const shape = Math.random() > 0.45 ? 'star' : 'circle';
        const size = shape === 'star' ? 2.5 + Math.random() * 2 : 1.5 + Math.random() * 2.5;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          color,
          alpha: 1,
          decay: 0.02 + Math.random() * 0.025,
          shape,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.25,
        });
      }

      startLoopIfNeeded();
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Trigger effect for left click or touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      spawnClickEffect(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    />
  );
};

export default ClickSparkEffect;
