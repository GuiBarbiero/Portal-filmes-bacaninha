import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToWatched, addToWatchLater, removeFromWatched, removeFromWatchLater } from "../utils/localStorage"; 

export default function MovieDetailPage() {
  const { id } = useParams(); 
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&language=pt-BR`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&language=pt-BR`
        );
        const data = await response.json();
        const trailerData = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerData ? trailerData.key : null);
      } catch (error) {
        console.error("Erro ao buscar trailer do filme:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailer();
  }, [id]);

  const handleAddToWatched = () => {
    addToWatched(id);
    alert("Filme adicionado à lista de Assistidos!");
  };

  const handleAddToWatchLater = () => {
    addToWatchLater(id);
    alert("Filme adicionado à lista Ver Depois!");
  };

  const handleRemoveFromWatched = () => {
    removeFromWatched(id);
    alert("Filme removido da lista de Assistidos!");
  };

  const handleRemoveFromWatchLater = () => {
    removeFromWatchLater(id);
    alert("Filme removido da lista Ver Depois!");
  };

  if (!movieDetails) {
    return <p>Carregando detalhes do filme...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white font-poppins"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        backdropFilter: "blur(12px)",
        fontFamily: "'Poppins', sans-serif", // Aplicando a nova fonte
      }}
    >
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-2xl max-w-4xl w-full transition-transform transform hover:scale-105">
        <h1 className="text-5xl font-extrabold mb-6 text-center">{movieDetails.title}</h1>

        {/* Trailer Section */}
        {trailer ? (
          <div className="flex justify-center mb-8">
            <iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        ) : (
          <p className="text-center text-lg">Trailer não disponível.</p>
        )}

        {/* Sinopse Section */}
        <div className="mt-8 text-lg leading-relaxed text-gray-300">
          <h2 className="text-3xl font-semibold mb-4">Sinopse</h2>
          <p>{movieDetails.overview}</p>
        </div>

        {/* Botões de Ação */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleAddToWatched}
            className="bg-teal-500 text-lg py-2 px-6 rounded-lg hover:bg-teal-600 transition-all shadow-md font-semibold tracking-wide"
          >
            Assistido
          </button>

          <button
            onClick={handleAddToWatchLater}
            className="bg-indigo-500 text-lg py-2 px-6 rounded-lg hover:bg-indigo-600 transition-all shadow-md font-semibold tracking-wide"
          >
            Ver Depois
          </button>

          <button
            onClick={handleRemoveFromWatched}
            className="bg-rose-500 text-lg py-2 px-6 rounded-lg hover:bg-rose-600 transition-all shadow-md font-semibold tracking-wide"
          >
            Remover de Assistidos
          </button>

          <button
            onClick={handleRemoveFromWatchLater}
            className="bg-orange-500 text-lg py-2 px-6 rounded-lg hover:bg-orange-600 transition-all shadow-md font-semibold tracking-wide"
          >
            Remover de Ver Depois
          </button>
        </div>
      </div>
    </div>
  );
}
