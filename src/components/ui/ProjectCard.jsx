'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

const ProjectCard = ({ title, description, image, tags, github, demo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800/30 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="relative overflow-hidden h-48 sm:h-56">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex space-x-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-gray-900 p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="View GitHub Repository"
              >
                <FaGithub />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors"
                aria-label="View Live Demo"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;