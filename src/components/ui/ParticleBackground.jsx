'use client';

import { useCallback, useEffect, useState, useMemo } from 'react';
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
  const [isClient, setIsClient] = useState(false);
  
  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Track mouse movement for particle interaction with throttling
  useEffect(() => {
    let timeoutId = null;
    
    const handleMouseMove = (e) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setMousePosition({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
          });
          mouseX.set(e.clientX / window.innerWidth);
          mouseY.set(e.clientY / window.innerHeight);
          timeoutId = null;
        }, 50); // Throttle to 50ms
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [mouseX, mouseY]);

  // Calculate dynamic particle properties based on scroll and mouse position
  // Reduced values for better performance
  const particleSpeed = 0.8 + (scrollFactor * 0.3);
  const particleOpacity = 0.2 + (scrollFactor * 0.03 > 0.1 ? 0.1 : scrollFactor * 0.03);
  const particleSize = { min: 1, max: 2 + (scrollFactor * 0.1 > 1 ? 1 : scrollFactor * 0.1) };
  const particleNumber = Math.max(20, Math.min(40, 30 - scrollFactor * 5)); // Reduced particle count
  
  // Memoize particle options to prevent recalculation on every render
  const particleOptions = useMemo(() => ({
    fpsLimit: 30, // Reduced from 60 to 30 for better performance
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
          quantity: 2, // Reduced from 4
        },
        repulse: {
          distance: 80 + (scrollFactor * 10), // Reduced from 100 + (scrollFactor * 20)
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: isDarkMode ? '#ffffff' : '#000000',
      },
      links: {
        color: isDarkMode ? '#ffffff' : '#000000',
        distance: 120, // Reduced from 150
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
          rotateX: mousePosition.x * 500, // Reduced from 1000
          rotateY: mousePosition.y * 500, // Reduced from 1000
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
          speed: 0.3, // Reduced from 0.5
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
          speed: 0.5, // Reduced from 1
          minimumValue: 0.5,
          sync: false,
        },
      },
    },
    detectRetina: false, // Changed from true to false for better performance
    background: {
      color: {
        value: "transparent",
      },
    },
  }), [isDarkMode, mousePosition.x, mousePosition.y, particleNumber, particleOpacity, particleSize, particleSpeed, scrollFactor]);

  return (
    <motion.div 
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {isClient && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
        />
      )}
    </motion.div>
  );
};

export default ParticleBackground;