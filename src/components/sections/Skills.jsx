'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaReact, FaCode, FaDatabase, FaLaptopCode, FaUsers } from 'react-icons/fa';
import { SiCplusplus, SiJavascript, SiNextdotjs } from 'react-icons/si';
import SectionTitle from '../ui/SectionTitle';
import SkillCard from '../ui/SkillCard';
import { ThreeDIcon, getSkillIconProps } from '../ui/3d';
import ScrollAnimation from '../ui/ScrollAnimation';

const Skills = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('flat'); // Changed from '3d' to 'flat'
  const technicalSkills = [
    { icon: <FaJava />, name: 'Java', level: 85 },
    { icon: <SiCplusplus />, name: 'C++', level: 80 },
    { icon: <SiJavascript />, name: 'JavaScript', level: 90 },
    { icon: <FaReact />, name: 'React.js', level: 85 },
    { icon: <SiNextdotjs />, name: 'Next.js', level: 80 },
    { icon: <FaDatabase />, name: 'Data Structures', level: 75 },
  ];

  const softSkills = [
    { icon: <FaUsers />, name: 'Team Collaboration', level: 90 },
    { icon: <FaLaptopCode />, name: 'Problem Solving', level: 85 },
    { icon: <FaCode />, name: 'Analytical Thinking', level: 80 },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeInUp">
          <SectionTitle 
            title="My Skills" 
            subtitle="A showcase of my technical abilities and soft skills"
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
              3D View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('flat')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'flat' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Classic View
            </button>
          </div>
        </div>
        
        <ScrollAnimation animation="fadeIn" delay={0.2}>
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center md:text-left">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technicalSkills.map((skill, index) => (
                viewMode === '3d' ? (
                  <motion.div 
                    key={index}
                    className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-40 flex flex-col items-center justify-center p-4 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="h-24 w-full relative mb-2">
                      <ThreeDIcon 
                        skill={skill.name} 
                        {...getSkillIconProps(skill.name)}
                      />
                    </div>
                    <h4 className="font-medium text-center">{skill.name}</h4>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <SkillCard 
                    key={index}
                    icon={skill.icon}
                    name={skill.name}
                    level={skill.level}
                  />
                )
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-center md:text-left">Soft Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => (
                viewMode === '3d' ? (
                  <motion.div 
                    key={index}
                    className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-40 flex flex-col items-center justify-center p-4 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="h-24 w-full relative mb-2">
                      <ThreeDIcon 
                        skill={skill.name} 
                        {...getSkillIconProps(skill.name)}
                      />
                    </div>
                    <h4 className="font-medium text-center">{skill.name}</h4>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <SkillCard 
                    key={index}
                    icon={skill.icon}
                    name={skill.name}
                    level={skill.level}
                  />
                )
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Skills;