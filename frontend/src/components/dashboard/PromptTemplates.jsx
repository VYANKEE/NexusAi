import React from 'react';
import { useNavigate } from 'react-router-dom';
import { promptTemplates } from '../../data/templates.js';
import { createSession } from '../../api/session.js';

const PromptTemplates = ({ onSessionCreated }) => {
  const navigate = useNavigate();

  const handleTemplateClick = async (template) => {
    const filledPrompt = window.prompt(`Enter details for: "${template.title}"`, template.prompt);
    
    if (filledPrompt) {
      try {
        const response = await createSession({ 
          title: template.title, 
          initialPrompt: filledPrompt 
        });
        const newSession = response.data;
        if (newSession._id) {
          onSessionCreated(); // This tells the layout to refresh the session list
          // FIX: The path now includes '/app'
          navigate(`/app/session/${newSession._id}`);
        }
      } catch (error) {
        console.error('Failed to create session from template:', error);
      }
    }
  };

  return (
    <div className="mt-8">
      {promptTemplates.map((group) => (
        <div key={group.category} className="mb-6">
          <h2 className="text-lg font-semibold text-gray-300 mb-3">{group.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className="bg-white/5 p-4 rounded-lg cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
              >
                <h3 className="font-bold text-gray-100">{template.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{template.prompt}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptTemplates;