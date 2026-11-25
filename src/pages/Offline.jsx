import React from 'react';
import { Link } from 'react-router-dom';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function Offline() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', maxWidth: '500px', margin: '0 auto' }}>
      <WifiOff size={64} color="#f87171" style={{ margin: '0 auto 1.5rem' }} />
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#f8fafc' }}>You are Offline</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
        No internet connection detected. You can still browse previously visited pages and cached movies, or retry connecting.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => window.location.reload()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', minHeight: '44px' }}
        >
          <RefreshCw size={18} /> Retry Connection
        </button>
        <Link
          to="/items"
          style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', minHeight: '44px' }}
        >
          View Cached Movies
        </Link>
      </div>
    </div>
  );
}