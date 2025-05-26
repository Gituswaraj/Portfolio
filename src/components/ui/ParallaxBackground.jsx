'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = ({ children, className = '', darkMode = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const { scrollY } = useScroll();
  
  // Generate particles only once on client-side
  const particles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 10 + 2}px`,
      height: `${Math.random() * 10 + 2}px`,
      yOffset: Math.random() * 200 + 50,
      xFactor: Math.random() * 40 + 10,
      duration: Math.random() * 5 + 5
    }));
  }, []);
 
  // Transform values for parallax effect based on scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
  
  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle mouse movement with throttling for better performance
  useEffect(() => {
    let timeoutId = null;
    
    const handleMouseMove = (e) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setMousePosition({
            x: e.clientX / window.innerWidth - 0.5,
            y: e.clientY / window.innerHeight - 0.5
          });
          timeoutId = null;
        }, 50); // Throttle to 50ms
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Layer 1 - Furthest back, moves the most */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ 
            y: y1,
            x: mousePosition.x * -30,
            backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, ${darkMode ? '#4a5568' : '#a0aec0'} 0%, transparent 60%)`
          }}
        />
        
        {/* Layer 2 - Middle layer */}
        <motion.div 
          className="absolute inset-0 opacity-15"
          style={{ 
            y: y2,
            x: mousePosition.x * -20,
            backgroundImage: `radial-gradient(circle at ${40 + mousePosition.x * 20}% ${60 + mousePosition.y * 20}%, ${darkMode ? '#2d3748' : '#cbd5e0'} 0%, transparent 50%)`
          }}
        />
        
        {/* Layer 3 - Closest layer, moves the least */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            y: y3,
            x: mousePosition.x * -10,
            backgroundImage: `radial-gradient(circle at ${60 + mousePosition.x * 10}% ${40 + mousePosition.y * 10}%, ${darkMode ? '#1a202c' : '#e2e8f0'} 0%, transparent 40%)`
          }}
        />
        
        {/* Animated dots/particles - only rendered client-side with pre-calculated values */}
        <div className="absolute inset-0">
          {isClient && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute rounded-full ${darkMode ? 'bg-white/10' : 'bg-black/5'}`}
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.width,
                height: particle.height,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                y: [0, -particle.yOffset/2, -particle.yOffset],
                x: mousePosition.x * -particle.xFactor
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                y: {
                  duration: particle.duration * 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxBackground;