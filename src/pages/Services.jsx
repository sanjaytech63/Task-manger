import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiStar, FiClock, FiCheckCircle } from 'react-icons/fi';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const mockData = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies.",
      category: "development",
      rating: 4.8,
      duration: "2-4 weeks",
      price: "$1,500+",
      features: ["Responsive Design", "SEO Optimized", "CMS Integration"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications for iOS and Android.",
      category: "development",
      rating: 4.7,
      duration: "4-8 weeks",
      price: "$3,000+",
      features: ["React Native", "Offline Support", "Push Notifications"],
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that enhance user experience.",
      category: "design",
      rating: 4.9,
      duration: "1-3 weeks",
      price: "$1,200+",
      features: ["Wireframing", "Prototyping", "User Testing"],
      image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your business.",
      category: "marketing",
      rating: 4.6,
      duration: "Ongoing",
      price: "$800+/mo",
      features: ["SEO", "Social Media", "Content Marketing"],
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Simulate API call with mock data
        const response = await fetch(mockData);
        // For demo, we'll use mock data instead
     
        
        setTimeout(() => {
          setServices(mockData);
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = filter === 'all' 
    ? services 
    : services.filter(service => service.category === filter);

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">Loading Services...</h2>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center p-6 bg-red-100 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Professional solutions tailored to your business needs
          </p>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['all', 'development', 'design', 'marketing'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full capitalize ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              } shadow-sm transition`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Services' : category}
            </motion.button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                    <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      <FiStar className="mr-1" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-500">
                      <FiClock className="mr-1" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="font-bold text-gray-800">{service.price}</span>
                  </div>
                  <motion.button
                    onClick={() => openModal(service)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details <FiArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                >
                  <FiX className="text-gray-800" size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedService.title}
                  </h2>
                  <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    <FiStar className="mr-1" />
                    <span>{selectedService.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{selectedService.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <FiClock className="mr-2" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <p className="text-gray-800 font-semibold">{selectedService.duration}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      <span className="font-medium">Price</span>
                    </div>
                    <p className="text-gray-800 font-semibold">{selectedService.price}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center">
                  Get This Service <FiArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Services;