import React from 'react';
import { X, Star, Calendar, Globe } from 'lucide-react';

export default function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  const image = movie.image?.original || movie.image?.medium || movie.customImage || 'https://via.placeholder.com/210x295?text=No+Image';
  const summary = movie.summary ? movie.summary.replace(/<[^>]+>/g, '') : movie.customSummary || 'No description available.';

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ backgroundColor: '#1e293b', borderRadius: '1rem', maxWidth: '600px', width: '100%', padding: '1.5rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', color: '#94a3b8' }}>
          <X size={24} />
        </button>

        <div style={{ display: 'flex', gap: '1.5rem', flexDirection: 'row', flexWrap: 'wrap' }}>
          <img src={image} alt={movie.name} style={{ width: '180px', borderRadius: '0.5rem', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{movie.name}</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={16} color="#facc15" /> {movie.rating?.average || movie.customRating || 'N/A'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={16} /> {movie.premiered || 'N/A'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Globe size={16} /> {movie.language || 'English'}</span>
            </div>
            <p style={{ lineHeight: '1.5', color: '#cbd5e1' }}>{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}