'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import ProjectDetail from '../ui/ProjectDetail';
import { ThreeDProjectShowcase } from '../ui/3d';
import ScrollAnimation from '../ui/ScrollAnimation';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

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
      description: 'An AI-assisted travel platform that helps users discover personalized travel recommendations.',
      image: '/tourphinimg.png',
      longDescription: 'TourPhin is a responsive React.js frontend built with Tailwind CSS. It enables users to explore destinations and receive personalized travel recommendations. The project focused on high UI performance through efficient state management and clean component architecture.',
      features: ['Personalized Travel Recommendations', 'Responsive Tailwind UI', 'Vercel Deployment', 'Optimized State Management'],
      technologies: ['React.js', 'Tailwind CSS', 'Vercel', 'State Management'],
      tags: ['React.js', 'Tailwind', 'AI'],
      github: 'https://github.com/Gituswaraj/TourPhin',
      demo: 'https://tour-phin.vercel.app/'
    },
    {
      title: 'RCA - Root Cause Analysis',
      description: 'A centralized system to identify, track, and analyze root causes of incidents.',
      image: '/proximity.webp',
      longDescription: 'Developed a management system for incident tracking and root cause analysis. Implemented structured workflows for issue logging, cause categorization, and corrective actions to enable data-driven decision-making.',
      features: ['Incident Tracking', 'Root Cause Categorization', 'Corrective Action Workflows', 'Data-driven Reporting'],
      technologies: ['MERN Stack', 'Data Analysis', 'React.js', 'Node.js'],
      tags: ['MERN', 'Analysis', 'Full Stack'],
      github: 'https://github.com/Gituswaraj',
      demo: 'https://rca-beige-phi.vercel.app/'
    },
    {
      title: 'ArchGenie',
      description: 'An automated tool to generate Entity-Relationship (ER) diagrams from system specifications.',
      image: '/ecart.jpg',
      longDescription: 'ArchGenie helps engineers visualize dependencies and data flow by automatically creating ER diagrams. It reduces manual design effort and improves accuracy in database and system modeling.',
      features: ['Automatic ER Diagram Generation', 'Software/Hardware Module Analysis', 'Dependency Visualization', 'System Architecture Planning'],
      technologies: ['System Design', 'React.js', 'Database Modeling'],
      tags: ['System Design', 'ER Diagrams', 'Architecture'],
      github: 'https://github.com/Gituswaraj',
      demo: 'https://archi-genie.vercel.app/'
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
              onClick={() => setViewMode('stacked')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'stacked'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Stacked View
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
          {viewMode === 'stacked' ? (
            <div className="py-10">
              <ScrollStack
                useWindowScroll={false}
                className="h-[600px] rounded-3xl border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm"
                itemStackDistance={40}
                baseScale={0.9}
                itemScale={0.02}
                blurAmount={2}
              >
                {projects.map((project, index) => (
                  <ScrollStackItem
                    key={index}
                    itemClassName="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-white/10"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                      <div className="w-full md:w-1/2 h-48 md:h-full relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                        <span className="text-blue-500 font-bold mb-2 uppercase tracking-widest text-xs">Featured Project</span>
                        <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white leading-tight">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 md:line-clamp-none leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => handleProjectSelect(project)}
                          className="w-fit px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
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