import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

const navKeys = ['home', 'about', 'services', 'projects', 'testimonials', 'contact'];

const languages = [
  { code: 'ar', label: 'عربي' },
  { code: 'en', label: 'EN' },
  { code: 'he', label: 'עב' }
];

// Premium SaaS Logo Component
export const ScrollLogo = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Outer rotating glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
        
        {/* Premium Glass Icon Container */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          {/* Subtle inner reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
          
          {/* Geometric Abstract 'S' Shape */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
            <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M12 4V20" stroke="url(#paint1_linear)" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="3" fill="#06b6d4" className="animate-pulse"/>
            <defs>
              <linearGradient id="paint0_linear" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <span className="text-white text-3xl font-space font-bold tracking-tight">{t('nav.brand')}</span>
    </div>
  );
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-4 bg-dark-100/80 backdrop-blur-md shadow-2xl border-b border-white/5" : "py-8 bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between" dir={i18n.dir()}>
          <a href="#home">
            <ScrollLogo />
          </a>
 
          {/* Desktop Nav - Larger text and better spacing */}
          <div className="hidden lg:flex items-center gap-8">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-base font-medium text-white/70 hover:text-white transition-colors duration-150 relative group py-2"
              >
                {t(`nav.${key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-150 ease-out group-hover:w-full rounded-full"></span>
              </a>
            ))}

            {/* Premium Language Switcher Dropdown */}
            <div className="relative z-50" onMouseLeave={() => setLangOpen(false)}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-sm font-medium"
              >
                <FiGlobe className="text-white/70 text-lg" />
                <span>{languages.find(l => l.code === i18n.language)?.label || 'عربي'}</span>
                <FiChevronDown className={cn("text-white/40 transition-transform duration-300 text-xs", langOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 ${i18n.dir() === 'rtl' ? 'left-0' : 'right-0'} w-36 bg-dark-100/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1`}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          i18n.changeLanguage(l.code);
                          setLangOpen(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center justify-between",
                          i18n.dir() === 'rtl' ? 'text-right' : 'text-left',
                          i18n.language === l.code 
                            ? "bg-white/10 text-primary font-semibold" 
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span>{l.label}</span>
                        {i18n.language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#contact" className="px-8 py-3 rounded-full bg-white text-dark hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 text-base font-bold">
              {t('nav.cta')}
            </a>
          </div>
 
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-3xl text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </motion.nav>
 
      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl pt-32 px-8 flex flex-col gap-8 lg:hidden"
            dir={i18n.dir()}
          >
            {navKeys.map((key, i) => (
              <motion.a
                key={key}
                initial={{ opacity: 0, x: i18n.dir() === 'rtl' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                href={`#${key}`}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-space font-bold text-white/90 hover:text-primary transition-colors"
              >
                {t(`nav.${key}`)}
              </motion.a>
            ))}

            {/* Mobile Language Switcher (horizontal luxury glass list) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 mt-8 border-t border-white/10 pt-8 justify-center"
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    i18n.changeLanguage(l.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-6 py-3 rounded-full border text-lg font-medium transition-all duration-300 backdrop-blur-md",
                    i18n.language === l.code
                      ? "bg-white text-dark border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      : "bg-white/5 text-white/75 border-white/10 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
 
export default React.memo(Navbar);
