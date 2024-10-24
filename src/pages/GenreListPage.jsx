import { Link } from "react-router-dom";

export default function GenreListPage() {
  const genres = [
    { id: 28, name: "Ação" },
    { id: 35, name: "Comédia" },
    { id: 18, name: "Drama" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Explore Gêneros de Filmes
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {genres.map((genre) => (
          <li key={genre.id} className="text-center">
            <Link
              to={`/generos/${genre.id}`}
              className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gradient-to-l hover:from-purple-700 hover:to-blue-700 transition-transform duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
