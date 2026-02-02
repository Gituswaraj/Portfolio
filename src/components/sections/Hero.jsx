'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import Galaxy to avoid SSR issues with WebGL
const Galaxy = dynamic(() => import('@/components/ui/Galaxy'), { ssr: false });

import { portfolioData } from '../portfolioData';
import RotatingText from '../ui/RotatingText';
import ScrambledText from '../ui/ScrambledText';
import ProfileCard from '../ui/ProfileCard';

const Hero = () => {
  const { personalInfo, summary } = portfolioData;

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Galaxy background */}
      <div className="absolute inset-0 -z-20">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.05}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          transparent={false}
        />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-blue-900/20 -z-10" />

      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full"
          >
            Available for Opportunities
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 text-transparent bg-clip-text">Swaraj Kumar</span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-medium text-gray-300 mb-6 flex items-center gap-3 overflow-hidden">
            <span className="w-8 h-[2px] bg-blue-500 flex-shrink-0"></span>
            <span className="text-gray-400">Professional</span>
            <RotatingText
              texts={['Full Stack Developer', 'Software Engineer', 'SDE Intern', 'Problem Solver']}
              mainClassName="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg justify-center italic font-semibold"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </h2>

          <ScrambledText
            className="text-gray-400 mb-8 max-w-lg leading-relaxed text-lg"
            radius={80}
            speed={0.4}
            duration={1}
          >
            {summary}
          </ScrambledText>

          <div className="flex flex-wrap gap-4 mb-10">
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-4 border border-gray-700 rounded-xl font-bold text-white hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.a>
          </div>

          <div className="flex gap-6 items-center">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Connect</span>
            <div className="flex gap-4">
              <motion.a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700/50 transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-blue-600 border border-gray-700/50 transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-red-600/80 border border-gray-700/50 transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                aria-label="Email Me"
              >
                <FaEnvelope />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center perspective-1000"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProfileCard
            name="Swaraj Kumar"
            title="Software Engineer"
            handle="Gituswaraj"
            status="Available for Hires"
            contactText="Let's Talk"
            avatarUrl="/portfolio.jpg.png"
            showUserInfo={true}
            enableTilt={true}
            showBehindGlow={true}
            behindGlowColor="rgba(59, 130, 246, 0.5)"
            onContactClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;