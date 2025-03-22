'use client';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import CertificateCard from '../ui/CertificateCard';

const Certifications = () => {
  const certificates = [
    {
      title: 'IEEE DTU VIHAAN 6.0',
      issuer: 'IEEE DTU',
      date: 'March 2023',
      image: '/WhatsApp Image 2025-03-13 at 18.09.56_d37b8427.jpg', 
      link: 'https://certificate.givemycertificate.com/c/def31769-6a25-4557-b69e-fa55306852f3'
    },
    {
      title: 'Problem Solving',
      issuer: 'HackerRank',
      date: 'March 2025',
      image: '/WhatsApp Image 2025-03-22 at 22.00.32_9b2f56d6.jpg', 
      link: 'https://www.hackerrank.com/certificates/ec5b8db97669'
    },
    {
      title: 'Java Basics',
      issuer: 'hackerRank',
      date: 'July 2023',
      image: '/WhatsApp Image 2025-03-22 at 16.41.01_34cbb3d4.jpg', 
      link: 'https://www.hackerrank.com/certificates/fdf2832bc51b'
    },
    {
      title: 'Internship',
      issuer: 'mDoc',
      date: 'September 2024',
      image: '/WhatsApp Image 2025-03-13 at 18.01.00_accc8e4d.jpg', // Add your image
      
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Certifications" 
          subtitle="Professional certifications and achievements"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CertificateCard 
                title={cert.title}
                issuer={cert.issuer}
                date={cert.date}
                image={cert.image}
                link={cert.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

};

export default Certifications;