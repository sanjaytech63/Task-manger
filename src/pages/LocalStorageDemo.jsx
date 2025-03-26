import React, { useEffect,useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';

const LocalStorageDemo = () => {
  const [name, setName] = useLocalStorage('name', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [counter, setCounter] = useLocalStorage('counter', 0);
  const [isExploding, setIsExploding] = useState(false);

  // Theme change animation
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  }, [theme]);

  const handleCounterChange = (operation) => {
    if (operation === 'increment') {
      setCounter(c => c + 1);
    } else if (operation === 'decrement' && counter > 0) {
      setCounter(c => c - 1);
    } else if (operation === 'reset') {
      setIsExploding(true);
      setTimeout(() => {
        setCounter(0);
        setIsExploding(false);
      }, 500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-8 min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="max-w-md mx-auto space-y-6">
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          useLocalStorage Demo
        </motion.h1>
        
        {/* Name Input Section */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="block text-lg font-medium">Your Name:</label>
          <motion.input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            whileFocus={{ scale: 1.02 }}
            placeholder="Enter your name"
          />
          <AnimatePresence>
            {name && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-lg"
              >
                Hello, <span className="font-bold text-purple-500 dark:text-pink-400">{name}</span>!
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Theme Selector */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <label className="block text-lg font-medium">Select Theme:</label>
          <motion.div 
            className="flex gap-2"
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg transition-all ${theme === 'light' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              🌙 Dark
            </button>
          </motion.div>
        </motion.div>

        {/* Counter Section */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <label className="block text-lg font-medium">Counter:</label>
          <div className="flex items-center gap-4">
            <motion.button 
              onClick={() => handleCounterChange('decrement')}
              className="px-6 py-3 bg-red-500 text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={counter <= 0}
            >
              ➖
            </motion.button>
            
            <AnimatePresence mode="wait">
              <motion.span 
                key={counter}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: isExploding ? 1.5 : 1,
                  opacity: 1,
                  color: isExploding ? '#EC4899' : (theme === 'dark' ? 'white' : 'black')
                }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-3xl font-bold mx-4"
              >
                {counter}
              </motion.span>
            </AnimatePresence>
            
            <motion.button 
              onClick={() => handleCounterChange('increment')}
              className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ➕
            </motion.button>
          </div>
          
          <motion.button 
            onClick={() => handleCounterChange('reset')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mt-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            🔄 Reset Counter
          </motion.button>
        </motion.div>

        {/* Storage Preview */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-gray-500 dark:bg-gray-800 rounded-xl shadow-inner"
        >
          <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
            <motion.span 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="inline-block"
            >
              🎛️
            </motion.span>
            Current Storage Data
          </h2>
          <motion.pre 
            className="text-sm p-3 bg-white text-black dark:bg-gray-900  rounded-lg overflow-x-auto"
            whileHover={{ scale: 1.01 }}
          >
            {JSON.stringify({
              name,
              theme,
              counter
            }, null, 2)}
          </motion.pre>
        </motion.div>

        {/* Floating Particles for Reset Animation */}
        <AnimatePresence>
          {isExploding && (
            <>
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: '50%',
                    top: '50%',
                    color: ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981'][Math.floor(Math.random() * 4)]
                  }}
                >
                  {['✨', '💥', '🌟', '⚡'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LocalStorageDemo;