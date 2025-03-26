import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiClock, FiDollarSign, FiStar, FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';

const ServiceDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Mock data - replace with actual API call
  const mockServices = [
    {
      id: 'web-development',
      title: "Web Development",
      tagline: "Build your digital presence with cutting-edge web solutions",
      description: "Our web development services create responsive, high-performance websites tailored to your business needs. We use modern technologies to deliver seamless user experiences across all devices.",
      category: "development",
      rating: 4.8,
      duration: "2-4 weeks",
      price: "$1,500+",
      features: [
        "Custom responsive design",
        "SEO-optimized structure",
        "CMS integration (WordPress, Contentful)",
        "E-commerce functionality",
        "Performance optimization"
      ],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      process: [
        { step: 1, title: "Discovery", description: "We analyze your requirements and business goals" },
        { step: 2, title: "Design", description: "Our designers create wireframes and prototypes" },
        { step: 3, title: "Development", description: "Our engineers build your solution" },
        { step: 4, title: "Testing", description: "Rigorous quality assurance process" },
        { step: 5, title: "Launch", description: "We deploy and monitor your solution" }
      ],
      faqs: [
        { question: "What technologies do you use?", answer: "We use React, Next.js, Node.js, and modern CSS frameworks like Tailwind for most projects." },
        { question: "Do you provide maintenance?", answer: "Yes, we offer ongoing maintenance and support packages." },
        { question: "Can you migrate my existing site?", answer: "Absolutely! We specialize in platform migrations." }
      ],
      testimonials: [
        { name: "Sarah Johnson", role: "Marketing Director", quote: "Our new website increased conversions by 40%!" },
        { name: "Michael Chen", role: "Startup Founder", quote: "Incredible attention to detail and fast delivery." }
      ]
    },
    // Add more services as needed
  ];

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const foundService = mockServices.find(s => s.id === id);
        if (foundService) {
          setService(foundService);
        } else {
          setError("Service not found");
        }
        setLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [id]);

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
          <h2 className="text-xl font-semibold">Loading Service Details...</h2>
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
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Service</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => router.push('/services')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Services
          </button>
        </div>
      </motion.div>
    );
  }

  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 text-white p-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm mb-2">
                {service.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{service.title}</h1>
              <p className="text-xl md:text-2xl max-w-2xl">{service.tagline}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg sticky top-8 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Service Details</h3>
                <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  <FiStar className="mr-1" />
                  <span>{service.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FiClock className="text-gray-500 mr-2" />
                  <span className="text-gray-700"><strong>Duration:</strong> {service.duration}</span>
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="text-gray-500 mr-2" />
                  <span className="text-gray-700"><strong>Starting at:</strong> {service.price}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
              >
                Get This Service <FiArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex overflow-x-auto mb-8 border-b border-gray-200"
            >
              {['overview', 'process', 'faqs', 'testimonials'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize transition ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Overview</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">What's Included</h3>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheck className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-2">Benefits</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FiCheck className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">Increased online visibility</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheck className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">Improved user experience</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheck className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">Higher conversion rates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Process</h2>
                  <div className="space-y-6">
                    {service.process.map((step) => (
                      <motion.div
                        key={step.step}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
                        >
                          <h3 className="font-medium text-gray-800">{faq.question}</h3>
                          <motion.div
                            animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                          >
                            <FiChevronDown />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-4 overflow-hidden"
                            >
                              <div className="pb-4 text-gray-600">{faq.answer}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Testimonials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 p-6 rounded-lg"
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;