import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiMessageSquare } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    nameKey: 'testimonials.t1_name',
    roleKey: 'testimonials.t1_role',
    contentKey: 'testimonials.t1_content',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    nameKey: 'testimonials.t2_name',
    roleKey: 'testimonials.t2_role',
    contentKey: 'testimonials.t2_content',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    nameKey: 'testimonials.t3_name',
    roleKey: 'testimonials.t3_role',
    contentKey: 'testimonials.t3_content',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
  }
];

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

        {/* Static Grid with Auto-Floating Motion Instead of Marquee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir={i18n.dir()}>
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 1.5 // Stagger floating motion
                }}
                className="group relative h-full"
              >
                {/* Subtle Hover Glow Layer */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative p-10 rounded-3xl h-full flex flex-col bg-dark-100/90 backdrop-blur-md border border-white/5 group-hover:border-white/10 group-hover:-translate-y-2 transition-all duration-500 shadow-2xl">
                  {/* Decorative Icon */}
                  <div className={`absolute top-8 ${i18n.dir() === 'rtl' ? 'left-8' : 'right-8'} text-white/5 text-6xl rotate-12 group-hover:text-primary/10 transition-colors duration-500`}>
                    <FiMessageSquare />
                  </div>

                  <div className="flex gap-1 mb-8 text-yellow-400 relative z-10">
                    {[...Array(5)].map((_, index) => (
                      <FiStar key={index} className="fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-white/80 leading-relaxed mb-10 flex-grow text-lg relative z-10">"{t(testi.contentKey)}"</p>
                  
                  <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-white/5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <img src={testi.avatar} alt={t(testi.nameKey)} className="relative w-14 h-14 rounded-full border-2 border-white/10 group-hover:border-primary/50 transition-colors duration-500 object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors duration-300">{t(testi.nameKey)}</h4>
                      <p className="text-sm text-white/50">{t(testi.roleKey)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TestimonialsSection);
