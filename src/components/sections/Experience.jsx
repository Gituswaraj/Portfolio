'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';
import InteractiveTimeline from '../ui/InteractiveTimeline';
import ScrollAnimation from '../ui/ScrollAnimation';
import ScrambledText from '../ui/ScrambledText';

const Experience = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'cards'

  const experiences = [
    {
      id: 'exp1',
      title: 'SDE Intern',
      company: 'Comtech Info Solutions Private Limited',
      period: '07/2025 - 12/2025',
      startDate: '2025-07-01',
      description: 'Contributed to design and implementation of backend features using Node.js and RESTful APIs. Wrote clean, efficient, and well-documented code following best practices.',
      skills: ['Node.js', 'REST APIs', 'SDLC', 'JavaScript'],
      achievements: [
        'Implemented core backend features for client applications',
        'Followed SDLC practices to deliver stable software increments',
        'Participated in code reviews to ensure high-quality codebase'
      ]
    },
    {
      id: 'exp2',
      title: 'Tech Research Intern (Frontend-focused)',
      company: 'mDoc Info Pvt. Ltd.',
      period: '07/2024 - 12/2024',
      startDate: '2024-07-01',
      description: 'Improved React frontend performance and optimized user experience under high load. Conducted data-driven feature analysis.',
      skills: ['React.js', 'Performance Optimization', 'Code-splitting', 'Lazy-loading'],
      achievements: [
        'Reduced load-times through code-splitting and lazy-loading',
        'Improved platform scalability through system testing',
        'Conducted data-driven analysis to improve feature performance'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeInUp">
          <SectionTitle
            title="Work Experience"
            subtitle="My professional journey in project management and research"
          />
        </ScrollAnimation>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 p-1">
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'timeline'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Timeline View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'cards'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Card View
            </button>
          </div>
        </div>

        <ScrollAnimation animation="fadeIn" delay={0.2}>
          {viewMode === 'timeline' ? (
            <InteractiveTimeline experiences={experiences} darkMode={darkMode} />
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 rounded-full hidden md:block"></div>

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="md:w-1/2 flex justify-center items-center">
                      <div className="relative">
                        {/* Timeline dot */}
                        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hidden md:block"></div>
                        <div className="bg-white dark:bg-gray-800/30 p-6 rounded-lg shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 relative z-10 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                              <FaBriefcase className="text-blue-500" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{exp.title}</h3>
                              <p className="text-blue-500 dark:text-blue-400">{exp.company}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{exp.period}</p>
                          <ScrambledText
                            className="text-gray-600 dark:text-gray-300 mb-4 text-sm"
                            radius={60}
                            speed={0.5}
                            duration={0.8}
                          >
                            {exp.description}
                          </ScrambledText>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Experience;