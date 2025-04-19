'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  const projects = [
    {
      title: 'Proximity Sensor',
      description: 'An IoT-based proximity detection system using Arduino and ultrasonic sensors for accurate distance measurement and obstacle detection.',
      image: '/proximity.webp', 
      tags: ['Arduino', 'IoT', 'Electronics', 'C++'],
      demo: null
    },
    {
      title: 'E-cart Website',
      description: 'A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration.',
      image: '/ecart.jpg', 
      tags: ['React.js', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/Gituswaraj',
      demo: null
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and React to showcase skills, projects, and professional experience.',
      image: '/portfolio.jpg.png', 
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/Gituswaraj',
      demo: 'https://portfolio-git-main-swarajs-projects-69d918fd.vercel.app/'
    },
    {
      title: 'TourPhin',
      description: 'A travel companion app that helps users discover local attractions, plan itineraries, and navigate unfamiliar destinations.',
      image: '/tourphinimg.png', 
      tags: ['React Native', 'Firebase', 'Google Maps API', 'Node.js'],
      github: 'https://github.com/Gituswaraj',
      demo: 'https://tour-phin.vercel.app/'
    }
  ];

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && activeIndex < projects.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, projects.length]);

  return (
    <motion.section 
      id="projects" 
      className="py-20 bg-gray-50 dark:bg-gray-900/30 overflow-hidden"
      ref={containerRef}
      style={{ opacity, scale }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="My Projects" 
          subtitle="Explore some of my recent work in web development and electronics"
        />
        
        {/* Project navigation dots */}
        <div className="flex justify-center mb-8 gap-2">
          {projects.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-300 dark:bg-gray-700'}`}
              aria-label={`View project ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Horizontal scroll container */}
        <div className="relative overflow-hidden py-4">
          <motion.div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${activeIndex * 100}% / ${projects.length}))` }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="min-w-full md:min-w-[50%] px-4 snap-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  github={project.github}
                  demo={project.demo}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <motion.button
            onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
            className={`px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            whileHover={activeIndex > 0 ? { scale: 1.05 } : {}}  
            whileTap={activeIndex > 0 ? { scale: 0.95 } : {}}
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            Previous
          </motion.button>
          <motion.button
            onClick={() => activeIndex < projects.length - 1 && setActiveIndex(activeIndex + 1)}
            className={`px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white ${activeIndex === projects.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
            whileHover={activeIndex < projects.length - 1 ? { scale: 1.05 } : {}}
            whileTap={activeIndex < projects.length - 1 ? { scale: 0.95 } : {}}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;