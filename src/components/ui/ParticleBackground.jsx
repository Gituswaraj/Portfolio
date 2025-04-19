'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { motion, useMotionValue } from 'framer-motion';

const ParticleBackground = ({ isDarkMode, scrollFactor = 0 }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track mouse movement for particle interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Calculate dynamic particle properties based on scroll and mouse position
  const particleSpeed = 1 + (scrollFactor * 0.5);
  const particleOpacity = 0.3 + (scrollFactor * 0.05 > 0.2 ? 0.2 : scrollFactor * 0.05);
  const particleSize = { min: 1, max: 3 + (scrollFactor * 0.2 > 2 ? 2 : scrollFactor * 0.2) };
  const particleNumber = Math.max(40, Math.min(100, 80 - scrollFactor * 10));

  return (
    <motion.div 
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100 + (scrollFactor * 20),
                duration: 0.4,
              },
              grab: {
                distance: 150,
                links: {
                  opacity: 0.5,
                },
              },
              bubble: {
                distance: 200,
                size: 10,
                duration: 2,
              },
            },
          },
          particles: {
            color: {
              value: isDarkMode ? '#ffffff' : '#000000',
            },
            links: {
              color: isDarkMode ? '#ffffff' : '#000000',
              distance: 150,
              enable: true,
              opacity: particleOpacity,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: particleSpeed,
              straight: false,
              attract: {
                enable: true,
                rotateX: mousePosition.x * 1000,
                rotateY: mousePosition.y * 1000,
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: particleNumber,
            },
            opacity: {
              value: particleOpacity,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: particleSize,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.5,
                sync: false,
              },
            },
          },
          detectRetina: true,
          background: {
            color: {
              value: "transparent",
            },
          },
        }}
      />
    </motion.div>
  );
};

export default ParticleBackground;