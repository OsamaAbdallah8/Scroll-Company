import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCode, FiActivity } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Tilt from 'react-parallax-tilt';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);



  const textVariants = {
    hidden: { filter: 'blur(5px)', opacity: 0, y: 20 }, // Reduced blur for better mobile performance
    visible: { 
      filter: 'blur(0px)', 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="glass px-4 py-2 rounded-full flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white/80" dir={i18n.dir()}>{t('hero.badge')}</span>
          </div>
        </motion.div>

        {/* Main Title - Blur Staggered Reveal */}
        <div className="text-center max-w-5xl mx-auto mb-10" dir={i18n.dir()}>
          <motion.div
            initial="hidden"
            animate="visible"
            key={i18n.language} // Re-animate cleanly on lang switch
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.h1 
              variants={textVariants} 
              className={`text-5xl md:text-7xl lg:text-8xl font-space font-bold leading-normal md:leading-[1.15] py-2 px-1 mb-4 ${i18n.language === 'en' ? 'tracking-tighter' : 'tracking-normal'}`}
            >
              {t('hero.title1')}
            </motion.h1>
            <motion.h1 
              variants={textVariants} 
              className={`text-5xl md:text-7xl lg:text-8xl font-space font-bold leading-normal md:leading-[1.15] py-3 px-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-white ${i18n.language === 'en' ? 'tracking-tighter' : 'tracking-normal'}`}
            >
              {t('hero.title2')}
            </motion.h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center text-white/50 text-xl max-w-2xl mx-auto mb-14 font-light leading-relaxed"
          dir={i18n.dir()}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Buttons (Fixed Alignment) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none"
        >
          <a href="https://wa.me/970597878327" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto relative group block">
            {/* Reduced opacity of blur for better GPU performance */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative px-8 py-4 bg-white text-dark rounded-full font-bold flex items-center justify-center gap-3 w-full group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] transition-all duration-300 ease-out">
              <span className="text-lg">{t('hero.cta1')}</span>
              {i18n.dir() === 'rtl' ? <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> : <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
            </div>
          </a>

          <a href="https://wa.me/970597878327" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto block group">
            <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold flex items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 ease-out w-full group-hover:bg-white/10 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
              <span className="text-white text-lg">{t('hero.cta2')}</span>
            </div>
          </a>
        </motion.div>
      </motion.div>

      {/* Floating UI Elements (3D Parallax Tilt) */}
      {/* Hidden on mobile to improve performance */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[5%]">
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} className="pointer-events-auto cursor-pointer">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4 w-64 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary"><FiCode className="text-xl" /></div>
              <div>
                <div className="h-2 w-20 bg-white/20 rounded mb-2"></div>
                <div className="h-2 w-12 bg-white/10 rounded"></div>
              </div>
            </div>
          </Tilt>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute top-[60%] right-[10%]">
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} className="pointer-events-auto cursor-pointer">
            <div className="glass-card p-5 rounded-2xl w-56 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent"><FiActivity /></div>
                <div className="text-sm font-medium text-white/80">{t('hero.performance')}</div>
              </div>
              <div className="flex items-end gap-2 h-12">
                {[40, 70, 45, 90, 65].map((h, i) => (
                  <div key={i} className="w-full bg-accent/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
