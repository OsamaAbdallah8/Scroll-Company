import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const AnimatedBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-transparent transition-colors duration-1000">
      <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fullScreen: { enable: false, zIndex: 0 },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse", // Soft repulse back on hover
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 70, // Small radius to minimize GPU and CPU overhead
                duration: 0.4,
              },
            },
          },
          particles: {
            color: { value: ["#06b6d4", "#3b82f6", "#8b5cf6"] },
            links: {
              color: "#ffffff",
              distance: 120, // Lightweight link distance
              enable: true,
              opacity: 0.08, // Cleanly visible soft lines
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.2, // Very slow and buttery movement
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 16, // Low particle count for excellent performance
            },
            opacity: {
              value: 0.25, // Distinct, visible node dots
              random: true,
              animation: { enable: true, speed: 0.3, minimumValue: 0.08, sync: false }
            },
            shape: { type: "circle" },
            size: {
              value: { min: 1, max: 2 },
              random: true,
              animation: { enable: true, speed: 0.5, minimumValue: 0.5, sync: false }
            },
          },
          detectRetina: false,
        }}
      />
      
      {/* Aurora Gradients - Low-impact Cyan/Blue Glow optimized with smaller size & lower blur radius */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/15 blur-[60px] mix-blend-screen"></div>
        <div className="absolute top-[30%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-accent/15 blur-[60px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[60px] mix-blend-screen"></div>
      </div>
    </div>
  );
};

export default React.memo(AnimatedBackground);
