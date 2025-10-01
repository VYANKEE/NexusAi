import React, { useState } from 'react';
import { generateImage } from '../api/image.js';
import { FiDownload } from 'react-icons/fi';

const ImageGeneratorPage = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await generateImage(prompt);
      // We need to construct the full URL since the backend returns a relative path
      const fullImageUrl = `http://localhost:5001${response.data.url}`;
      setImageUrl(fullImageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold text-white mb-2">AI Image Generator</h1>
      <p className="text-gray-400 mb-8">Describe any image you can imagine, and let the AI bring it to life.</p>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic cityscape at sunset, cinematic lighting"
            className="flex-grow px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 font-bold bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <div className="w-full aspect-square bg-gray-800/50 rounded-lg border border-dashed border-gray-600 flex items-center justify-center">
        {loading ? (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-300">Generating your vision... please wait.</p>
          </div>
        ) : imageUrl ? (
          <div className="relative group w-full h-full">
            <img src={imageUrl} alt={prompt} className="w-full h-full object-contain rounded-lg" />
            <a 
              href={imageUrl} 
              download={`ai-image-${Date.now()}.png`}
              className="absolute bottom-4 right-4 p-3 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              title="Download Image"
            >
              <FiDownload size={20} />
            </a>
          </div>
        ) : (
          <p className="text-gray-500">Your generated image will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGeneratorPage;