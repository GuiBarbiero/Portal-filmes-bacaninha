export default function CardContainer({ titulo, children }) {
  return (
    <div className="mb-12 p-6 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
        {titulo}
      </h1>
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900">
        {children}
      </div>
    </div>
  );
}
