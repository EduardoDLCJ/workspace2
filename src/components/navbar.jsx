import React, {useEffect, useState} from "react";

const Navbar = ({ bgColor, bgOpacity }) => {
  const token = localStorage.getItem("authToken"); // Verifica si hay un token en localStorage
  const userName = localStorage.getItem("nombre"); // Obtiene el nombre del usuario
  const role = localStorage.getItem("rol"); // Obtiene el rol del usuario
  const id = localStorage.getItem("id"); // Obtiene el id del usuario
  const [showMenu, setShowMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); // Estado para el menú móvil

  useEffect(() => {
    if (!token) return; // Si no hay token, no ejecutar la función

    const fetchData = async () => {
      try {
        const response = await fetch(`https://workspaceapi.onrender.com/login/token/${id}`); // Cambia la URL según tu API
  
        if (!response.ok) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("nombre");
          localStorage.removeItem("rol");
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
  
    fetchData(); // Llamada inicial
    const interval = setInterval(fetchData, 5000); // Llamar cada 5 segundos
  
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <nav className={`${bgColor} ${bgOpacity} text-[#edfafa] shadow-md fixed top-0 left-0 w-full z-50`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logoapp">
          <a href="/dashboard" className="text-3xl font-bold hover:text-[#48e5c2]">WorkSpace</a> {/* Aumentado a text-2xl */}
        </div>

        {/* Menú principal */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex-1 flex justify-center items-center space-x-6">
            {token && (
              <>
                {role === "admin" ? (
                  <>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                    <a href="/crud" className="text-lg hover:text-[#48e5c2] font-bold">Gestión de usuarios</a>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                    <a href="/respaldos" className="text-lg hover:text-[#48e5c2] font-bold">Respaldos</a>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                    <a href="/entornos" className="text-lg hover:text-[#48e5c2] font-bold">Lista de entornos</a>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                    <a href="#" className="text-lg hover:text-[#48e5c2] font-bold">Gestión de dispositivos</a>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                    <a href="#" className="text-lg hover:text-[#48e5c2] font-bold">Métricas</a>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                  </>
                )}
              </>
            )}
          </div>
          {token ? (
            <div className="relative flex items-center space-x-2">
              <a href="/perfil" className="relative">
                <div className="w-12 h-12 bg-white text-blue-700 rounded-full flex items-center justify-center shadow-md hover:bg-[#48e5c2] transition-colors"> {/* Aumentado a w-12 h-12 */}
                  <svg
                    className="w-8 h-8" /* Aumentado a w-8 h-8 */
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
              </a>
              <div className="relative">
                <span className="text-lg font-medium">{userName}</span>
                <button
                  className="ml-2 focus:outline-none relative"
                  style={{ top: "7px" }} // Ajusta la posición vertical del ícono
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#5985b1] rounded-md shadow-lg py-4 px-4 z-50"> {/* Cambiado w-48 a w-56 y py-2 a py-4 */}
                    <button
                      onClick={() => {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("nombre");
                        localStorage.removeItem("rol");
                        window.location.href = "/dashboard";
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-white bg-[#f56476] rounded-md hover:bg-[#f22c43] transition-colors shadow-md"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <a
              href="/login"
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-300 transition-colors"
            >
              Iniciar Sesión
            </a>
          )}
        </div>

        {/* Botón del menú hamburguesa */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-blue-700 shadow-md">
          <div className="flex flex-col space-y-4 p-6 bg-[#5985b1]"> {/* Aumentado space-y-4 y p-6 */}
            {token ? (
              <>

                {role === "admin" ? (
                  <>
                    <a href="/crud" className="hover:text-fuchsia-400 text-[#edfafa] font-bold text-lg">Gestión de usuarios</a>
                    <a href="/respaldos" className="hover:text-fuchsia-400 text-[#edfafa] font-bold text-lg">Respaldos</a>
                  </>
                ) : (

                  <>
                    <a href="/entornos" className="hover:text-fuchsia-400 text-[#edfafa] font-bold text-lg">Lista de entornos</a>
                    <a href="#" className="hover:text-fuchsia-400 text-[#edfafa] font-bold text-lg">Gestión de dispositivos</a>
                    <a href="#" className="hover:text-fuchsia-400 text-[#edfafa] font-bold text-lg">Métricas</a>
                  </>
                )}
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("nombre");
                    localStorage.removeItem("rol");
                    window.location.href = "/dashboard";
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-white bg-[#f56476] rounded-md hover:bg-[#f22c43] transition-colors shadow-md" // Agregado mt-4
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-fuchsia-400 transition-colors"
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;