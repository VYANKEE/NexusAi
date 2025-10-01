import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl mx-auto z-50
                 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-accent-foreground">
          <FiZap className="text-accent" />
          <span>NexusWrite</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-gray-300 hover:text-accent transition-colors">Features</Link>
          <Link to="/pricing" className="text-gray-300 hover:text-accent transition-colors">Pricing</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-accent transition-colors">Dashboard</Link>
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/signup" className="px-5 py-2 bg-accent rounded-full text-accent-foreground font-semibold
                                     shadow-lg shadow-accent/30 hover:shadow-neon-glow transition-all duration-300">
            Get Started
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;