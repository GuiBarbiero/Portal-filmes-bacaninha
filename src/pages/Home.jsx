import { useEffect, useState, useRef } from "react";
import { addToWatchLater, addToWatched, getRecommendedMovies, getWatchedMovies } from "../Utils/localStorage.js";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]); // Para os filmes já assistidos

  const recommendedMoviesRef = useRef(null);
  const popularMoviesRef = useRef(null);
  const upcomingMoviesRef = useRef(null);
  const watchedMoviesRef = useRef(null); // Referência para rolagem dos filmes assistidos

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularResponse = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&language=pt-br'
        );
        const popularMoviesData = await popularResponse.json();
        setPopularMovies(popularMoviesData.results);

        const upcomingResponse = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&language=pt-br'
        );
        const upcomingMoviesData = await upcomingResponse.json();
        setUpcomingMovies(upcomingMoviesData.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  // Fetch de filmes recomendados
  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const movies = await getRecommendedMovies();
      setRecommendedMovies(movies);
    };

    fetchRecommendedMovies();
  }, []);

  // Fetch dos filmes assistidos armazenados no localStorage
  useEffect(() => {
    const watchedMovies = getWatchedMovies(); // Função que retorna os filmes assistidos do localStorage
    setWatchedMovies(watchedMovies); // Define o estado com os filmes assistidos
  }, []);

  const handleAddToWatched = (movieId) => {
    addToWatched(movieId); 
  };

  const handleAddToWatchLater = (movieId) => {
    addToWatchLater(movieId); 
  };

  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4">
      {/* Seção de Recomendados para Você */}
      <h1 className="text-3xl font-serif font-bold mb-4 text-center">Recomendados para Você</h1>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('left', recommendedMoviesRef)}
        >
          &#8249;
        </button>
        <div
          ref={recommendedMoviesRef}
          className="flex space-x-4 overflow-x-hidden pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recommendedMovies.length > 0 ? (
            recommendedMovies
              .filter((filme) => filme && filme.id)  // Verificação para evitar nulos
              .map((filme) => (
                <MovieCard
                  key={filme.id}
                  id={filme.id}
                  titulo={filme.title}
                  imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                  onWatched={() => handleAddToWatched(filme.id)}
                  onWatchLater={() => handleAddToWatchLater(filme.id)}
                  showRemoveButton={false}
                />
              ))
          ) : (
            <p>Nenhum filme recomendado no momento.</p>
          )}
        </div>
        <button
          className="absolute right-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('right', recommendedMoviesRef)}
        >
          &#8250;
        </button>
      </div>

      {/* Seção de Filmes Populares */}
      <h1 className="text-3xl font-serif font-bold mb-4 text-center">Filmes Populares</h1>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('left', popularMoviesRef)}
        >
          &#8249;
        </button>
        <div
          ref={popularMoviesRef}
          className="flex space-x-4 overflow-x-hidden pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularMovies
            .filter((filme) => filme && filme.id)  // Verificação para evitar nulos
            .map((filme) => (
              <MovieCard
                key={filme.id}
                id={filme.id}
                titulo={filme.title}
                imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                onWatched={() => handleAddToWatched(filme.id)}
                onWatchLater={() => handleAddToWatchLater(filme.id)}
                showRemoveButton={false}
              />
            ))}
        </div>
        <button
          className="absolute right-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('right', popularMoviesRef)}
        >
          &#8250;
        </button>
      </div>

      {/* Seção de Próximos Lançamentos */}
      <h1 className="text-3xl font-serif font-bold mb-4 text-center">Próximos Lançamentos</h1>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('left', upcomingMoviesRef)}
        >
          &#8249;
        </button>
        <div
          ref={upcomingMoviesRef}
          className="flex space-x-4 overflow-x-hidden pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {upcomingMovies
            .filter((filme) => filme && filme.id)  // Verificação para evitar nulos
            .map((filme) => (
              <MovieCard
                key={filme.id}
                id={filme.id}
                titulo={filme.title}
                imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                onWatched={() => handleAddToWatched(filme.id)}
                onWatchLater={() => handleAddToWatchLater(filme.id)}
                showRemoveButton={false}
              />
            ))}
        </div>
        <button
          className="absolute right-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('right', upcomingMoviesRef)}
        >
          &#8250;
        </button>
      </div>

      {/* Seção de Filmes Assistidos */}
      <h1 className="text-3xl font-serif font-bold mb-4 text-center">Filmes que Você Já Assistiu</h1>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('left', watchedMoviesRef)}
        >
          &#8249;
        </button>
        <div
          ref={watchedMoviesRef}
          className="flex space-x-4 overflow-x-hidden pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {watchedMovies.length > 0 ? (
            watchedMovies
              .filter((filme) => filme && filme.id)  // Verificação para evitar nulos
              .map((filme) => (
                <MovieCard
                  key={filme.id}
                  id={filme.id}
                  titulo={filme.title}
                  imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                  onWatched={() => handleAddToWatched(filme.id)}
                  onWatchLater={() => handleAddToWatchLater(filme.id)}
                  showRemoveButton={false}
                />
              ))
          ) : (
            <p>Você ainda não marcou nenhum filme como assistido.</p>
          )}
        </div>
        <button
          className="absolute right-0 bg-black bg-opacity-50 p-6 rounded-full z-10 text-white text-3xl hover:bg-opacity-80"
          onClick={() => handleScroll('right', watchedMoviesRef)}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
