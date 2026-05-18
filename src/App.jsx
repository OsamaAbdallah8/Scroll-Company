import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update HTML tag attributes reactively when language changes
  useEffect(() => {
    const currentLang = i18n.language || 'ar';
    document.documentElement.dir = ['ar', 'he'].includes(currentLang) ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  useEffect(() => {
    // Lenis Smooth Scroll optimized for cinematic feel
    const lenis = new Lenis({
      duration: 2.5, // Increased for a much smoother, slower cinematic feel
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease out for butter-smooth stop
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.6, // Very gentle mouse wheel scrolling
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(href, { offset: -80, duration: 2.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Mouse Tracking for subtle glow (optimized with requestAnimationFrame)
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      lenis.destroy();
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative selection:bg-primary/30">
      {/* Global Mouse Tracking Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.05), transparent 40%)`
        }}
      />

      <AnimatedBackground />
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <StatsSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
