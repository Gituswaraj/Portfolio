'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';
import ScrollAnimation from '../ui/ScrollAnimation';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [isClient, setIsClient] = useState(false);
  const formRef = useRef(null);
  
  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // Use a fixed success value for server-side rendering
      // and only generate random value on client-side
      // This prevents hydration mismatch
      const isSuccess = isClient ? Math.random() < 0.9 : true;
      
      setIsSubmitting(false);
      setSubmitStatus(isSuccess ? 'success' : 'error');
      
      if (isSuccess) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'swarajkumar830@gmail.com',
      link: 'mailto:swarajkumar830@gmail.com'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+91 8709236370',
      link: 'tel:+91 8709236370'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Delhi, India',
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeInUp">
          <SectionTitle 
            title="Contact Me" 
            subtitle="Get in touch for collaborations or inquiries"
          />
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ScrollAnimation animation="fadeInLeft" className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6">Let's Connect</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-4 bg-white dark:bg-gray-800/30 rounded-lg shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-4 text-white">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-sm text-blue-500 hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fadeInRight" className="lg:col-span-2">
            <motion.div 
              className="bg-white dark:bg-gray-800/30 rounded-lg p-6 shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center"
                  >
                    <FaCheck className="mr-2" />
                    Thank you for your message! I'll get back to you soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center"
                  >
                    <FaExclamationTriangle className="mr-2" />
                    Oops! Something went wrong. Please try again later.
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 transition-colors`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 transition-colors`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${formErrors.subject ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 transition-colors`}
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.subject}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-2 border ${formErrors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 resize-none transition-colors`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.message}</p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white rounded-full font-medium hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-70 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600"
                    initial={{ x: '-100%' }}
                    animate={{ x: isSubmitting ? '0%' : '-100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </form>
            </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      
    </section>
  );
};

export default Contact;