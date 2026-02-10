import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoBlack from '../assets/logo-black.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'py-5 md:py-4 bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
      <div className="container flex items-center justify-between relative h-full">
          {/* Logo - OneXengine Text */}
          {/* Mobile: Centered. Desktop: Left aligned */}
          <a 
            href="#" 
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto z-20 block"
              aria-label="OneXmedia Home"
          >
            <span 
              className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              OneXmedia
            </span>
          </a>

          {/* Mobile Menu Toggle (Left on mobile to balance? Or Right?) */}
          {/* Standard pattern: Logo Left, Menu Right. User wants Logo Center. Menu usually goes Right. */}
          {/* To center the logo perfectly, the left and right elements should be balanced or absolute. */}
          {/* We used absolute for logo. So Menu can be on Right. */}
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                {link.label}
              </a>
            ))}
          </div>



          {/* Mobile Menu Toggle - Absolute Right to ensure it doesn't push center logo if flex changes */}
          <button
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-[var(--color-text-primary)] cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-white flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="text-2xl font-bold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </motion.a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
