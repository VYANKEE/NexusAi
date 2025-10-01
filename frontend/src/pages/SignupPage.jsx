import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.js';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" placeholder="Name" required onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button type="submit" className="w-full py-2 bg-indigo-600 rounded-md font-bold hover:bg-indigo-700">Sign Up</button>
        </form>
        <p className="text-center">Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;