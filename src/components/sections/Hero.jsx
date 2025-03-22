'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0a0a0a] dark:to-blue-900/20 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-transparent bg-clip-text">Swaraj Kumar</span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6">
            Web Developer & Electronics Engineer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            I specialize in creating responsive web applications and innovative electronic solutions. With a background in project management and research, I bring a unique perspective to every project.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </div>
          
          <div className="flex gap-4">
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
              href="https://www.linkedin.com/in/swaraj-kumar-07470b259?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Byj5UsyKFRmeUk6BsUqZCGw%3D%3D"
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
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full p-1 shadow-xl">
            <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full overflow-hidden">
              {/* Replace with your profile image */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                
                
                <Image 
                  src="/portfolio.jpg.png" 
                  alt="Swaraj Kumar" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;