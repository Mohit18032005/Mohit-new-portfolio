import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send, Check, Copy } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mk8212581@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121318] border-2 border-[#D7E2EA] rounded-[36px] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-[#D7E2EA] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-[#D7E2EA]"
        >
          <X className="w-5 h-5" />
        </motion.button>


        <span className="text-xs uppercase tracking-widest text-purple-400 font-mono">
          Get in Touch
        </span>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 mb-2">
          Contact Mohit
        </h3>
        <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mb-6 font-light">
          Have a project, research collaboration, or opportunity? Drop me a message or reach out directly.
        </p>

        {/* Quick Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-xs font-mono truncate">mk8212581@gmail.com</span>
            </div>
            <motion.button
              onClick={handleCopyEmail}
              whileTap={{ scale: 0.88 }}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-[#D7E2EA]/70 hover:text-white cursor-pointer"
              title="Copy Email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </motion.button>
          </div>

          <a
            href="tel:8509309241"
            className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="font-mono">+91 8509309241</span>
          </a>
        </div>

        {formSent ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center my-6">
            <Check className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-lg font-bold text-white uppercase">Message Sent!</h4>
            <p className="text-xs text-[#D7E2EA]/80 mt-1">Thank you for reaching out. Mohit will reply soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1">Message</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Mohit, I'd like to collaborate on..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-medium uppercase tracking-widest text-xs transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </motion.button>
          </form>
        )}

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D7E2EA]/60">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span>Kolkata, WB &bull; IEM &apos;27</span>
          </div>
          <a
            href="mailto:mk8212581@gmail.com"
            className="text-purple-400 hover:underline"
          >
            Direct Mail &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
