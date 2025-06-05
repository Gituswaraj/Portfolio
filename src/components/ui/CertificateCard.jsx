'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

const CertificateCard = ({ title, issuer, date, image, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800/30 rounded-lg overflow-hidden shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative overflow-hidden h-40 cursor-pointer" onClick={() => setIsOpen(true)}>
        {image && (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm opacity-90">{issuer}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="View Certificate"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      {/* Modal for zoomed view */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {image && (
              <Image
                src={image}
                alt={title}
                width={800}
                height={600}
                className="object-contain"
              />
            )}
            <button
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/40 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CertificateCard;