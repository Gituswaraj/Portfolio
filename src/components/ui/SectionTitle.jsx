import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div 
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-transparent bg-clip-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
    </motion.div>
  );
};

export default SectionTitle;