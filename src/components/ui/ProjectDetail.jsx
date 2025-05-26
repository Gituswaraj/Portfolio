'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaPlay, FaPause } from 'react-icons/fa';
import Image from 'next/image';

const ProjectDetail = ({ project, onClose }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleVideoToggle = () => {
    setVideoPlaying(!videoPlaying);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'tech', label: 'Technologies' },
    { id: 'demo', label: 'Demo', hidden: !project.demo && !project.videoUrl }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
            onClick={onClose}
            aria-label="Close project details"
          >
            <FaTimes size={24} />
          </button>

          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Project media (image or video) */}
            <div className="relative w-full h-64 sm:h-80 bg-gray-200 dark:bg-gray-700">
              {project.videoUrl && activeTab === 'demo' ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`${project.videoUrl}${videoPlaying ? '?autoplay=1' : ''}`}
                    className="w-full h-full"
                    title={`${project.title} demo video`}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  <button
                    className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                    onClick={handleVideoToggle}
                    aria-label={videoPlaying ? 'Pause video' : 'Play video'}
                  >
                    {videoPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Project content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                      aria-label="View GitHub Repository"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                      aria-label="View Live Demo"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex space-x-4">
                  {tabs.filter(tab => !tab.hidden).map((tab) => (
                    <button
                      key={tab.id}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab content */}
              <div className="prose dark:prose-invert max-w-none">
                {activeTab === 'overview' && (
                  <div>
                    <p>{project.description}</p>
                    {project.longDescription && <p>{project.longDescription}</p>}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.features ? (
                        project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))
                      ) : (
                        <li>Feature information not available</li>
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === 'tech' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies ? (
                        project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span>Technology information not available</span>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'demo' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Live Demo</h3>
                    {project.demo ? (
                      <p>
                        Check out the live demo{' '}
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          here
                        </a>
                        .
                      </p>
                    ) : project.videoUrl ? (
                      <p>Watch the demo video above.</p>
                    ) : (
                      <p>No demo available for this project.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;