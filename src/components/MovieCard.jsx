import React from 'react';
import { Star } from 'lucide-react';

export default function MovieCard({ movie, onSelectMovie }) {
  const image = movie.image?.medium || movie.customImage || 'https://via.placeholder.com/210x295?text=No+Image';
  const rating = movie.rating?.average || movie.customRating || 'N/A';
  const genreList = movie.genres?.length ? movie.genres.join(', ') : movie.customGenre || 'General';

  return (
    <div 
      onClick={() => onSelectMovie(movie)}
      style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', overflow: 'hidden', cursor: 'pointer', border: '1px solid #334155', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column' }}
    >
      <img src={image} alt={movie.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{movie.name}</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{genreList}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#facc15' }}>
          <Star size={16} fill="#facc15" />
          <span style={{ fontWeight: 'bold' }}>{rating}</span>
        </div>
      </div>
    </div>
  );
}