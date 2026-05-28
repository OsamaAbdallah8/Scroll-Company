import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiLayout, FiZap, FiMessageSquare, FiDollarSign, FiHeart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const features = [
  { icon: FiLayout, titleKey: 'why_us.f1' },
  { icon: FiZap, titleKey: 'why_us.f2' },
  { icon: FiCheckCircle, titleKey: 'why_us.f3' },
  { icon: FiDollarSign, titleKey: 'why_us.f4' },
];

const SpotlightCard = React.memo(({ children, className = "" }) => {
  const divRef = useRef(null);
  const glowRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!divRef.current || !glowRef.current || isFocused) return;
    
    requestAnimationFrame(() => {
      if(!divRef.current || !glowRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(6,182,212,0.15), transparent 40%)`;
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => { if(glowRef.current) glowRef.current.style.opacity = '1'; }}
      onMouseLeave={() => { if(glowRef.current) glowRef.current.style.opacity = '0'; }}
      className={`relative rounded-3xl overflow-hidden bg-white/5 border border-white/5 group ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  );
});

const WhyUsSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="why-us" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-6xl font-space font-bold mb-6 tracking-tight"
          >
            {t('why_us.title1')} <span className="text-gradient">{t('why_us.title2')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-xl max-w-2xl mx-auto font-light"
            dir={i18n.dir()}
          >
            {t('why_us.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" dir={i18n.dir()}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="p-8 h-full flex items-center gap-6 hover:-translate-y-1 transition-transform duration-500">
                <div className="w-14 h-14 rounded-2xl glass flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10 bg-white/5 border border-white/10">
                  <div className="absolute inset-0 bg-accent/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <feature.icon className="text-2xl text-white group-hover:text-accent transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold relative z-10 text-white/90 group-hover:text-white transition-colors duration-300">
                  {t(feature.titleKey)}
                </h3>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyUsSection);
