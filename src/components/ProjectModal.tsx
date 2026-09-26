import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from './Icons';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [selectedService, setSelectedService] = useState('Design & Engineering');
  const [budget, setBudget] = useState('$25k - $50k');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      // Allow user to see confirmation
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setName('');
    setDetails('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg liquid-glass-strong rounded-[1.5rem] p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="6" />
              </svg>
            </button>

            {!submitted ? (
              <div>
                <span className="text-xs uppercase tracking-widest text-white/60 font-body">Inquiry</span>
                <h3 className="font-heading italic text-3xl sm:text-4xl tracking-tight mt-1 text-white">
                  Start a Project
                </h3>
                <p className="text-sm font-light text-white/80 mt-1.5 font-body">
                  Tell us about your brand, scope, and target launch window.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-body">
                  <div>
                    <label className="block text-xs text-white/70 mb-1.5">Service of Interest</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Design', 'Engineering', 'Full Build'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedService(s)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            selectedService === s
                              ? 'bg-white text-black font-semibold'
                              : 'liquid-glass text-white/80 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 mb-1.5">Target Budget</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['$15k - $25k', '$25k - $50k', '$50k+'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            budget === b
                              ? 'bg-white text-black font-semibold'
                              : 'liquid-glass text-white/80 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 mb-1">Project Details</label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Brief description of the challenge, timeline, and current web stack..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-white text-black font-medium text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer shadow-lg"
                    >
                      Submit Brief <ArrowUpRight size={18} />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading italic text-3xl sm:text-4xl text-white">Inquiry Received</h3>
                <p className="text-white/80 font-body text-sm max-w-sm mx-auto mt-2">
                  Thank you, {name || 'there'}. We have received your brief for {selectedService} ({budget}) and will respond within 24 hours.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleReset}
                    className="bg-white text-black font-medium text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
