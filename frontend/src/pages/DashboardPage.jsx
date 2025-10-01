import React from 'react';
import PromptTemplates from '../components/dashboard/PromptTemplates.jsx';
import { useOutletContext } from 'react-router-dom';

const DashboardPage = () => {
  const { onSessionCreated } = useOutletContext();
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Your AI Writing Partner</h1>
      <p className="mt-2 text-lg text-gray-400">Start a new session or select a template to begin.</p>
      <PromptTemplates onSessionCreated={onSessionCreated} />
    </div>
  );
};

export default DashboardPage;