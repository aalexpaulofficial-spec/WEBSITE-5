import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadingVideo } from './components/FadingVideo';
import { BlurText } from './components/BlurText';
import {
  ArrowUpRight,
  Play,
  ClockIcon,
  GlobeIcon,
  ImageIcon,
  MovieIcon,
  LightbulbIcon,
} from './components/Icons';
import { ProjectModal } from './components/ProjectModal';
import { ShowreelModal } from './components/ShowreelModal';

export default function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sharedMotionProps = {
    initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
    animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' as const },
  };

  const scrollToCapabilities = () => {
    const el = document.getElementById('capabilities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Work', action: scrollToCapabilities },
    { label: 'Studio', action: scrollToTop },
    { label: 'Services', action: scrollToCapabilities },
    { label: 'Journal', action: () => setIsShowreelOpen(true) },
    { label: 'Contact', action: () => setIsProjectModalOpen(true) },
  ];

  return (
    <main className="bg-black text-white min-h-screen selection:bg-white/20 selection:text-white">
      {/* Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* FIXED NAVBAR */}
      <header className="fixed top-4 left-0 right-0 z-50 px-6 sm:px-8 lg:px-16 pointer-events-none">
        <div className="flex items-center justify-between w-full pointer-events-auto">
          {/* Left: Brand Icon Circle */}
          <button
            onClick={scrollToTop}
            aria-label="Aeon Studio Home"
            className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <span className="font-heading italic text-2xl leading-none text-white select-none">
              a
            </span>
          </button>

          {/* Center (Desktop): Navigation Pill */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-1.5 py-1.5"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors cursor-pointer rounded-full"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-white text-black font-body font-medium text-sm px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-white/90 transition-all cursor-pointer shadow-sm ml-1 hover:scale-105 active:scale-95"
            >
              Start a Project <ArrowUpRight size={16} />
            </button>
          </nav>

          {/* Mobile Right: Menu button / CTA */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-white text-black font-body font-medium text-xs px-3.5 py-2 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all cursor-pointer"
            >
              Start <ArrowUpRight size={14} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="liquid-glass h-10 w-10 rounded-full flex items-center justify-center text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Right Spacer for Desktop Balance */}
          <div className="hidden md:block h-12 w-12" aria-hidden="true" />
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 liquid-glass-strong rounded-2xl p-4 flex flex-col gap-2 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-sm text-white/90 hover:text-white font-body"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* SECTION 1: HERO */}
      <section
        id="hero"
        className="h-screen overflow-hidden bg-black relative flex flex-col"
      >
        {/* Background Video */}
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: '120%', height: '120%' }}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Main Centered Content */}
          <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
            {/* Badge */}
            <motion.div
              initial={sharedMotionProps.initial}
              animate={sharedMotionProps.animate}
              transition={{ ...sharedMotionProps.transition, delay: 0.4 }}
              className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2.5 text-xs md:text-sm text-white/90"
            >
              <span className="bg-white text-black font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-body">
                New
              </span>
              <span className="font-body">Booking Q3 2026 engagements -- limited capacity</span>
            </motion.div>

            {/* Headline */}
            <div className="mt-6 max-w-3xl">
              <BlurText
                text="Crafted Digital Experiences Built to Outlast Trends"
                className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px]"
              />
            </div>

            {/* Subtext */}
            <motion.p
              initial={sharedMotionProps.initial}
              animate={sharedMotionProps.animate}
              transition={{ ...sharedMotionProps.transition, delay: 0.8 }}
              className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
            >
              We are a small studio of designers and engineers shaping brand-defining websites for ambitious companies. Precise typography, cinematic motion, and code you can be proud of.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={sharedMotionProps.initial}
              animate={sharedMotionProps.animate}
              transition={{ ...sharedMotionProps.transition, delay: 1.1 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-6"
            >
              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium text-white hover:bg-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={18} />
              </button>

              <button
                onClick={() => setIsShowreelOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-all cursor-pointer group"
              >
                <span className="w-7 h-7 rounded-full liquid-glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={12} className="ml-0.5 text-white" />
                </span>
                <span>Watch Showreel</span>
              </button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={sharedMotionProps.initial}
              animate={sharedMotionProps.animate}
              transition={{ ...sharedMotionProps.transition, delay: 1.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {/* Card 1 */}
              <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between">
                <div className="text-white/80">
                  <ClockIcon size={24} />
                </div>
                <div>
                  <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                    6 Weeks
                  </div>
                  <div className="text-xs text-white/80 font-body mt-1 leading-snug">
                    Average End-to-End Launch Time
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between">
                <div className="text-white/80">
                  <GlobeIcon size={24} />
                </div>
                <div>
                  <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                    140+
                  </div>
                  <div className="text-xs text-white/80 font-body mt-1 leading-snug">
                    Brands Shipped Across Four Continents
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Trust Bar */}
          <motion.div
            initial={sharedMotionProps.initial}
            animate={sharedMotionProps.animate}
            transition={{ ...sharedMotionProps.transition, delay: 1.4 }}
            className="flex flex-col items-center gap-4 pb-8 px-4"
          >
            <div className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 font-body text-center">
              Trusted by founders, operators, and creative directors worldwide
            </div>

            <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap">
              {['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'].map((brand) => (
                <span
                  key={brand}
                  className="font-heading italic text-2xl md:text-3xl tracking-tight text-white/80 hover:text-white transition-colors cursor-default select-none"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CAPABILITIES */}
      <section
        id="capabilities"
        className="min-h-screen overflow-hidden bg-black relative flex flex-col justify-between"
      >
        {/* Background Video */}
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75 pointer-events-none z-[1]" />

        {/* Capabilities Content */}
        <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen">
          {/* Header */}
          <div className="mb-auto">
            <p className="text-sm font-body text-white/80 mb-6">
              // Capabilities
            </p>
            <h2 className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] text-white whitespace-pre-line">
              {'Studio craft,\nend to end'}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Design */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col transition-transform hover:-translate-y-1 duration-300">
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center shrink-0 text-white">
                  <ImageIcon size={22} />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {['Brand Systems', 'Art Direction', 'Visual Identity', 'Motion'].map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: Title & Body */}
              <div className="mt-8">
                <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none text-white">
                  Design
                </h3>
                <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch] mt-3">
                  We shape identities and interfaces that feel unmistakably yours -- typographic systems, component libraries, and art-directed pages that scale without losing soul.
                </p>
              </div>
            </div>

            {/* Card 2: Engineering */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col transition-transform hover:-translate-y-1 duration-300">
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center shrink-0 text-white">
                  <MovieIcon size={22} />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {['React', 'Next.js', 'Headless CMS', 'Edge-Ready'].map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: Title & Body */}
              <div className="mt-8">
                <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none text-white">
                  Engineering
                </h3>
                <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch] mt-3">
                  Production-grade front-ends built on modern stacks. Performant, accessible, and instrumented -- with code your team will enjoy extending long after launch.
                </p>
              </div>
            </div>

            {/* Card 3: Growth */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col transition-transform hover:-translate-y-1 duration-300">
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center shrink-0 text-white">
                  <LightbulbIcon size={22} />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {['SEO', 'Analytics', 'A/B Testing', 'Retention'].map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: Title & Body */}
              <div className="mt-8">
                <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none text-white">
                  Growth
                </h3>
                <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch] mt-3">
                  Launch is the starting line. We partner with your team on conversion, content, and iteration loops that turn a beautiful site into a compounding asset.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom subtle copyright footer note */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-body gap-3">
            <div>&copy; 2026 Aeon Studio Inc. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <button
                onClick={scrollToTop}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Back to Top &uarr;
              </button>
              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Start an Engagement &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
