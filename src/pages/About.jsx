import React from "react"
import { motion } from 'framer-motion';
const About = () => {
  return (
   
 <div className="min-h-screen flex justify-center items-center">
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto  backdrop-blur-md rounded-2xl shadow-2xl p-8 text-black"
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          About This App
        </motion.h1>

        <motion.div 
          className="space-y-6 text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>
            This is a beautiful counter application built with Next.js and Framer Motion for smooth animations.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">Features</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">✓</span>
              <span>Responsive design that works on all devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">✓</span>
              <span>Smooth animations with Framer Motion</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">✓</span>
              <span>Modern UI with glassmorphism effect</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">✓</span>
              <span>Accessible and user-friendly interface</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8">Technology Stack</h2>
          <div className="flex flex-wrap gap-4">
            {['Next.js', 'React', 'Framer Motion', 'Tailwind CSS'].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-700 rounded-full text-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
 </div>
  
  );
};

export default About;