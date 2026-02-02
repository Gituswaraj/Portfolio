'use client';

import { motion } from 'framer-motion';

const SkillCard = ({ icon, name, level }) => {
  return (
    <motion.div
      className="bg-white/70 dark:bg-gray-800/20 rounded-xl p-5 shadow-sm backdrop-blur-md border border-gray-200/50 dark:border-white/5 flex flex-col items-center group relative overflow-hidden transition-colors hover:border-blue-500/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500" />

      <div className="text-4xl mb-3 text-blue-500 group-hover:scale-110 transition-transform duration-300 z-10">{icon}</div>
      <h3 className="font-bold text-center mb-3 z-10">{name}</h3>

      {level && (
        <div className="w-full mt-auto bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-1.5 overflow-hidden z-10">
          <motion.div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SkillCard;