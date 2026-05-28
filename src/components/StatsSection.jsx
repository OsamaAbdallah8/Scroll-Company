import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const stats = ['stats.s1', 'stats.s2', 'stats.s3', 'stats.s4'];

const StatsSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative rounded-[3rem] p-10 md:p-20 overflow-hidden group border border-white/10 bg-dark-100/50 backdrop-blur-md">
          
          {/* Animated Background Gradients inside Stats */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center relative z-10" dir={i18n.dir()}>
            {stats.map((statKey, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="relative flex items-center justify-center h-full p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors duration-500 backdrop-blur-sm"
              >
                <div className="text-2xl md:text-3xl font-space font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-500 leading-snug">
                  {t(statKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
