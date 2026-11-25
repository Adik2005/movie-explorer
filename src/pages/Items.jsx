import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import AddMovieModal from '../components/AddMovieModal';
import { fetchMoviesThunk, addMovieThunk } from '../store/slices/moviesSlice';
import {
  setSearch,
  setGenre,
  setSortBy,
  setPage,
  syncFiltersFromUrl,
} from '../store/slices/filtersSlice';
import {
  selectMoviesLoading,
  selectMoviesError,
  selectFilters,
  selectAllGenres,
  selectPaginatedMovies,
} from '../store/selectors';
import { useDebounce } from '../hooks/useDebounce';
import { Plus, Search, RotateCcw } from 'lucide-react';

export default function Items() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const loading = useSelector(selectMoviesLoading);
  const error = useSelector(selectMoviesError);
  const { search, genre, sortBy, page } = useSelector(selectFilters);
  const allGenres = useSelector(selectAllGenres);
  const { paginatedMovies, totalPages, currentPage } = useSelector(selectPaginatedMovies);

  // Локальный UI state только для модалки и поля ввода до дебаунса
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(localSearch, 300);

  // Инициализация фильтров из URL при загрузке
  useEffect(() => {
    dispatch(
      syncFiltersFromUrl({
        search: searchParams.get('search') || '',
        genre: searchParams.get('genre') || 'All',
        sortBy: searchParams.get('sort') || 'default',
        page: parseInt(searchParams.get('page') || '1', 10),
      })
    );
    dispatch(fetchMoviesThunk());
  }, [dispatch]);

  // Синхронизация дебаунс-поиска с Redux и URL
  useEffect(() => {
    if (debouncedSearch !== search) {
      dispatch(setSearch(debouncedSearch));
      updateUrlParams({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch]);

  const updateUrlParams = (overrides = {}) => {
    const next = {
      search,
      genre,
      sort: sortBy,
      page,
      ...overrides,
    };
    const newParams = new URLSearchParams();
    if (next.search) newParams.set('search', next.search);
    if (next.genre && next.genre !== 'All') newParams.set('genre', next.genre);
    if (next.sort && next.sort !== 'default') newParams.set('sort', next.sort);
    if (next.page && next.page > 1) newParams.set('page', String(next.page));
    setSearchParams(newParams);
  };

  const handleGenreChange = (value) => {
    dispatch(setGenre(value));
    updateUrlParams({ genre: value, page: 1 });
  };

  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
    updateUrlParams({ sort: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    updateUrlParams({ page: newPage });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{ padding: '0.5rem 0.75rem 0.5rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #475569', backgroundColor: '#1e293b', color: 'white' }}
            />
          </div>

          <select value={genre} onChange={(e) => handleGenreChange(e.target.value)} style={{ backgroundColor: '#1e293b', color: 'white', border: '1px solid #475569', padding: '0.5rem', borderRadius: '0.375rem' }}>
            {allGenres.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>

          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} style={{ backgroundColor: '#1e293b', color: 'white', border: '1px solid #475569', padding: '0.5rem', borderRadius: '0.375rem' }}>
            <option value="default">Default</option>
            <option value="rating">Top Rated</option>
            <option value="name">Title (A-Z)</option>
          </select>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
          <Plus size={18} /> Add Movie
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '4rem 0', color: '#38bdf8' }}>Loading movies...</div>}

      {error && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#f87171' }}>
          <p>Error: {error}</p>
          <button
            onClick={() => dispatch(fetchMoviesThunk())}
            style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
          >
            <RotateCcw size={16} /> Retry
          </button>
        </div>
      )}

      {!loading && !error && paginatedMovies.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>No items found.</div>
      )}

      {!loading && !error && paginatedMovies.length > 0 && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {paginatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onSelectMovie={() => navigate(`/items/${movie.id}`)} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}

      {isAddModalOpen && (
        <AddMovieModal
          onClose={() => setIsAddModalOpen(false)}
          onAddMovie={(newM) => dispatch(addMovieThunk(newM))}
        />
      )}
    </div>
  );
}