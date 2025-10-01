import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ImageGeneratorPage from './pages/ImageGeneratorPage.jsx';
import VideoGeneratorPage from './pages/VideoGeneratorPage.jsx';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* This ProtectedRoute now acts as a guard for all nested routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="session/:sessionId" element={<ChatPage />} />
          <Route path="image-generator" element={<ImageGeneratorPage />} />
          <Route path="video-generator" element={<VideoGeneratorPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;