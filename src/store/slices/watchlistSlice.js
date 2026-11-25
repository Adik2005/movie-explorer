import { createSlice } from '@reduxjs/toolkit';

const loadSavedWatchlist = () => {
  try {
    const saved = localStorage.getItem('movie_explorer_watchlist');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    ids: loadSavedWatchlist(),
  },
  reducers: {
    toggleWatchlist: (state, action) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((item) => item !== id);
      } else {
        state.ids.push(id);
      }
      localStorage.setItem('movie_explorer_watchlist', JSON.stringify(state.ids));
    },
  },
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;