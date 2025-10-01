import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full p-4 bg-transparent text-white z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <FiZap className="text-indigo-400" />
          <span>NexusAI</span>
        </Link>
        <nav className="space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-md hover:bg-white/10 transition">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition">Get Started</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;