import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetailsThunk, deleteMovie } from '../store/slices/moviesSlice';
import { toggleWatchlist } from '../store/slices/watchlistSlice';
import { selectWatchlistIds } from '../store/selectors';
import { Star, Calendar, Globe, Clock, Tv, ArrowLeft, Heart, Trash2 } from 'lucide-react';

export default function ItemDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedMovie: movie, detailLoading: loading, detailError: error } = useSelector(
    (state) => state.movies
  );
  const watchlistIds = useSelector(selectWatchlistIds);
  const isInWatchlist = movie && watchlistIds.includes(movie.id);

  useEffect(() => {
    dispatch(fetchMovieDetailsThunk(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteMovie(movie.id));
    navigate('/items');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem 0', color: '#38bdf8' }}>Loading details...</div>;
  if (error || !movie) return (
    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#f87171' }}>
      <h2>Error: Movie not found</h2>
      <Link to="/items" style={{ color: '#38bdf8', marginTop: '1rem', display: 'inline-block' }}>Back to All Items</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link to="/items" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> Back to All Items
        </Link>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => dispatch(toggleWatchlist(movie.id))}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: isInWatchlist ? '#be123c' : '#1e293b', color: 'white', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <Heart size={16} fill={isInWatchlist ? 'white' : 'none'} />
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>

          {movie.isCustom && (
            <button
              onClick={handleDelete}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#991b1b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: '#1e293b', borderRadius: '1rem', padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', border: '1px solid #334155' }}>
        <img src={movie.image?.original || movie.image?.medium} alt={movie.name} style={{ width: '280px', borderRadius: '0.75rem', objectFit: 'cover' }} />
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{movie.name}</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', margin: '1.5rem 0', color: '#94a3b8', fontSize: '0.9rem' }}>
            <div><strong style={{ color: '#facc15' }}><Star size={16}/> Rating:</strong> {movie.rating?.average || 'N/A'}</div>
            <div><strong><Calendar size={16}/> Premiered:</strong> {movie.premiered || 'N/A'}</div>
            <div><strong><Globe size={16}/> Language:</strong> {movie.language || 'N/A'}</div>
            <div><strong><Clock size={16}/> Runtime:</strong> {movie.runtime ? `${movie.runtime} mins` : 'N/A'}</div>
            <div><strong><Tv size={16}/> Network:</strong> {movie.network?.name || 'N/A'}</div>
            <div><strong>Status:</strong> {movie.status || 'N/A'}</div>
            <div><strong>Genres:</strong> {movie.genres?.join(', ') || 'N/A'}</div>
          </div>

          <p style={{ lineHeight: '1.6', color: '#cbd5e1' }} dangerouslySetInnerHTML={{ __html: movie.summary }} />
        </div>
      </div>
    </div>
  );
}