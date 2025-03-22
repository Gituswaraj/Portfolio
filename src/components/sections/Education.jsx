'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Technology',
      field: 'Electronics and Communication Engineering',
      institution: 'Bhagwan Parshuram Institute Of Technology,IPU',
      location: 'Delhi, India',
      period: '2022 - 2026',
      description: 'Pursuing B.Tech in Electronics and Communication Engineering with a focus on embedded systems and digital signal processing. Participated in various technical competitions and workshops, enhancing practical knowledge and team collaboration skills.'
    },

  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Education" 
          subtitle="My academic background and qualifications"
        />
        
        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800/30 rounded-lg p-6 shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <FaGraduationCap className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-blue-500 dark:text-blue-400">{edu.field}</p>
                </div>
              </div>
              
              <div className="ml-16 space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaUniversity className="mr-2" />
                  <span>{edu.institution}, {edu.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaCalendarAlt className="mr-2" />
                  <span>{edu.period}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  {edu.description}
                </p>
                
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-2">Key Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Digital Electronics', 'Microprocessors', 'Signal Processing', 'Communication Systems', 'Embedded Systems'].map((course, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;