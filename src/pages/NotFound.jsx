import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#f87171' }}>404</h1>
      <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem' }}>Page Not Found</p>
      <Link to="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0284c7', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </div>
  );
}