import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiShoppingCart, FiLayout, FiFeather, FiTrendingUp, FiServer } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const services = [
  { icon: FiMonitor, titleKey: 'services.s1_title', descKey: 'services.s1_desc' },
  { icon: FiShoppingCart, titleKey: 'services.s2_title', descKey: 'services.s2_desc' },
  { icon: FiLayout, titleKey: 'services.s3_title', descKey: 'services.s3_desc' },
  { icon: FiFeather, titleKey: 'services.s4_title', descKey: 'services.s4_desc' },
  { icon: FiTrendingUp, titleKey: 'services.s5_title', descKey: 'services.s5_desc' },
  { icon: FiServer, titleKey: 'services.s6_title', descKey: 'services.s6_desc' },
];

const SpotlightCard = React.memo(({ children, className = "" }) => {
  const divRef = useRef(null);
  const glowRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Use requestAnimationFrame for high performance glowing effect without React re-renders
  const handleMouseMove = (e) => {
    if (!divRef.current || !glowRef.current || isFocused) return;
    
    requestAnimationFrame(() => {
      if(!divRef.current || !glowRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(139,92,246,0.15), transparent 40%)`;
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

const ServicesSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-6xl font-space font-bold mb-6 tracking-tight"
          >
            {t('services.title1')} <span className="text-gradient">{t('services.title2')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-xl max-w-2xl mx-auto font-light"
            dir={i18n.dir()}
          >
            {t('services.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir={i18n.dir()}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="p-8 h-full hover:-translate-y-2 transition-transform duration-500">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10 bg-white/5">
                  {/* Reduced blur radius slightly to save GPU memory */}
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <service.icon className="text-3xl text-white group-hover:text-primary transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{t(service.titleKey)}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{t(service.descKey)}</p>
                
                {/* Decorative glowing dot */}
                <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-white/20 group-hover:bg-primary transition-colors duration-500 shadow-[0_0_10px_rgba(139,92,246,0)] group-hover:shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesSection);
