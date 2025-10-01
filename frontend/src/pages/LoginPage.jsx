import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../api/auth.js';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      navigate('/app/dashboard'); // Navigate to the correct path
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div 
        className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to access your dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form content is the same */}
          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input type="email" name="email" onChange={handleChange} required className="w-full mt-1 px-4 py-2 bg-white/5 rounded-md border border-white/10 focus:ring-2 focus:ring-accent focus:border-accent outline-none"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input type="password" name="password" onChange={handleChange} required className="w-full mt-1 px-4 py-2 bg-white/5 rounded-md border border-white/10 focus:ring-2 focus:ring-accent focus:border-accent outline-none"/>
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <motion.button type="submit" className="w-full py-3 font-semibold bg-accent text-accent-foreground rounded-md shadow-lg shadow-accent/20 hover:shadow-neon-glow transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Sign In
          </motion.button>
        </form>
        <p className="text-sm text-center text-gray-400">
          New to NexusWrite?{' '}
          <Link to="/signup" className="font-medium text-accent hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;