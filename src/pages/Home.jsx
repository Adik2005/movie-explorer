import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '3rem 1rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#38bdf8' }}>Welcome to Movie Explorer</h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
        Discover top-rated TV shows, explore detailed information, and manage your custom movie watchlist.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80" 
        alt="Cinema" 
        style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '1rem', marginBottom: '2rem' }} 
      />
      <div>
        <Link to="/items" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0284c7', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>
          Browse Movies
        </Link>
      </div>
    </div>
  );
}