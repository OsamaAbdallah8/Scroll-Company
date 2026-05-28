import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-6xl font-space font-bold mb-6 tracking-tight"
          >
            {t('testimonials.title1')} <span className="text-gradient">{t('testimonials.title2')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-xl max-w-2xl mx-auto font-light"
            dir={i18n.dir()}
          >
            {t('testimonials.desc')}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto" dir={i18n.dir()}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              className="group relative"
            >
              {/* Subtle Hover Glow Layer */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-accent/30 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-700"></div>
              
              <div className="relative p-12 md:p-20 rounded-[3rem] flex flex-col items-center text-center bg-dark-100/90 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* Decorative Icon */}
                <div className="text-primary/30 text-7xl mb-8 group-hover:text-primary/60 transition-colors duration-500 group-hover:scale-110 transform">
                  <FiMessageSquare />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-light text-white/90 leading-tight md:leading-relaxed relative z-10 font-space tracking-wide">
                  "{t('testimonials.message')}"
                </h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TestimonialsSection);
