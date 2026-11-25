import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddMovieModal({ onClose, onAddMovie }) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMovie = {
      id: Date.now(),
      name,
      genres: genre ? genre.split(',').map(g => g.trim()) : ['General'],
      customRating: rating || '8.0',
      customImage: image || 'https://via.placeholder.com/210x295?text=User+Movie',
      customSummary: summary || 'User submitted movie.'
    };

    onAddMovie(newMovie);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ backgroundColor: '#1e293b', borderRadius: '1rem', maxWidth: '450px', width: '100%', padding: '1.5rem', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', color: '#94a3b8' }}>
          <X size={24} />
        </button>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Movie</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Title *</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Genres (comma separated)</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Action, Drama" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Rating (1-10)</label>
            <input type="number" min="1" max="10" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Image URL</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Description</label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white', minHeight: '80px' }} />
          </div>

          <button type="submit" style={{ marginTop: '0.5rem', backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.375rem', fontWeight: 'bold' }}>
            Submit Movie
          </button>
        </form>
      </div>
    </div>
  );
}