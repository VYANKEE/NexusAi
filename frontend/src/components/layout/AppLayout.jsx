import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getUserSessions } from '../../api/session.js';

const AppLayout = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserSessions();
      setSessions(response.data);
    } catch (error) {
      console.error("Failed to fetch sessions in layout:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar sessions={sessions} onSessionUpdate={fetchSessions} loading={loading} />
      <main className="flex-1 overflow-y-auto">
        {/* This context prop is the fix for the console error */}
        <Outlet context={{ onSessionCreated: fetchSessions }} />
      </main>
    </div>
  );
};

export default AppLayout;