'use client';

import { motion } from 'framer-motion';
import { FaJava, FaReact, FaCode, FaDatabase, FaLaptopCode, FaUsers } from 'react-icons/fa';
import { SiCplusplus, SiJavascript, SiNextdotjs } from 'react-icons/si';
import SectionTitle from '../ui/SectionTitle';
import SkillCard from '../ui/SkillCard';

const Skills = () => {
  const technicalSkills = [
    { icon: <FaJava />, name: 'Java', level: 85 },
    { icon: <SiCplusplus />, name: 'C++', level: 80 },
    { icon: <SiJavascript />, name: 'JavaScript', level: 90 },
    { icon: <FaReact />, name: 'React.js', level: 85 },
    { icon: <SiNextdotjs />, name: 'Next.js', level: 80 },
    { icon: <FaDatabase />, name: 'Data Structures', level: 75 },
  ];

  const softSkills = [
    { icon: <FaUsers />, name: 'Team Collaboration', level: 90 },
    { icon: <FaLaptopCode />, name: 'Problem Solving', level: 85 },
    { icon: <FaCode />, name: 'Analytical Thinking', level: 80 },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="My Skills" 
          subtitle="A showcase of my technical abilities and soft skills"
        />
        
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 text-center md:text-left">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technicalSkills.map((skill, index) => (
              <SkillCard 
                key={index}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-6 text-center md:text-left">Soft Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <SkillCard 
                key={index}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;