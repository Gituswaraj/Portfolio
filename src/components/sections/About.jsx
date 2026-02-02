'use client';

import { motion } from 'framer-motion';
import { FaUserGraduate, FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';
import RotatingText from '../ui/RotatingText';
import TrueFocus from '../ui/TrueFocus';

const About = () => {
  const stats = [
    { icon: <FaUserGraduate />, label: 'Education', value: 'B.Tech in ECE' },
    { icon: <FaLaptopCode />, label: 'Experience', value: 'Project Management & Research' },
    { icon: <FaProjectDiagram />, label: 'Projects', value: '4+ Completed' },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Me"
          subtitle={
            <span className="flex flex-wrap justify-center items-center gap-1">
              <span>Learn more about my background and experience in</span>
              <RotatingText
                texts={['Research', 'Web Dev', 'Innovation', 'Design']}
                mainClassName="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md italic font-medium"
                staggerFrom="first"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.02}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </span>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <TrueFocus
              sentence="Passion Innovation Excellence"
              manualMode={false}
              blurAmount={5}
              borderColor="#3b82f6"
              animationDuration={0.8}
              pauseBetweenAnimations={1.5}
              className="mb-8 !justify-start"
            />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              I'm Swaraj Kumar, a passionate Electronics and Communication Engineering undergraduate with a strong foundation in web development and programming.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              My journey in technology has equipped me with skills in project management and research, allowing me to approach problems with analytical thinking and creative solutions.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              I specialize in developing responsive web applications using modern technologies like React.js and Next.js, while also leveraging my background in electronics for innovative projects that bridge hardware and software.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800/30 p-6 rounded-lg shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-3xl mb-2 text-blue-500 flex justify-center">{stat.icon}</div>
                <h3 className="font-bold">{stat.label}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;