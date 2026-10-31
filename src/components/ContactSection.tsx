import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { Mail, Phone, MapPin, Award, GraduationCap, Briefcase, Check, Copy, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("mk8212581@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const certifications = [
    { name: "Artificial Intelligence Intern (AICTE & ICAC)", issuer: "Codec Technologies", date: "May - June 2026" },
    { name: "Artificial Intelligence on Microsoft Azure", issuer: "Microsoft", date: "October 2025" },
    { name: "Foundations: Data, Data, Everywhere", issuer: "Google", date: "October 2025" },
    { name: "Generative AI: Intro & Applications", issuer: "IBM", date: "October 2025" },
    { name: "Introduction to Artificial Intelligence", issuer: "IBM", date: "October 2025" },
    { name: "Data Analytics Job Simulation", issuer: "Deloitte", date: "November 2025" },
    { name: "Cyber Job Simulation", issuer: "Deloitte", date: "October 2025" },
    { name: "Advanced System Security Topics", issuer: "Univ of Colorado", date: "October 2025" },
    { name: "Technology Job Simulation", issuer: "Deloitte", date: "November 2025" },
    { name: "Cyber Security Fundamentals", issuer: "Univ of London", date: "October 2025" },
    { name: "Data Analyst Career Guide", issuer: "IBM", date: "October 2025" },
    { name: "Ignite India Entrepreneurial Program", issuer: "Wadhwani Foundation", date: "October 2025" },
  ];

  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] border-t border-[#D7E2EA]/15 pt-20 pb-16 px-5 sm:px-8 md:px-10 relative select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={30} className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
            Get In Touch
          </span>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none mt-2"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Let&apos;s Connect
          </h2>
          <p className="mt-4 text-[#D7E2EA]/70 max-w-xl mx-auto text-sm sm:text-base font-light">
            Available for AI/ML engineering roles, robotics research, embedded IoT projects, and collaborative ventures.
          </p>
        </FadeIn>

        {/* 3 Main Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Experience */}
          <FadeIn delay={0.1} y={30} className="h-full">
            <div className="p-6 sm:p-8 rounded-[32px] border border-[#D7E2EA]/20 bg-[#141418] h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-widest text-purple-400 font-medium">
                  Experience
                </span>
                <h3 className="text-xl font-bold uppercase text-[#D7E2EA] mt-1 mb-2">
                  AI Intern
                </h3>
                <p className="text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                  Codec Technologies Pvt. Ltd. (Remote) &bull; May - June 2026
                </p>
                <p className="text-xs text-[#D7E2EA]/60 mt-3 leading-relaxed">
                  AICTE & ICAC approved national portal internship. Assisted in developing AI algorithms and automating machine learning data pipelines.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#D7E2EA]/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AICTE & ICAC Verified</span>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Education */}
          <FadeIn delay={0.2} y={30} className="h-full">
            <div className="p-6 sm:p-8 rounded-[32px] border border-[#D7E2EA]/20 bg-[#141418] h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-900/30 border border-blue-500/30 flex items-center justify-center mb-6 text-blue-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-widest text-blue-400 font-medium">
                  Education
                </span>
                <h3 className="text-xl font-bold uppercase text-[#D7E2EA] mt-1 mb-2">
                  B.Tech CSE (AI)
                </h3>
                <p className="text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                  Institute of Engineering & Management (IEM), Kolkata
                </p>
                <p className="text-xs text-[#D7E2EA]/60 mt-3 leading-relaxed">
                  Expected 2027 &bull; Specializing in AI, Machine Learning, Robotics, and Embedded Systems Architecture.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#D7E2EA]/70">
                Sabrakone HS (76.6%) &bull; Saldha HS (81%)
              </div>
            </div>
          </FadeIn>

          {/* Card 3: Contact Channels */}
          <FadeIn delay={0.3} y={30} className="h-full">
            <div className="p-6 sm:p-8 rounded-[32px] border border-[#D7E2EA]/20 bg-[#141418] h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-900/30 border border-pink-500/30 flex items-center justify-center mb-6 text-pink-400">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-widest text-pink-400 font-medium">
                  Direct Contact
                </span>
                <h3 className="text-xl font-bold uppercase text-[#D7E2EA] mt-1 mb-3">
                  Mohit Khan
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <motion.button
                    onClick={copyEmail}
                    whileTap={{ scale: 0.96 }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left group cursor-pointer"
                  >
                    <span className="font-mono text-xs text-[#D7E2EA]">mk8212581@gmail.com</span>
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#D7E2EA]/50 group-hover:text-white" />
                    )}
                  </motion.button>

                  <a
                    href="tel:8509309241"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs text-[#D7E2EA]"
                  >
                    <Phone className="w-4 h-4 text-purple-400" />
                    <span>+91 8509309241</span>
                  </a>

                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 text-xs text-[#D7E2EA]/70">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>Kolkata, West Bengal, India</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <ContactButton
                  label="Send An Email"
                  href="mailto:mk8212581@gmail.com?subject=Opportunity / Project Collaboration"
                  className="w-full"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Certifications Banner */}
        <FadeIn delay={0.4} y={30} className="mb-16">
          <div className="p-6 sm:p-8 rounded-[36px] border border-[#D7E2EA]/20 bg-[#111216]">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-purple-400" />
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#D7E2EA]">
                Industry Certifications & Credentials
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono uppercase text-purple-400 tracking-wider">
                    {cert.issuer}
                  </span>
                  <h4 className="text-xs sm:text-sm font-medium text-[#D7E2EA] my-2 leading-snug">
                    {cert.name}
                  </h4>
                  <span className="text-[10px] text-[#D7E2EA]/50 font-light">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-[#D7E2EA]/50">
          <p>© {new Date().getFullYear()} MD Mohit Khan. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:mk8212581@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href="tel:8509309241"
              className="hover:text-white transition-colors"
            >
              Phone
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
