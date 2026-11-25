import { createSelector } from '@reduxjs/toolkit';

export const PAGE_SIZE = 8;

// Базовые селекторы
export const selectAllMovies = (state) => state.movies.items;
export const selectMoviesLoading = (state) => state.movies.loading;
export const selectMoviesError = (state) => state.movies.error;
export const selectFilters = (state) => state.filters;
export const selectWatchlistIds = (state) => state.watchlist.ids;

// 1. Мемоизированный селектор: уникальные жанры
export const selectAllGenres = createSelector([selectAllMovies], (movies) => {
  const set = new Set();
  movies.forEach((m) => m.genres?.forEach((g) => set.add(g)));
  return ['All', ...Array.from(set)];
});

// 2. Мемоизированный селектор: фильтрация и сортировка списка
export const selectFilteredAndSortedMovies = createSelector(
  [selectAllMovies, selectFilters],
  (movies, { search, genre, sortBy }) => {
    const filtered = movies.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === 'All' || (m.genres && m.genres.includes(genre));
      return matchSearch && matchGenre;
    });

    const sorted = [...filtered];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }
);

// 3. Мемоизированный селектор: пагинация
export const selectPaginatedMovies = createSelector(
  [selectFilteredAndSortedMovies, selectFilters],
  (sortedMovies, { page }) => {
    const totalPages = Math.ceil(sortedMovies.length / PAGE_SIZE) || 1;
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return {
      paginatedMovies: sortedMovies.slice(start, start + PAGE_SIZE),
      totalPages,
      currentPage: safePage,
    };
  }
);

// 4. Мемоизированный селектор: аналитика для Dashboard
export const selectDashboardAnalytics = createSelector(
  [selectAllMovies, selectFilters],
  (movies, { dashboardStatus }) => {
    const filtered =
      dashboardStatus === 'All'
        ? movies
        : movies.filter((m) => m.status === dashboardStatus);

    const totalCount = filtered.length;
    const avgRating = (
      filtered.reduce((acc, m) => acc + (m.rating?.average || 0), 0) / (totalCount || 1)
    ).toFixed(1);
    const englishCount = filtered.filter((m) => m.language === 'English').length;
    const topShow =
      [...filtered].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))[0]?.name ||
      'N/A';

    const counts = {};
    filtered.forEach((m) => m.genres?.forEach((g) => (counts[g] = (counts[g] || 0) + 1)));
    const genreBreakdown = Object.entries(counts).slice(0, 5);

    return {
      totalCount,
      avgRating,
      englishCount,
      topShow,
      genreBreakdown,
    };
  }
);