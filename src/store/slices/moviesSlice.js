import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieById } from '../../services/api';
import { invalidateCache } from '../../services/cacheService';

// 1. Thunk загрузки списка фильмов (с защитой от повторных лишних запросов)
export const fetchMoviesThunk = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchMovies();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load movies');
    }
  },
  {
    condition: (_, { getState }) => {
      const { movies } = getState();
      if (movies.loading || movies.items.length > 0) {
        return false; // предотвращаем дублирующий API-запрос
      }
      return true;
    },
  }
);

// 2. Thunk загрузки деталей фильма (с обработкой устаревших запросов через requestId)
export const fetchMovieDetailsThunk = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (id, { getState, rejectWithValue }) => {
    const { movies } = getState();
    const localMovie = movies.items.find((m) => String(m.id) === String(id));
    if (localMovie && localMovie.isCustom) {
      return localMovie; // пользовательский фильм берем напрямую без сетевого запроса
    }
    try {
      const data = await fetchMovieById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Movie not found');
    }
  }
);

// 3. Thunk мутации (добавление фильма + обновление состояния/кэша)
export const addMovieThunk = createAsyncThunk(
  'movies/addMovie',
  async (newMovieData, { rejectWithValue }) => {
    try {
      const createdMovie = {
        ...newMovieData,
        id: newMovieData.id || Date.now(),
        isCustom: true,
      };
      invalidateCache('all_movies'); // сбрасываем устаревший кэш после мутации
      return createdMovie;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to add movie');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedMovie: null,
    detailLoading: false,
    detailError: null,
    currentDetailRequestId: null,
    mutationLoading: false,
  },
  reducers: {
    deleteMovie: (state, action) => {
      state.items = state.items.filter((m) => String(m.id) !== String(action.payload));
      invalidateCache('all_movies');
    },
    clearMovieError: (state) => {
      state.error = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Список фильмов
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        const customItems = state.items.filter((m) => m.isCustom);
        state.items = [...customItems, ...action.payload];
      })
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Детали фильма (отбрасываем устаревшие запросы по requestId)
      .addCase(fetchMovieDetailsThunk.pending, (state, action) => {
        state.detailLoading = true;
        state.detailError = null;
        state.currentDetailRequestId = action.meta.requestId;
      })
      .addCase(fetchMovieDetailsThunk.fulfilled, (state, action) => {
        if (state.currentDetailRequestId === action.meta.requestId) {
          state.detailLoading = false;
          state.selectedMovie = action.payload;
          state.currentDetailRequestId = null;
        }
      })
      .addCase(fetchMovieDetailsThunk.rejected, (state, action) => {
        if (state.currentDetailRequestId === action.meta.requestId) {
          state.detailLoading = false;
          state.detailError = action.payload;
          state.currentDetailRequestId = null;
        }
      })

      // Мутация добавления фильма
      .addCase(addMovieThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(addMovieThunk.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addMovieThunk.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteMovie, clearMovieError } = moviesSlice.actions;
export default moviesSlice.reducer;