import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-8">
            {t('about.title_from')} <span className="text-gradient">{t('about.title_to')}</span>
          </h2>
          <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className={`text-xl md:text-2xl leading-relaxed text-white/80 font-light ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`} dir={i18n.dir()}>
              {t('about.desc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
