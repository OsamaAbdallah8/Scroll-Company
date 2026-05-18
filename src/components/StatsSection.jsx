import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const stats = [
  { value: 150, labelKey: 'stats.s1_label', suffix: '+' },
  { value: 50, labelKey: 'stats.s2_label', suffix: '+' },
  { value: 10, labelKey: 'stats.s3_label', suffix: '' },
  { value: 99, labelKey: 'stats.s4_label', suffix: '%' },
];

const Counter = ({ value, duration = 3 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          // Use easeOutQuint for a cinematic slow-down effect at the end
          const easeOutProgress = 1 - Math.pow(1 - progress, 5);
          setCount(Math.min(Math.floor(value * easeOutProgress), value));
          requestAnimationFrame(animateCount);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatsSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative rounded-[3rem] p-10 md:p-20 overflow-hidden group border border-white/10 bg-dark-100/50 backdrop-blur-md">
          
          {/* Animated Background Gradients inside Stats */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 text-center relative z-10" dir={i18n.dir()}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="relative"
              >
                <div className="text-5xl md:text-7xl font-space font-bold text-white mb-4 flex items-center justify-center tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-500">
                  <Counter value={stat.value} duration={3} />
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="text-white/60 font-medium text-lg uppercase tracking-wider">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
