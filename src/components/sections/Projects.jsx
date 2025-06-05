'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import ProjectDetail from '../ui/ProjectDetail';
import { ThreeDProjectShowcase } from '../ui/3d';
import ScrollAnimation from '../ui/ScrollAnimation';

const Projects = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('classic'); // Changed from '3d' to 'classic'
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  // Handle project selection for detailed view
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };
  
  const projects = [
      {
        title: 'TourPhin',
        description: 'A travel companion app that helps users discover local attractions, plan itineraries, and navigate unfamiliar destinations.',
        image: '/tourphinimg.png',
        longDescription: 'TourPhin is a comprehensive travel companion app that helps users discover local attractions, plan detailed itineraries, and navigate unfamiliar destinations with ease. The app provides personalized recommendations based on user preferences and travel history.',
        features: ['Interactive maps and navigation', 'Attraction recommendations', 'Itinerary planning', 'User reviews and ratings', 'Offline mode for travel without data'],
        technologies: ['React Native', 'Firebase', 'Google Maps API', 'Node.js', 'Express'],
        videoUrl: null,
        tags: ['React Native', 'Firebase', 'Google Maps API', 'Node.js'],
        github: 'https://github.com/Gituswaraj',
        demo: 'https://tour-phin.vercel.app/'
    },
    {
      title: 'Proximity Sensor',
      description: 'An IoT-based proximity detection system using Arduino and ultrasonic sensors for accurate distance measurement and obstacle detection.',
      image: '/proximity.webp',
      longDescription: 'This IoT-based proximity detection system utilizes Arduino and ultrasonic sensors to provide accurate distance measurement and obstacle detection. The system can be configured for various applications including parking assistance, security systems, and automated door controls.',
      features: ['Real-time distance measurement', 'Configurable detection range', 'LED and buzzer indicators', 'Low power consumption'],
      technologies: ['Arduino', 'Ultrasonic Sensors', 'C++', 'Electronics'],
      videoUrl: null,
      tags: ['Arduino', 'IoT', 'Electronics', 'C++'],
      demo: null
    },
    {
      title: 'E-cart Website',
      description: 'A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration.',
      image: '/ecart.jpg',
      longDescription: 'A comprehensive e-commerce platform featuring product catalog management, shopping cart functionality, user authentication, and secure payment integration. The application provides an intuitive shopping experience with responsive design for all devices.',
      features: ['User authentication and profiles', 'Product search and filtering', 'Shopping cart and checkout', 'Payment gateway integration', 'Order tracking'],
      technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
      videoUrl: null,
      tags: ['React.js', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/Gituswaraj',
      demo: null
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and React to showcase skills, projects, and professional experience.',
      image: '/portfolio.jpg.png',
      longDescription: 'A modern, responsive portfolio website built with Next.js and React to showcase skills, projects, and professional experience. The site features smooth animations, dark mode support, and optimized performance for an exceptional user experience.',
      features: ['Responsive design', 'Dark/light mode', 'Interactive UI elements', 'Optimized performance', 'SEO friendly'],
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      videoUrl: null,
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/Gituswaraj',
      demo: 'portfolio-six-khaki-21.vercel.app'
    },
    {
       title: 'Tastemate',
       description: 'An AI-powered MERN stack web app that personalizes meals based on user preferences and reduces food waste in hostels/PGs. Includes smart facility control, chatbot feedback, and an admin panel for efficient resource management.',
       image: '/tastemate-image.png',
       longDescription: 'A full-stack AI-integrated web application built using the MERN stack, designed to optimize food distribution and facility management in hostels and PG accommodations. The system personalizes daily meal suggestions based on individual user preferences, eating habits, and feedback. It includes a smart chatbot that interacts with users to gather meal satisfaction ratings and recommends portion sizes to reduce food waste. Additionally, users can schedule cleaning services, control room settings, and manage personal facility needs—all from a centralized dashboard. The admin panel enables efficient monitoring of user data, meal plans, and facility service requests, ensuring a seamless and sustainable living experience.',
       features: ['Responsive design', 'Dark/light mode', 'Interactive UI elements', 'Optimized performance', 'SEO friendly'],
       technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
       videoUrl: null,
       tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
       github: 'https://github.com/Gituswaraj',
       demo: 'tastemate-lilac.vercel.app'
     }
    
  ];

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    console.log('Initial projects.length:', projects.length, 'activeIndex:', activeIndex);
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && activeIndex < projects.length - 1) {
        setActiveIndex(activeIndex + 1);
        console.log('ArrowRight - new activeIndex:', activeIndex + 1);
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        console.log('ArrowLeft - new activeIndex:', activeIndex - 1);
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
        <ScrollAnimation animation="fadeInUp">
          <SectionTitle 
            title="My Projects" 
            subtitle="Explore some of my recent work in web development and electronics"
          />
        </ScrollAnimation>
        
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 p-1">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === '3d' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              3D Showcase
            </button>
            <button
              type="button"
              onClick={() => setViewMode('classic')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'classic' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Classic View
            </button>
          </div>
        </div>
        
        <ScrollAnimation animation="fadeIn" delay={0.2}>
          {viewMode === '3d' ? (
            <div className="relative h-[500px] w-full my-12 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900/50 rounded-xl overflow-hidden">
              <ThreeDProjectShowcase 
                projects={projects} 
                onSelectProject={handleProjectSelect}
                darkMode={darkMode}
              />
            </div>
          ) : (
            <>
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
                      <div onClick={() => handleProjectSelect(project)}>
                        <ProjectCard 
                          title={project.title}
                          description={project.description}
                          image={project.image}
                          tags={project.tags}
                          github={project.github}
                          demo={project.demo}
                        />
                      </div>
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
            </>
          )}
        </ScrollAnimation>
        
        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={handleCloseDetail} 
          />
        )}
      </div>
    </motion.section>
  );
};

export default Projects;