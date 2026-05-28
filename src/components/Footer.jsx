import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiArrowUpRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { ScrollLogo } from './Navbar';
import LegalModal from './LegalModal';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [modalState, setModalState] = React.useState({ isOpen: false, type: null }); // type: 'privacy' | 'terms'
  
  const navKeys = ['home', 'about', 'services', /* 'projects' */];

  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden bg-dark">
      {/* Animated Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
        ></motion.div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Marquee Phone Number - Straight and Premium */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-transparent via-white/5 to-transparent py-8 mb-24 border-y border-white/5 flex" dir={i18n.dir()}>
        <motion.div 
          animate={{ x: i18n.dir() === 'rtl' ? [0, 2000] : [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {[...Array(15)].map((_, i) => (
            <span key={i} className="text-5xl md:text-7xl font-space font-extrabold text-transparent text-stroke mx-12 flex-shrink-0 hover:text-white transition-colors duration-300 cursor-default">
              {t('nav.contact')}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20" dir={i18n.dir()}>
          
          <div className="lg:col-span-5">
            <a href="#home" className="mb-8 block w-fit">
              <ScrollLogo />
            </a>
            <p className="text-white/50 max-w-sm leading-relaxed mb-10 text-lg font-light mt-4">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              {[FiInstagram, FiFacebook, FaWhatsapp].map((Icon, i) => {
                const isWhatsapp = Icon === FaWhatsapp;
                return (
                  <a key={i} href={isWhatsapp ? "https://wa.me/970597878327" : "#"} target={isWhatsapp ? "_blank" : undefined} rel={isWhatsapp ? "noopener noreferrer" : undefined} className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:bg-white hover:text-dark hover:scale-110 transition-all duration-300 shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-wider">{t('footer.explore')}</h4>
            <ul className="space-y-4 text-white/60">
              {navKeys.map((key, i) => (
                <li key={i}>
                  <a href={`#${key}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <FiArrowUpRight className={`opacity-0 ${i18n.dir() === 'rtl' ? '-translate-x-2 group-hover:translate-x-0' : 'translate-x-2 group-hover:translate-x-0'} group-hover:opacity-100 transition-all duration-300`} />
                    <span>{t(`nav.${key}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Contact Section */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-wider">{t('nav.contact')}</h4>
            <div className="space-y-4">
              
              {/* Email Card */}
              <a href="mailto:hello@scroll.com" className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FiMail className="text-white/70 group-hover:text-primary text-xl transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-white/40 mb-1">{t('footer.email')}</span>
                  <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors" dir="ltr">hello@scroll.com</span>
                </div>
              </a>

              {/* Phone Card */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <FiPhone className="text-white/70 group-hover:text-accent text-xl transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-white/40 mb-1">{t('footer.phone')}</span>
                  <div className="flex flex-col text-lg font-medium text-white/90 group-hover:text-white transition-colors" dir="ltr">
                    <a href="https://wa.me/970597878327" target="_blank" rel="noopener noreferrer" className="hover:text-accent">+970 59-787-8327</a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <FiMapPin className="text-white/70 group-hover:text-white text-xl transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-white/40 mb-1">{t('footer.location')}</span>
                  <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{t('footer.location_val')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
          <p dir="ltr">© {new Date().getFullYear()} Scroll Digital. {t('footer.rights')}</p>
          <div className="flex gap-6 mt-4 md:mt-0" dir="ltr">
            <button onClick={() => setModalState({ isOpen: true, type: 'privacy' })} className="hover:text-white transition-colors">{t('footer.privacy')}</button>
            <button onClick={() => setModalState({ isOpen: true, type: 'terms' })} className="hover:text-white transition-colors">{t('footer.terms')}</button>
          </div>
        </div>
      </div>

      <LegalModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.type ? t(`legal.${modalState.type}_title`) : ''}
        content={modalState.type ? t(`legal.${modalState.type}_content`, { returnObjects: true }) : []}
      />

      {/* Styles for text stroke */}
      <style dangerouslySetInnerHTML={{__html: `
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
          color: transparent;
        }
      `}} />
    </footer>
  );
};

export default React.memo(Footer);
