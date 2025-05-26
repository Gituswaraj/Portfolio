'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = ({ darkMode }) => {
  // Use motion values for smoother animation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add spring physics for more natural movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Track mouse position with smoother animation
    const mouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Set cursor as active once mouse moves
      if (!isActive) {
        setIsActive(true);
      }
    };

    // Add event listeners for cursor interactions with additional effects
    const handleLinkHover = () => {
      setCursorVariant('link');
      document.body.style.cursor = 'none';
    };
    
    const handleButtonHover = () => {
      setCursorVariant('button');
      document.body.style.cursor = 'none';
    };
    
    const handleTextHover = () => {
      setCursorVariant('text');
      document.body.style.cursor = 'none';
    };
    
    const handleImageHover = () => {
      setCursorVariant('image');
      document.body.style.cursor = 'none';
    };
    
    const handleDefaultCursor = () => {
      setCursorVariant('default');
      document.body.style.cursor = 'none';
    };
    
    // Handle mouse down/up for click effect
    const handleMouseDown = () => setCursorVariant('clicked');
    const handleMouseUp = () => setCursorVariant(prev => prev === 'clicked' ? 'default' : prev);

    // Add mouse move listener
    window.addEventListener('mousemove', mouseMove);

    // Add hover listeners to interactive elements with more specific selectors
    const links = document.querySelectorAll('a, .project-card, .nav-link, [data-cursor="link"]');
    const buttons = document.querySelectorAll('button, .btn, input[type="submit"], [data-cursor="button"]');
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, [data-cursor="text"]');
    const imageElements = document.querySelectorAll('img, .image-container, [data-cursor="image"]');

    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleDefaultCursor);
    });

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleButtonHover);
      button.addEventListener('mouseleave', handleDefaultCursor);
    });

    textElements.forEach(element => {
      element.addEventListener('mouseenter', handleTextHover);
      element.addEventListener('mouseleave', handleDefaultCursor);
    });
    
    imageElements.forEach(element => {
      element.addEventListener('mouseenter', handleImageHover);
      element.addEventListener('mouseleave', handleDefaultCursor);
    });
    
    // Add click listeners for cursor animation
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleDefaultCursor);
      });

      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleButtonHover);
        button.removeEventListener('mouseleave', handleDefaultCursor);
      });

      textElements.forEach(element => {
        element.removeEventListener('mouseenter', handleTextHover);
        element.removeEventListener('mouseleave', handleDefaultCursor);
      });
      
      imageElements.forEach(element => {
        element.removeEventListener('mouseenter', handleImageHover);
        element.removeEventListener('mouseleave', handleDefaultCursor);
      });
      
      // Reset cursor style
      document.body.style.cursor = '';
    };
  }, []);

  // Enhanced cursor variants for different states with dark mode support
  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: darkMode ? 'rgba(150, 150, 255, 0.1)' : 'rgba(100, 100, 255, 0.1)',
      border: darkMode ? '1px solid rgba(150, 150, 255, 0.3)' : '1px solid rgba(100, 100, 255, 0.3)',
      opacity: isActive ? 1 : 0,
      scale: 1,
      transition: {
        type: 'spring',
        mass: 0.6,
        opacity: { duration: 0.3 }
      }
    },
    link: {
      height: 48,
      width: 48,
      backgroundColor: 'rgba(100, 100, 255, 0.2)',
      border: '1px solid rgba(100, 100, 255, 0.5)',
      mixBlendMode: 'difference',
      scale: 1.2,
      opacity: isActive ? 1 : 0,
      transition: {
        type: 'spring',
        mass: 0.6,
        opacity: { duration: 0.3 }
      }
    },
    button: {
      height: 40,
      width: 40,
      backgroundColor: darkMode ? 'rgba(255, 120, 120, 0.2)' : 'rgba(255, 100, 100, 0.2)',
      border: darkMode ? '1px solid rgba(255, 120, 120, 0.5)' : '1px solid rgba(255, 100, 100, 0.5)',
      scale: 1.1,
      opacity: isActive ? 1 : 0,
      transition: {
        type: 'spring',
        mass: 0.6,
        opacity: { duration: 0.3 }
      }
    },
    text: {
      height: 24,
      width: 24,
      backgroundColor: darkMode ? 'rgba(120, 255, 120, 0.2)' : 'rgba(100, 255, 100, 0.2)',
      border: darkMode ? '1px solid rgba(120, 255, 120, 0.5)' : '1px solid rgba(100, 255, 100, 0.5)',
      scale: 1,
      opacity: isActive ? 1 : 0,
      transition: {
        type: 'spring',
        mass: 0.6,
        opacity: { duration: 0.3 }
      }
    },
    image: {
      height: 60,
      width: 60,
      backgroundColor: 'transparent',
      border: darkMode ? '2px solid rgba(255, 255, 255, 0.5)' : '2px solid rgba(0, 0, 0, 0.5)',
      scale: 1,
      opacity: isActive ? 1 : 0,
      transition: {
        type: 'spring',
        mass: 0.6,
        opacity: { duration: 0.3 }
      }
    },
    clicked: {
      height: 32,
      width: 32,
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
      border: darkMode ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(0, 0, 0, 0.5)',
      scale: 0.8,
      opacity: isActive ? 1 : 0,
      transition: {
        type: 'spring',
        mass: 0.6,
        opacity: { duration: 0.3 }
      }
    }
  };

  // Hide default cursor with CSS
  useEffect(() => {
    document.body.classList.add('custom-cursor');
    return () => document.body.classList.remove('custom-cursor');
  }, []);

  return (
    <>
      <style jsx global>{`
        .custom-cursor {
          cursor: none;
        }
        .custom-cursor * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          .cursor-dot, .cursor-ring {
            display: none !important;
          }
        }
      `}</style>
      <motion.div
        className="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block backdrop-blur-sm"
        variants={variants}
        animate={cursorVariant}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%'
        }}
      />
      <motion.div
        className={`cursor-dot fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50 hidden md:block ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: '-50%',
          y: '-50%',
          opacity: isActive ? 1 : 0
        }}
        transition={{
          type: 'spring',
          mass: 0.2,
          opacity: { duration: 0.3 }
        }}
        animate={{
          scale: cursorVariant === 'clicked' ? 0.5 : 1
        }}
      />
    </>
  );
};

export default CustomCursor;