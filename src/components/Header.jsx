import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/todo", label: "Todo" },
    { path: "/space-earth", label: "SpaceEarth" },
    { path: "/counter", label: "Counter" },
    { path: "/space-shooter", label: "SpaceShooter" },
    { path: "/snack", label: "Snack" },
    { path: "/flappy-bird", label: "FlappyBird" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/local", label: "Storage" },
  ];

  // Animation variants
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
   <div className="">
     <motion.header 
      className="sticky top-0 z-50 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Logo
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <motion.li 
                key={link.path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className="relative py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>

        {/* Login Button */}
        <motion.div 
          className="hidden lg:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white hover:shadow-lg transition-all"
          >
            <FiUser size={18} />
            <span>Login</span>
          </Link>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
              onClick={toggleMenu}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end p-4">
                  <motion.button
                    onClick={toggleMenu}
                    whileHover={{ rotate: 90 }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>

                <motion.ul
                  className="px-4 py-2"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {navLinks.map((link) => (
                    <motion.li 
                      key={link.path}
                      variants={itemVariants}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <Link
                        to={link.path}
                        className="block py-4 text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div 
                  className="px-4 py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white hover:shadow-lg transition-all"
                    onClick={toggleMenu}
                  >
                    <FiUser size={18} />
                    <span>Login</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
   </div>
  );
};

export default Header;