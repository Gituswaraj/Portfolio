'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

// Animation variants for different effects
const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 }
  },
  flip: {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0 }
  },
  slideIn: {
    hidden: { opacity: 0, x: '-100%' },
    visible: { opacity: 1, x: 0 }
  },
  expand: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  }
};

const ScrollAnimation = ({
  children,
  animation = 'fadeInUp',
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  ...props
}) => {
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    // Increase rootMargin to start loading earlier
    rootMargin: '50px 0px',
  });

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Select animation variant or use simplified version if user prefers reduced motion
  const selectedVariant = prefersReducedMotion
    ? animationVariants.fadeIn // Simplified animation for reduced motion preference
    : (animationVariants[animation] || animationVariants.fadeInUp);
  
  // Optimize by disabling animation for non-client rendering
  if (!isClient) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{ 
        duration: duration * 0.8, // Slightly faster animations
        delay, 
        ease: 'easeOut' // Simpler easing function
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;