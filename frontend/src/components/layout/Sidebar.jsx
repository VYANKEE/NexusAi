import React from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { createSession, updateSessionTitle, deleteSession } from '../../api/session.js';
import { FiEdit, FiTrash2, FiMessageSquare, FiImage, FiFilm, FiLogOut, FiPlus } from 'react-icons/fi';

const Sidebar = ({ sessions, onSessionUpdate, loading }) => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const handleNewSessionClick = async () => {
    try {
      const response = await createSession({ title: 'New Writing Session' });
      if (response.data._id) {
        await onSessionUpdate();
        navigate(`/app/session/${response.data._id}`);
      }
    } catch (error) {
      console.error('Failed to create a new session:', error);
    }
  };

  const handleRenameSession = async (e, id, currentTitle) => {
    e.preventDefault();
    e.stopPropagation();
    const newTitle = window.prompt("Enter new session title:", currentTitle);
    if (newTitle && newTitle.trim() && newTitle !== currentTitle) {
      await updateSessionTitle(id, newTitle);
      onSessionUpdate();
    }
  };

  const handleDeleteSession = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this session?")) {
      await deleteSession(id);
      await onSessionUpdate();
      if (sessionId === id) {
        navigate('/app/dashboard');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md transition-colors text-gray-300 ${isActive ? 'bg-accent/20 text-accent-foreground' : 'hover:bg-gray-700'}`;

  return (
    <aside className="w-72 flex-shrink-0 bg-gray-800 p-4 flex flex-col justify-between border-r border-gray-700">
      <div>
        <button 
          onClick={handleNewSessionClick}
          className="w-full px-4 py-2 mb-6 font-bold text-white bg-accent rounded-md hover:bg-accent/90 flex items-center justify-center gap-2"
        >
          <FiPlus /> New Session
        </button>
        
        {/* Main Navigation */}
        <nav className="space-y-2 mb-6">
           <NavLink to="/app/dashboard" className={navLinkClass} end>
              <FiMessageSquare />
              <span>Writing Assistant</span>
           </NavLink>
           <NavLink to="/app/image-generator" className={navLinkClass}>
              <FiImage />
              <span>Image Generator</span>
           </NavLink>
           <NavLink to="/app/video-generator" className={navLinkClass}>
              <FiFilm />
              <span>Video Generator</span>
           </NavLink>
        </nav>

        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Recent Writing Sessions
          </h2>
          <div className="mt-4 space-y-1 overflow-y-auto max-h-[calc(100vh-350px)]">
            {loading ? <p className="text-sm text-gray-500">Loading...</p> : 
             sessions.length === 0 ? <p className="text-sm text-gray-500">No sessions yet.</p> :
             (
              sessions.map((session) => (
                <NavLink to={`/app/session/${session._id}`} key={session._id} className={({isActive}) => `block group ${isActive ? 'bg-accent/10 rounded-md' : ''}`}>
                  <div className="flex items-center justify-between p-2 text-sm rounded-md hover:bg-gray-700">
                    <span className="flex-grow truncate text-gray-200">{session.title}</span>
                    <div className="flex-shrink-0 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiEdit onClick={(e) => handleRenameSession(e, session._id, session.title)} className="cursor-pointer text-gray-400 hover:text-white" />
                      <FiTrash2 onClick={(e) => handleDeleteSession(e, session._id)} className="cursor-pointer text-gray-400 hover:text-red-500" />
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        </div>
      </div>
      <button 
        onClick={handleLogout}
        className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 flex items-center justify-center"
      >
        <FiLogOut className="mr-2"/> Logout
      </button>
    </aside>
  );
};

export default Sidebar;