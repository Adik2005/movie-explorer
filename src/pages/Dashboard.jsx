import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesThunk } from '../store/slices/moviesSlice';
import { setDashboardStatus } from '../store/slices/filtersSlice';
import { selectDashboardAnalytics, selectFilters, selectWatchlistIds } from '../store/selectors';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { dashboardStatus } = useSelector(selectFilters);
  const watchlistIds = useSelector(selectWatchlistIds);
  const { totalCount, avgRating, englishCount, topShow, genreBreakdown } = useSelector(
    selectDashboardAnalytics
  );

  useEffect(() => {
    dispatch(fetchMoviesThunk());
  }, [dispatch]);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#38bdf8' }}>Analytics Dashboard</h1>
        <div>
          <label style={{ marginRight: '0.5rem', color: '#94a3b8' }}>Filter by Status: </label>
          <select
            value={dashboardStatus}
            onChange={(e) => dispatch(setDashboardStatus(e.target.value))}
            style={{ backgroundColor: '#1e293b', color: 'white', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569' }}
          >
            <option value="All">All Statuses</option>
            <option value="Ended">Ended</option>
            <option value="Running">Running</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Shows</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#38bdf8' }}>{totalCount}</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Avg Rating</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#facc15' }}>⭐ {avgRating}</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>English Language</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4ade80' }}>{englishCount}</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Top Rated Show</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f43f5e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topShow}</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>My Watchlist</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#c084fc' }}>{watchlistIds.length}</div>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
        <h3 style={{ marginBottom: '1rem' }}>Top Genres Breakdown</h3>
        {genreBreakdown.map(([genre, count]) => (
          <div key={genre} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
            <span>{genre}</span>
            <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>{count} shows</span>
          </div>
        ))}
      </div>
    </div>
  );
}