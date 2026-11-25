import { getCachedData } from './cacheService';

export let isServingCachedData = false;

export const fetchMovies = () => {
  return getCachedData('all_movies', async () => {
    const res = await fetch('https://api.tvmaze.com/shows');
    if (!res.ok) throw new Error('Failed to fetch movies');
    isServingCachedData = res.headers.get('X-From-Cache') === 'true' || !navigator.onLine;
    return res.json();
  });
};

export const fetchMovieById = (id) => {
  return getCachedData(`movie_${id}`, async () => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (!res.ok) throw new Error('Movie not found');
    isServingCachedData = res.headers.get('X-From-Cache') === 'true' || !navigator.onLine;
    return res.json();
  });
};