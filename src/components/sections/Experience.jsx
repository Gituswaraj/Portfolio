'use client';

import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';

const Experience = () => {
  const experiences = [
    {
      title: 'Project Management Intern',
      company: 'MDOC INFO PVT. LTD.',
      period: 'July 2024 - September 2024',
      description: 'Led project management initiatives, coordinated with cross-functional teams, and implemented efficient workflows to ensure timely project delivery.',
      skills: ['Project Management', 'Team Coordination', 'Workflow Optimization']
    },
    {
      title: 'Research Assistant',
      company: 'CodeHelp',
      period: 'Jul 2023 - Dec 2023',
      description: 'Conducted research on emerging technologies, assisted in developing educational content, and contributed to technical documentation for programming courses.',
      skills: ['Technical Research', 'Content Development', 'Documentation']
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Work Experience" 
          subtitle="My professional journey in project management and research"
        />
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 rounded-full hidden md:block"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
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
                    <div className="bg-white dark:bg-gray-800/30 p-6 rounded-lg shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 relative z-10">
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
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
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
      </div>
    </section>
  );
};

export default Experience;