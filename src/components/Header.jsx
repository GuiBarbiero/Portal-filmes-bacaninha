import { NavLink } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-900 text-white p-6 shadow-2xl sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Portal Filmes
        </h1>
        <ul className="flex space-x-10 text-lg">
          <li>
            <NavLink 
              to="/" 
              className="hover:text-teal-300 transition-colors duration-300" 
              activeClassName="text-teal-300"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/listaFilme" 
              className="hover:text-teal-300 transition-colors duration-300" 
              activeClassName="text-teal-300"
            >
              Lista de Filmes
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/generos" 
              className="hover:text-teal-300 transition-colors duration-300" 
              activeClassName="text-teal-300"
            >
              Gêneros
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/watched" 
              className="hover:text-teal-300 transition-colors duration-300" 
              activeClassName="text-teal-300"
            >
              Filmes Assistidos
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/watch-later" 
              className="hover:text-teal-300 transition-colors duration-300" 
              activeClassName="text-teal-300"
            >
              Ver Depois
            </NavLink>
          </li>
        </ul>
        <Login isLogged={isLogged} handleLogin={handleLogin} />
      </nav>
    </header>
  );
}
