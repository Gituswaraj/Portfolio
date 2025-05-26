'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const InteractiveTimeline = ({ experiences, darkMode }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, experiences.length);
  }, [experiences]);

  // Handle scroll to update active timeline item
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineCenter = timelineRect.top + timelineRect.height / 2;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - timelineCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      setActiveIndex(closestIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative" ref={timelineRef}>
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>
      
      {experiences.map((experience, index) => {
        const isExpanded = expandedId === experience.id;
        const isActive = activeIndex === index;
        
        return (
          <div 
            key={experience.id}
            ref={el => itemRefs.current[index] = el}
            className={`relative flex flex-col md:flex-row md:even:flex-row-reverse items-start mb-12 ${isActive ? 'z-10' : 'z-0'}`}
          >
            {/* Timeline dot */}
            <motion.div 
              className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300 dark:bg-gray-700'}`}
              animate={{
                scale: isActive ? 1.2 : 1,
                boxShadow: isActive ? '0 0 15px rgba(79, 70, 229, 0.5)' : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              <FaBriefcase className={isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'} />
            </motion.div>
            
            {/* Content card */}
            <motion.div 
              className={`ml-16 md:ml-0 md:w-5/12 p-5 rounded-lg shadow-lg cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} transition-all duration-300 ${isActive ? 'border-l-4 border-purple-500' : ''}`}
              layout
              onClick={() => toggleExpand(experience.id)}
              whileHover={{ y: -5 }}
              animate={{
                boxShadow: isActive 
                  ? '0 10px 25px -5px rgba(79, 70, 229, 0.2)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400">{experience.company}</h4>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                >
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                <FaCalendarAlt className="mr-2" />
                <span>{experience.period}</span>
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-700 dark:text-gray-300">{experience.description}</p>
                    
                    {experience.skills && (
                      <div className="mt-4">
                        <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex}
                              className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {experience.achievements && (
                      <div className="mt-4">
                        <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Achievements</h5>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Date indicator for desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {new Date(experience.startDate).getFullYear()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveTimeline;