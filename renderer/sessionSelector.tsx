import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

interface Session {
  id: string;
  username: string;
}

interface SessionSelectorProps {
  sessions: Session[];
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
}

const SessionSelector: React.FC<SessionSelectorProps> = ({ sessions, onSessionSelect, onNewSession }) => {
  const [selectedSession, setSelectedSession] = useState<string>('');

  useEffect(() => {
    if (sessions.length > 0) {
      setSelectedSession(sessions[0].id);
    }
  }, [sessions]);

  const handleSelect = () => {
    onSessionSelect(selectedSession);
  };

  return (
    <div>
      <h2>Select a session</h2>
      <select
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
      >
        {sessions.map((session) => (
          <option key={session.id} value={session.id}>
            {session.username}
          </option>
        ))}
      </select>
      <button onClick={handleSelect}>Select</button>
      <button onClick={onNewSession}>Add New</button>
    </div>
  );
};

export default SessionSelector;
