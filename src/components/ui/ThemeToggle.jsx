'use client';

import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = ({ toggleTheme, isDarkMode }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <motion.div
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 45, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaSun className="text-yellow-400" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -45, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaMoon className="text-gray-700" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeToggle;