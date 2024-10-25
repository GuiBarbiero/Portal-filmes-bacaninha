import { useEffect, useState } from 'react';
import { getWatchedMovies, removeFromWatched } from '../Utils/localStorage.js';
import MovieCard from '../components/MovieCard';

export default function WatchedMoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const watchedMovieIds = getWatchedMovies();
      if (watchedMovieIds.length > 0) {
        const moviesData = await Promise.all(
          watchedMovieIds.map(async (id) => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=be1cd654ab3efabd5bf7efa1a9b3170a`);
            return response.json();
          })
        );
        setMovies(moviesData);
      }
    };

    fetchMovies();
  }, []);

  const handleRemove = (movieId) => {
    removeFromWatched(movieId);
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  if (movies.length === 0) return <p>Nenhum filme assistido ainda.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Filmes Assistidos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            id={movie.id} 
            titulo={movie.title} 
            imagem_destaque={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            onRemove={() => handleRemove(movie.id)} 
          />
        ))}
      </div>
    </div>
  );
}
