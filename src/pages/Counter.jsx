import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiRefreshCw } from 'react-icons/fi';


const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < 10) {
      setCount(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
         <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto  backdrop-blur-md rounded-2xl shadow-2xl p-10  "
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500"
        >
          Counter
        </motion.h1>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: { duration: 0.3 }
          }}
          key={count}
          className="flex justify-center my-10"
        >
          <span className="text-8xl font-bold text-blue-900">
            {count}
          </span>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={count === 0}
            onClick={handleDecrement}
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full ${
              count === 0
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-red-500/90 hover:bg-red-600 text-white"
            } transition-all`}
          >
            <FiMinus size={20} />
            <span>Decrement</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={count === 10}
            onClick={handleIncrement}
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full ${
              count === 10
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-green-500/90 hover:bg-green-600 text-white"
            } transition-all`}
          >
            <FiPlus size={20} />
            <span>Increment</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-blue-800 text-white transition-all"
          >
            <FiRefreshCw size={20} />
            <span>Reset</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
     
  );
};

export default Counter;