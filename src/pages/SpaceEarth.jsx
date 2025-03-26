import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAmericas, FaRocket, FaSatellite, FaUserAstronaut } from 'react-icons/fa';

const SpaceEarth = () => {
  const [activeView, setActiveView] = useState('earth');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate content loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const views = [
    {
      id: 'earth',
      title: 'Earth Observation',
      icon: <FaGlobeAmericas className="text-blue-500" />,
      description: 'Explore our beautiful planet from space',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'spacecraft',
      title: 'Spacecraft',
      icon: <FaRocket className="text-orange-500" />,
      description: 'Discover current missions exploring our solar system',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'satellites',
      title: 'Satellites',
      icon: <FaSatellite className="text-green-500" />,
      description: 'Track active satellites orbiting Earth',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'astronauts',
      title: 'Astronauts',
      icon: <FaUserAstronaut className="text-yellow-500" />,
      description: 'Meet the humans living in space',
      color: 'from-red-600 to-red-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity }
              }}
              className="text-6xl text-blue-400"
            >
              <FaSatellite />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Space & Earth Explorer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our planet and beyond through interactive visualization
          </p>
        </motion.header>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {views.map((view) => (
            <motion.button
              key={view.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView(view.id)}
              className={`p-4 rounded-xl transition-all ${activeView === view.id ? 
                `bg-gradient-to-br ${view.color} shadow-lg` : 
                'bg-gray-800 hover:bg-gray-700'}`}
            >
              <div className="text-3xl mb-2">{view.icon}</div>
              <h3 className="font-semibold">{view.title}</h3>
            </motion.button>
          ))}
        </motion.nav>

        {/* Main Visualization */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12"
        >
          {/* Earth View */}
          {activeView === 'earth' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 10, repeat: Infinity }
                }}
                className="relative w-64 h-64 md:w-80 md:h-80"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa89a875eb?q=80&w=1000')] bg-cover rounded-full shadow-[0_0_60px_10px_rgba(56,182,255,0.3)]" />
                <div className="absolute inset-0 rounded-full shadow-[inset_10px_0_20px_rgba(0,0,0,0.7)]" />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity 
                  }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Spacecraft View */}
          {activeView === 'spacecraft' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-950 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-full">
                <motion.div
                  className="absolute top-1/2 left-1/4 text-4xl md:text-6xl"
                  animate={{
                    x: [0, 100, 0],
                    rotate: [0, 360, 0]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <FaRocket className="text-orange-400" />
                </motion.div>
                <motion.div
                  className="absolute top-1/3 right-1/4 text-3xl md:text-5xl"
                  animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaRocket className="text-blue-400" />
                </motion.div>
                <motion.div
                  className="absolute bottom-1/3 left-1/3 text-5xl md:text-7xl"
                  animate={{
                    y: [0, -40, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <FaRocket className="text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Satellites View */}
          {activeView === 'satellites' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-950 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-full">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl md:text-4xl"
                    style={{
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`
                    }}
                    animate={{
                      x: [0, 50, 0, -50, 0],
                      y: [0, 30, 0, -30, 0],
                      rotate: 360
                    }}
                    transition={{
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <FaSatellite className={`text-${['blue', 'yellow', 'red', 'white'][i-1]}-400`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Astronauts View */}
          {activeView === 'astronauts' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-950 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-full">
                <motion.div
                  className="absolute top-1/4 left-1/4 text-4xl md:text-6xl"
                  animate={{
                    y: [0, -20, 0, 20, 0],
                    rotate: [0, 15, 0, -15, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaUserAstronaut className="text-white" />
                </motion.div>
                <motion.div
                  className="absolute top-1/2 right-1/4 text-5xl md:text-7xl"
                  animate={{
                    y: [0, 30, 0, -30, 0],
                    rotate: [0, -15, 0, 15, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaUserAstronaut className="text-blue-300" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Content Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {views.find(v => v.id === activeView)?.title}
          </h2>
          <p className="text-gray-300 mb-6">
            {views.find(v => v.id === activeView)?.description}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-lg font-semibold"
          >
            Explore More
          </motion.button>
        </motion.section>

        {/* Facts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              title: "Earth's Diameter",
              value: "12,742 km",
              icon: "🌍"
            },
            {
              title: "ISS Speed",
              value: "27,600 km/h",
              icon: "🚀"
            },
            {
              title: "Moon Distance",
              value: "384,400 km",
              icon: "🌕"
            }
          ].map((fact, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl"
            >
              <div className="text-4xl mb-4">{fact.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{fact.title}</h3>
              <p className="text-2xl text-blue-400">{fact.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="bg-black/50 py-8 text-center"
      >
        <p className="text-gray-400">
          Explore the wonders of space and our planet Earth
        </p>
        <p className="text-gray-500 mt-2 text-sm">
          Data from NASA and other space agencies
        </p>
      </motion.footer>
    </div>
  );
};

export default SpaceEarth;