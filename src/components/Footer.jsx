'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="#home" className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-transparent bg-clip-text">
              Swaraj Kumar
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Web Developer & Electronics Engineer
            </p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <motion.a
              href="https://github.com/Gituswaraj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-xl"
              whileHover={{ y: -3 }}
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/swaraj-kumar-07470b259/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-xl"
              whileHover={{ y: -3 }}
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="mailto:swarajkumar830@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-xl"
              whileHover={{ y: -3 }}
              aria-label="Email Me"
            >
              <FaEnvelope />
            </motion.a>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Swaraj Kumar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;