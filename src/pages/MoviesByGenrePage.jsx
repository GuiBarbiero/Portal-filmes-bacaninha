import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const genres = [
  { id: 28, name: "Ação" },
  { id: 35, name: "Comédia" },
  { id: 18, name: "Drama" },
];

export default function MoviesByGenrePage() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const currentGenreIndex = genres.findIndex((genre) => genre.id === Number(id));

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&with_genres=${id}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes por gênero:", error);
      }
    };

    fetchMoviesByGenre();
  }, [id]);

  const handlePreviousGenre = () => {
    const previousIndex = (currentGenreIndex - 1 + genres.length) % genres.length;
    navigate(`/generos/${genres[previousIndex].id}`);
  };

  const handleNextGenre = () => {
    const nextIndex = (currentGenreIndex + 1) % genres.length;
    navigate(`/generos/${genres[nextIndex].id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Filmes do Gênero {genres[currentGenreIndex].name}
      </h1>

      
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handlePreviousGenre}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300"
        >
          Gênero Anterior
        </button>
        <button
          className="bg-gradient-to-r from-gray-300 to-gray-400 text-black font-semibold py-2 px-6 rounded-lg shadow-lg cursor-default"
        >
          Gênero Atual: {genres[currentGenreIndex].name}
        </button>
        <button
          onClick={handleNextGenre}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition duration-300"
        >
          Próximo Gênero
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            titulo={movie.title}
            imagem_destaque={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}
