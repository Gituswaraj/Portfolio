'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    // Track mouse position
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Add event listeners for cursor interactions
    const handleLinkHover = () => setCursorVariant('link');
    const handleButtonHover = () => setCursorVariant('button');
    const handleTextHover = () => setCursorVariant('text');
    const handleDefaultCursor = () => setCursorVariant('default');

    // Add mouse move listener
    window.addEventListener('mousemove', mouseMove);

    // Add hover listeners to interactive elements
    const links = document.querySelectorAll('a, .project-card, button');
    const buttons = document.querySelectorAll('button, .btn');
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

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

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      
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
    };
  }, []);

  // Cursor variants for different states
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(100, 100, 255, 0.1)',
      border: '1px solid rgba(100, 100, 255, 0.3)',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(100, 100, 255, 0.2)',
      border: '1px solid rgba(100, 100, 255, 0.5)',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    button: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(255, 100, 100, 0.2)',
      border: '1px solid rgba(255, 100, 100, 0.5)',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    text: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(100, 255, 100, 0.2)',
      border: '1px solid rgba(100, 255, 100, 0.5)',
      transition: {
        type: 'spring',
        mass: 0.6
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
        className="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6
        }}
        transition={{
          type: 'spring',
          mass: 0.2
        }}
      />
    </>
  );
};

export default CustomCursor;