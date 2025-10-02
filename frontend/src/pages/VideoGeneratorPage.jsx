import React from 'react';
import { FiFilm } from 'react-icons/fi';

const VideoGeneratorPage = () => {
  return (
    <div className="p-4 md:p-8 text-white">
      <h1 className="text-4xl font-bold mb-2">AI Video Generator</h1>
      <p className="text-gray-400 mb-8">This powerful feature is currently under development and will be available soon.</p>
      
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            placeholder="Text-to-video generation is coming soon..."
            rows={3}
            className="flex-grow px-4 py-3 bg-gray-800 text-gray-500 rounded-lg border border-gray-700 outline-none resize-none cursor-not-allowed"
            disabled
          />
          <button 
            disabled
            className="px-6 py-3 font-bold bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
          >
            Generate Video
          </button>
        </div>
      </div>
      
      <div className="w-full aspect-video bg-gray-800/50 rounded-lg border border-dashed border-gray-600 flex flex-col items-center justify-center text-center p-8">
         <FiFilm size={48} className="text-gray-600 mb-4" />
         <h2 className="text-2xl font-bold text-gray-400">Coming Soon</h2>
         <p className="text-gray-500 mt-2 max-w-md">Our text-to-video engine is being upgraded. This feature will be available in a future update. Stay tuned!</p>
      </div>
    </div>
  );
};

export default VideoGeneratorPage;