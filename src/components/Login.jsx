export default function Login({ isLogged, handleLogin }) {
    return (
      <div className="flex gap-5 items-center">
        {isLogged && <p>Olá, usuário</p>}
        <button
          onClick={handleLogin}
          className={`${
            isLogged
              ? "bg-gradient-to-r from-gray-100 to-purple-200 text-purple-800"
              : "bg-gradient-to-r from-gray-100 to-purple-200 text-purple-800"
          } px-4 py-1 rounded shadow-md hover:shadow-lg transition duration-300`}
        >
          {isLogged ? "Logout" : "Login"}
        </button>
      </div>
    );
  }
  