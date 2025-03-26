import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const socialLinks = [
    { icon: <FaFacebookF size={18} />, name: "Facebook", url: "#" },
    { icon: <FaTwitter size={18} />, name: "Twitter", url: "#" },
    { icon: <FaInstagram size={18} />, name: "Instagram", url: "#" },
    { icon: <FaLinkedinIn size={18} />, name: "LinkedIn", url: "#" },
  ];

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/blog", label: "Blog" },
  ];

  const companyLinks = [
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms of Service" },
    { path: "/careers", label: "Careers" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <motion.footer 
      className="bg-gray-900 text-gray-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              YourBrand
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Building modern web experiences with responsive design and cutting-edge technology.
          </p>
          <div className="mt-6 flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {social.icon}
                <AnimatePresence>
                  {isHovered === index && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -mt-12 text-xs bg-gray-800 px-2 py-1 rounded whitespace-nowrap"
                    >
                      {social.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="flex items-center text-sm hover:text-white transition-colors"
                >
                  <motion.span
                    className="w-1 h-1 bg-blue-500 rounded-full mr-2"
                    whileHover={{ scale: 1.5 }}
                  />
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Company Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-2">
            {companyLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="flex items-center text-sm hover:text-white transition-colors"
                >
                  <motion.span
                    className="w-1 h-1 bg-purple-500 rounded-full mr-2"
                    whileHover={{ scale: 1.5 }}
                  />
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white">Newsletter</h2>
          <p className="mt-4 text-sm">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          
          <AnimatePresence>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm"
              >
                Thank you for subscribing!
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col gap-2"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  whileFocusWithin={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <FiSend className="absolute right-3 top-3 text-gray-400" />
                </motion.div>
                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-gray-800 py-6 text-center text-sm"
      >
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
          <div className="mt-2 flex justify-center space-x-4 text-xs">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;