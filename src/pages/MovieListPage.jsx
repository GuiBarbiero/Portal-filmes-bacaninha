import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function MovieListPage() {
  const [search, setSearch] = useState('');  
  const [filmes, setFilmes] = useState([]); 
  const [page, setPage] = useState(1);  
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);  
  const [filmesFiltrados, setFilmesFiltrados] = useState([]);  

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&language=pt-br&page=${page}`
        );
        const data = await response.json();
        const newFilmes = [...filmes, ...data.results];
        setFilmes(newFilmes);
        setFilmesFiltrados(newFilmes);  // Atualiza também os filmes filtrados
        if (data.page >= data.total_pages) {
          setHasMore(false); 
        }
      } catch (erro) {
        console.log('Erro ao buscar filmes:', erro);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [page]);


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10 && !loading && hasMore && !search
    ) {
      setPage((prevPage) => prevPage + 1);  
    }
  };

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore, search]); 

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

   
    if (searchValue.trim()) {
      const filtered = filmes.filter((filme) =>
        filme.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilmesFiltrados(filtered);
    } else {
      setFilmesFiltrados(filmes);  // Exibe todos os filmes caso a busca seja limpa
    }
  };

  
  const filmesParaMostrar = search ? filmesFiltrados : filmes;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Veja o catálogo completo de filmes</h2>

      <div className="relative mb-6">
        <input
          className="w-full p-4 pl-12 border-2 border-gray-300 rounded-full shadow-lg text-black focus:border-blue-500 focus:ring-blue-500 transition duration-300 ease-in-out"
          type="text"
          placeholder="Buscar filme..."
          value={search}
          onChange={handleSearch}
        />
        <svg
          className="w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 16a8 8 0 100-16 8 8 0 000 16zM22 22l-5-5"
          />
        </svg>
      </div>

     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10">
        {filmesParaMostrar.length > 0 ? (
          filmesParaMostrar.map((filme) => (
            <MovieCard
              key={filme.id}
              id={filme.id}
              titulo={filme.title}
              imagem_destaque={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-400">
            Nenhum filme encontrado.
          </p>
        )}
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="loader">Carregando...</div>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-lg text-gray-500 mt-8">Todos os filmes foram carregados.</p>
      )}
    </div>
  );
}
