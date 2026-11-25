import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Film, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#38bdf8' : '#94a3b8',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '0.5rem 0.75rem',
    display: 'flex',
    alignItems: 'center'
  });

  const closeMenu = () => setMenuOpen(false);

  return (
    <header style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <NavLink to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white' }}>
          <Film size={24} color="#38bdf8" />
          <span style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>Movie Explorer</span>
          <span
            title={isOnline ? 'Online' : 'Offline'}
            style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: isOnline ? '#4ade80' : '#f87171', marginLeft: '4px' }}
          />
        </NavLink>

        {/* Кнопка мобильного меню */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          style={{ background: 'none', border: '1px solid #334155', borderRadius: '0.375rem', color: 'white', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Выпадающая навигация (работает на любых экранах от 320px) */}
      <nav
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          padding: '0.5rem 1rem 1rem',
          backgroundColor: '#1e293b',
          borderTop: '1px solid #334155',
          gap: '0.25rem'
        }}
      >
        <NavLink to="/" onClick={closeMenu} style={linkStyle}>Home</NavLink>
        <NavLink to="/items" onClick={closeMenu} style={linkStyle}>Movies</NavLink>
        <NavLink to="/dashboard" onClick={closeMenu} style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/about" onClick={closeMenu} style={linkStyle}>About</NavLink>
        <NavLink to="/offline" onClick={closeMenu} style={linkStyle}>Offline Status</NavLink>

        {currentUser ? (
          <NavLink to="/profile" onClick={closeMenu} style={linkStyle}>Profile</NavLink>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMenu} style={linkStyle}>Login</NavLink>
            <NavLink to="/signup" onClick={closeMenu} style={linkStyle}>Sign Up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}