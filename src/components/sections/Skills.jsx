'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaReact, FaCode, FaDatabase, FaLaptopCode, FaUsers } from 'react-icons/fa';
import { SiCplusplus, SiJavascript, SiNextdotjs } from 'react-icons/si';
import SectionTitle from '../ui/SectionTitle';
import SkillCard from '../ui/SkillCard';
import { ThreeDIcon, getSkillIconProps } from '../ui/3d';
import ScrollAnimation from '../ui/ScrollAnimation';
import TrueFocus from '../ui/TrueFocus';

const Skills = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('3d');
  const technicalSkills = [
    { icon: <SiJavascript />, name: 'JavaScript', level: 90 },
    { icon: <FaReact />, name: 'React.js', level: 85 },
    { icon: <SiNextdotjs />, name: 'Next.js', level: 80 },
    { icon: <SiCplusplus />, name: 'C++', level: 85 },
    { icon: <FaDatabase />, name: 'MongoDB', level: 75 },
    { icon: <FaCode />, name: 'TypeScript', level: 70 },
    { icon: <FaLaptopCode />, name: 'Node.js', level: 80 },
    { icon: <FaCode />, name: 'Git', level: 85 },
  ];

  const softSkills = [
    { icon: <FaUsers />, name: 'Team Collaboration', level: 90 },
    { icon: <FaLaptopCode />, name: 'Problem Solving', level: 95 },
    { icon: <FaUsers />, name: 'Creative Thinking', level: 85 },
    { icon: <FaLaptopCode />, name: 'Project Management', level: 80 },
    { icon: <FaDatabase />, name: 'Data-Driven', level: 85 },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <TrueFocus
            sentence="My Skills"
            manualMode={false}
            blurAmount={4}
            borderColor="#8b5cf6"
            animationDuration={0.6}
            pauseBetweenAnimations={1.5}
            className="mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical abilities and soft skills
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>

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
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center gap-3">
              <span className="w-10 h-[2px] bg-blue-500"></span>
              Technical Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technicalSkills.map((skill, index) => (
                viewMode === '3d' ? (
                  <motion.div
                    key={index}
                    className="relative group bg-white/40 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 h-48 flex flex-col items-center justify-center p-4 transition-all duration-500 hover:border-blue-500/50"
                    whileHover={{ y: -10, scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
                  >
                    {/* Shadow/Glow behind */}
                    <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="h-28 w-full relative mb-1 z-10">
                      <ThreeDIcon
                        skill={skill.name}
                        size="100%"
                        {...getSkillIconProps(skill.name)}
                      />
                    </div>

                    <h4 className="font-bold text-center text-sm md:text-base mb-2 z-10">{skill.name}</h4>

                    <div className="w-full h-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden z-10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
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
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center gap-3">
              <span className="w-10 h-[2px] bg-purple-500"></span>
              Strategic Soft Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {softSkills.map((skill, index) => (
                viewMode === '3d' ? (
                  <motion.div
                    key={index}
                    className="relative group bg-white/40 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 h-48 flex flex-col items-center justify-center p-6 transition-all duration-500 hover:border-purple-500/50"
                    whileHover={{ y: -10, scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
                  >
                    <div className="absolute inset-0 bg-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="h-28 w-full relative mb-1 z-10">
                      <ThreeDIcon
                        skill={skill.name}
                        size="100%"
                        {...getSkillIconProps(skill.name)}
                      />
                    </div>

                    <h4 className="font-bold text-center text-sm mb-2 z-10">{skill.name}</h4>

                    <div className="w-full h-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden z-10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
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