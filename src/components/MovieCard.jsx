import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Adiciona ícones de estrela

export default function MovieCard({ id, titulo, imagem_destaque, avaliacao = 4.5 }) { // Avaliação padrão 4.5
  // Função para renderizar as estrelas da avaliação
  const renderStars = (avaliacao) => {
    const fullStars = Math.floor(avaliacao);
    const halfStar = avaliacao - fullStars >= 0.5 ? true : false;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="w-48 bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex-shrink-0 border border-gray-700">
      <Link to={`/listaFilme/${id}`}>
        <img
          src={imagem_destaque}
          alt={titulo}
          className="w-full h-64 object-cover rounded-t-lg"
          loading="lazy"
        />
      </Link>
      <div className="p-4 bg-gray-800 rounded-b-lg text-center">
        <h2 className="text-sm font-bold text-gray-100 truncate mb-2">{titulo}</h2>

        {/* Avaliação por estrelas */}
        <div className="flex justify-center items-center space-x-1 mb-2">
          {renderStars(avaliacao)}
        </div>
        
        <p className="text-xs text-gray-400">{avaliacao.toFixed(1)} / 5</p>
      </div>
    </div>
  );
}
