import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', backgroundColor: '#1e293b', borderRadius: '1rem', border: '1px solid #334155' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#38bdf8' }}>User Profile</h2>
      <div style={{ marginBottom: '1rem', color: '#cbd5e1' }}>
        <strong>Email:</strong> {currentUser?.email || 'N/A'}
      </div>
      <div style={{ marginBottom: '2rem', color: '#cbd5e1', wordBreak: 'break-all' }}>
        <strong>User UID:</strong> {currentUser?.uid || 'N/A'}
      </div>
      <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold' }}>
        Log Out
      </button>
    </div>
  );
}