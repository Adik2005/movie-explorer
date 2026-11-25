import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import filtersReducer from './slices/filtersSlice';
import watchlistReducer from './slices/watchlistSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filters: filtersReducer,
    watchlist: watchlistReducer,
  },
});