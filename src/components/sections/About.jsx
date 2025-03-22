'use client';

import { motion } from 'framer-motion';
import { FaUserGraduate, FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';

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
          subtitle="Learn more about my background and experience in project management and research"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Who am I?</h3>
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