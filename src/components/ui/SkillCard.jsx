'use client';

import { motion } from 'framer-motion';

const SkillCard = ({ icon, name, level }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800/30 rounded-lg p-4 shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-3xl mb-2 text-blue-500">{icon}</div>
      <h3 className="font-medium text-center">{name}</h3>
      {level && (
        <div className="w-full mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 h-1.5 rounded-full" 
            style={{ width: `${level}%` }}
          ></div>
        </div>
      )}
    </motion.div>
  );
};

export default SkillCard;