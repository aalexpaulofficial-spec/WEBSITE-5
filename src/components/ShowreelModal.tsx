import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl liquid-glass-strong rounded-[1.5rem] p-4 sm:p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-white/10 mb-4">
              <div>
                <span className="text-xs text-white/60 font-body uppercase tracking-wider">// Agency Reel 2026</span>
                <h4 className="font-heading italic text-xl sm:text-2xl text-white">Cinematic Motion & Craft</h4>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close showreel"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="6" />
                </svg>
              </button>
            </div>

            {/* Video container */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/50 border border-white/10">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />
            </div>

            <div className="flex items-center justify-between text-xs text-white/60 font-body pt-3 px-1">
              <span>Aeon Studio — Showreel 2026 Edition</span>
              <span>4K Pro-Res 60fps</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
