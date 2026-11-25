# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# Server Data & Caching Strategy

This project uses an in-memory caching mechanism (`src/services/cacheService.js`) with a Time-To-Live (TTL) expiration strategy set to 5 minutes.

### Caching Mechanism:
- When a user requests show data, the app checks the cache using a unique key (`all_movies` or `movie_{id}`).
- If cached data exists and its timestamp is less than 5 minutes old, the cached data is returned instantly without making a network request.
- Otherwise, a new network request is executed and the cache is updated.

### Invalidation Strategy:
- Cache entries are invalidated automatically when they expire (after 5 minutes).
- Explicit cache invalidation is triggered during mutation operations (such as creating/adding a new movie) via `invalidateCache('all_movies')`.

## Redux Toolkit Architecture

The global state and asynchronous data flows are managed with **Redux Toolkit** (`src/store/`):

### 1. Slices (`src/store/slices/`)
- **`moviesSlice`**: Manages the catalog of shows (`items`), selected item details (`selectedMovie`), loading/error states, stale-request tracking (`currentDetailRequestId`), and custom item CRUD (`deleteMovie`).
- **`filtersSlice`**: Stores active search query, genre filter, sort order, current pagination page (synchronized with URL search parameters), and dashboard status filter.
- **`watchlistSlice`**: Manages the user's personalized watchlist IDs with `localStorage` persistence.

### 2. Async Thunks (`createAsyncThunk`)
- **`fetchMoviesThunk`**: Fetches the public TVMaze catalog with a `condition` guard to prevent duplicate network requests if data is already loaded or currently fetching.
- **`fetchMovieDetailsThunk`**: Fetches detailed metadata for a single show and ignores outdated responses if the user navigates quickly between items.
- **`addMovieThunk`**: Handles creating a new custom show entry, invalidates the in-memory API cache (`invalidateCache`), and updates the Redux store immediately.

### 3. Memoized Selectors (`src/store/selectors.js`)
Built with `createSelector` from `@reduxjs/toolkit` to avoid unnecessary recomputations:
- **`selectAllGenres`**: Extracts unique genre categories from the loaded shows.
- **`selectFilteredAndSortedMovies`**: Filters shows by search term and genre, then applies the selected sorting rule.
- **`selectPaginatedMovies`**: Computes `totalPages` and slices the filtered/sorted list for the active page.
- **`selectDashboardAnalytics`**: Computes total count, average rating, English-language count, top-rated title, and top-5 genre breakdown for the Analytics Dashboard.