import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    genre: 'All',
    sortBy: 'default',
    page: 1,
    dashboardStatus: 'All',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setDashboardStatus: (state, action) => {
      state.dashboardStatus = action.payload;
    },
    syncFiltersFromUrl: (state, action) => {
      const { search = '', genre = 'All', sortBy = 'default', page = 1 } = action.payload;
      state.search = search;
      state.genre = genre;
      state.sortBy = sortBy;
      state.page = page;
    },
  },
});

export const {
  setSearch,
  setGenre,
  setSortBy,
  setPage,
  setDashboardStatus,
  syncFiltersFromUrl,
} = filtersSlice.actions;

export default filtersSlice.reducer;