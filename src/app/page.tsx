'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import PageTransition from '@/components/ui/PageTransition';

// Dynamically import heavy components with SSR disabled for better performance
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const ParticleBackground = dynamic(() => import('@/components/ui/ParticleBackground'), { ssr: false });
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), { ssr: false });

// Lazy load components that aren't needed immediately
const Skills = dynamic(() => import('@/components/sections/Skills'));
const Experience = dynamic(() => import('@/components/sections/Experience'));
const Projects = dynamic(() => import('@/components/sections/Projects'));
const Education = dynamic(() => import('@/components/sections/Education'));
const Certifications = dynamic(() => import('@/components/sections/Certifications'));
const Contact = dynamic(() => import('@/components/sections/Contact'));

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
    }
  }, []);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update theme when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Track scroll position for particle effect interaction with throttling
  const scrollRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setScrollY(window.scrollY);
          timeoutId = null;
        }, 50); // Throttle to 50ms
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <PageTransition location="home">
      <div 
        className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300"
        ref={scrollRef}
      >
        {isClient && <CustomCursor darkMode={isDarkMode} />}

        {/* Only render particle background on client side */}
        {isClient && (
          <div className="fixed inset-0 -z-10">
            <ParticleBackground isDarkMode={isDarkMode} scrollFactor={scrollY * 0.01} />
          </div>
        )}

        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

        {/* Hero section with parallax */}
        {isClient ? (
          <ParallaxBackground darkMode={isDarkMode} className="min-h-screen">
            <ScrollAnimation animation="fadeIn">
              <Hero />
            </ScrollAnimation>
          </ParallaxBackground>
        ) : (
          <div className="min-h-screen">
            <Hero />
          </div>
        )}

        <ScrollAnimation animation="fadeInUp">
          <About />
        </ScrollAnimation>

        {/* Wrap sections in Suspense for better loading performance */}
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <ScrollAnimation animation="fadeIn" duration={0.4}>
            <Skills darkMode={isDarkMode} />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" duration={0.4}>
            <Experience darkMode={isDarkMode} />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn" duration={0.4}>
            <Projects darkMode={isDarkMode} />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" duration={0.4}>
            <Education />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn" duration={0.4}>
            <Certifications />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" duration={0.4}>
            <Contact darkMode={isDarkMode} />
          </ScrollAnimation>
        </Suspense>

        <Footer />
      </div>
    </PageTransition>
  );
}