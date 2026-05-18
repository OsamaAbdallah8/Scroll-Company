import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    id: 1,
    title: 'Nexus E-Commerce',
    categoryKey: 'projects.p1_category',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Fintech Dashboard',
    categoryKey: 'projects.p2_category',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Aura Landing Page',
    categoryKey: 'projects.p3_category',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'HealthCare App',
    categoryKey: 'projects.p4_category',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20" dir={i18n.dir()}>
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-5xl md:text-6xl font-space font-bold mb-6 tracking-tight"
            >
              {t('projects.title1')} <span className="text-gradient">{t('projects.title2')}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-white/50 text-xl max-w-xl font-light"
            >
              {t('projects.desc')}
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, x: i18n.dir() === 'rtl' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 items-center gap-3 font-medium group"
          >
            {t('projects.view_all')}
            <FiExternalLink className="group-hover:rotate-45 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} scale={1.02} transitionSpeed={1000} className="h-full">
                <div className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-dark-100 border border-white/5 shadow-2xl cursor-pointer">
                  
                  {/* Glowing backdrop blur under the image */}
                  <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
 
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
                  />
                  
                  {/* Cinematic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex justify-between items-end relative z-10">
                      <div dir={i18n.dir()} className="transform group-hover:-translate-y-2 transition-transform duration-500">
                        <span className="text-primary font-medium text-sm mb-3 block tracking-wider uppercase">{t(project.categoryKey)}</span>
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <div className={`h-1 w-12 bg-accent rounded-full transform ${i18n.dir() === 'rtl' ? 'origin-right' : 'origin-left'} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100`}></div>
                      </div>
                      
                      <div className="w-14 h-14 rounded-full bg-white text-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        <FiExternalLink className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
