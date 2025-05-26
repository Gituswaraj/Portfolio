'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';

const PageTransition = ({ 
  children, 
  location, 
  transitionType = 'fade', // fade, slide, zoom, flip
  duration = 0.3, // Reduced from 0.5 for better performance
  direction = 'up' // up, down, left, right (for slide transitions)
}) => {
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocationChange = useCallback(() => {
    if (location !== displayLocation && !isAnimating) {
      setIsAnimating(true);
      setTransitionStage('exit');
      
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
        
        // Reset animation state after completion
        const resetTimer = setTimeout(() => {
          setIsAnimating(false);
        }, duration * 1000);
        
        return () => clearTimeout(resetTimer);
      }, duration * 1000); // Duration of the exit animation
      
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation, duration, isAnimating]);
  
  useEffect(() => {
    handleLocationChange();
  }, [handleLocationChange]);

  // Define transition variants based on type - memoized to prevent recalculation
  const getVariants = useCallback(() => {
    // If user prefers reduced motion or we're server-side rendering, use simple fade
    if (prefersReducedMotion || !isClient) {
      return {
        enter: {
          opacity: 1,
          transition: { duration: duration * 0.5, ease: 'easeOut' }
        },
        exit: {
          opacity: 0,
          transition: { duration: duration * 0.5, ease: 'easeOut' }
        }
      };
    }
    
    const baseTransition = {
      duration,
      ease: 'easeOut' // Changed from easeInOut for better performance
    };
    
    // Fade transition (default) - simplified
    if (transitionType === 'fade') {
      return {
        enter: {
          opacity: 1,
          y: 0,
          transition: baseTransition
        },
        exit: {
          opacity: 0,
          y: direction === 'up' ? 10 : direction === 'down' ? -10 : 0, // Reduced from 20
          x: direction === 'left' ? 10 : direction === 'right' ? -10 : 0, // Reduced from 20
          transition: baseTransition
        }
      };
    }
    
    // Slide transition - simplified
    if (transitionType === 'slide') {
      const offset = 30; // Reduced from 50
      return {
        enter: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: baseTransition
        },
        exit: {
          opacity: 0,
          x: direction === 'left' ? offset : direction === 'right' ? -offset : 0,
          y: direction === 'up' ? offset : direction === 'down' ? -offset : 0,
          transition: baseTransition
        }
      };
    }
    
    // Zoom transition - simplified
    if (transitionType === 'zoom') {
      return {
        enter: {
          opacity: 1,
          scale: 1,
          transition: baseTransition
        },
        exit: {
          opacity: 0,
          scale: direction === 'in' ? 0.9 : 1.1, // Less extreme scale (was 0.8/1.2)
          transition: baseTransition
        }
      };
    }
    
    // Flip transition - simplified or removed for performance
    if (transitionType === 'flip') {
      // Simplified flip with less extreme angles
      return {
        enter: {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          transition: baseTransition
        },
        exit: {
          opacity: 0,
          rotateX: direction === 'up' || direction === 'down' ? (direction === 'up' ? 45 : -45) : 0, // Reduced from 90
          rotateY: direction === 'left' || direction === 'right' ? (direction === 'left' ? 45 : -45) : 0, // Reduced from 90
          transition: baseTransition
        }
      };
    }
    
    // Default to simple fade
    return {
      enter: {
        opacity: 1,
        transition: baseTransition
      },
      exit: {
        opacity: 0,
        transition: baseTransition
      }
    }
  }, [duration, transitionType, direction, prefersReducedMotion, isClient]);

  // Memoize variants to prevent recalculation on every render
  const variants = useMemo(() => getVariants(), [getVariants]);
  
  // If not client-side yet, render without animation to avoid hydration issues
  if (!isClient) {
    return <div className="w-full h-full">{children}</div>;
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayLocation}
        variants={variants}
        animate={transitionStage}
        initial="exit"
        className="w-full h-full"
        style={{ 
          perspective: transitionType === 'flip' ? 1000 : undefined, // Reduced from 1200
          transformStyle: transitionType === 'flip' ? 'preserve-3d' : undefined
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;