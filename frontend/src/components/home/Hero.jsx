import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <div className="relative text-center h-screen flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-indigo-900/80 z-0"></div>
      
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 h-48 md:h-64">
          <TypeAnimation
            sequence={[
              'Unleash Your Creativity with AI',
              2000,
              'Generate Brilliant Content Instantly',
              2000,
              'Create Videos from Simple Text',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
          From first drafts to final edits, our AI-powered writing assistant helps you generate brilliant content, brainstorm ideas, and even create videos from text.
        </p>
        <Link to="/signup" className="px-8 py-4 bg-indigo-600 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
          Start Writing for Free
        </Link>
      </div>
    </div>
  );
};

export default Hero;