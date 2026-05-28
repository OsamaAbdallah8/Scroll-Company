import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const LegalModal = ({ isOpen, onClose, title, content }) => {
  const { i18n } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-2xl bg-dark-100/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
              dir={i18n.dir()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-50 pointer-events-none"></div>
                <h3 className="text-2xl md:text-3xl font-bold font-space text-white relative z-10">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors relative z-10"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Content area with scroll */}
              <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {Array.isArray(content) ? content.map((paragraph, index) => (
                    <p key={index} className="text-white/70 leading-relaxed text-lg font-light">
                      {paragraph}
                    </p>
                  )) : (
                    <p className="text-white/70 leading-relaxed text-lg font-light">
                      {content}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Footer gradient fade */}
              <div className="h-6 w-full bg-gradient-to-t from-dark-100/90 to-transparent absolute bottom-0 left-0 pointer-events-none"></div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(LegalModal);
