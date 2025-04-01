'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
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

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="My Projects" 
          subtitle="Explore some of my recent work in web development and electronics"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
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
        </div>
      </div>
    </section>
  );
};

export default Projects;