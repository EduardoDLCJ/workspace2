import React, { useState } from "react";
import Navbar from "../components/navbar";
import DetallesEntornos from "../DetallesEntornos";

const Entornos = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [entornos, setEntornos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    playlist: "",
    inicio: "",
    fin: "",
    icon: ""
  });
  const [selectedEntorno, setSelectedEntorno] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
  const [cargando, setCargando] = useState(false);
  

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleDetails = (entorno) => {
    setSelectedEntorno(entorno);
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handleIconChange = (e) => {
    setSelectedIcon(e.target.value);
    setFormData({...formData, icon: e.target.value});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    setCargando(true);
    e.preventDefault();
    try {
      const response = await fetch("https://workspaceapi.onrender.com/entornos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          Usuario_idUsuario: id,
          nombre: formData.nombre,
          playlist: formData.playlist || undefined,
          inicio: formData.inicio,
          fin: formData.fin,
          icono: selectedIcon
        }),
      });

      if (response.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        window.location.href = '/dashboard';
        return;
      }
      if (!response.ok) throw new Error('Error al crear entorno');
      const data = await response.json();
      setEntornos((prev) => [...prev, data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert('Hubo un error al crear el entorno');
    }
    setCargando(false);
  };

  const fetchEntornos = async () => {
    try {
      const response = await fetch(`https://workspaceapi.onrender.com/entornos/usuario/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los entornos");
      }

      const data = await response.json();
      const entornosConIconos = data.map((entorno) => ({
        ...entorno,
        icon: entorno.icono // Asignar el icono basado en el campo 'icono' del fetch
      }));
      setEntornos(entornosConIconos);
    } catch (error) {
      console.error("Error:", error);
    }
    setCargando(false);
  };

  // Llamar a fetchEntornos al cargar el componente
  React.useEffect(() => {
    fetchEntornos();
  }, []);

  const handleDelete = (_id, e) => {
    e.stopPropagation(); // Evita que el evento se propague al contenedor padre
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este entorno?");
    if (confirmDelete) {
      fetch(`https://workspaceapi.onrender.com/entornos/${_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el entorno");
          }
          setEntornos(entornos.filter((entorno) => entorno._id !== _id));
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const renderIcon = (iconValue, size = "w-12 h-12") => {
    switch(iconValue) {
      case "icon1":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={`${size} fill-[#5985B1]`}
          >
            <path d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2L56 72c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6l0 2.8c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6l0 2.8c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48c-35.3 0-64 28.7-64 64l0 71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1s0 0 0 0s0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4c0 0 0 0 0 0s0 0 0 0l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8c0 0 0 0 0 0s0 0 0 0s0 0 0 0l.1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9l0-71c0-35.3-28.7-64-64-64l0-48c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48-64 0 0-48c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48-64 0 0-48zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4L0 480c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32l0-85.4z"/>
          </svg>
        );
      case "icon2":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className={`${size} fill-[#5985B1]`}
          >
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
          </svg>
        );
      case "icon3":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className={`${size} fill-[#5985B1]`}
          >
            <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/>
          </svg>
        );
      case "icon4":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`${size} fill-[#5985B1]`}
          >
            <path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96L96 320zM81.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6S-3.3 490.7 1.9 478.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM313.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z"/>
          </svg>
        );
      case "icon5":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`${size} fill-[#5985B1]`}
          >
            <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
          </svg>
        );
      case "icon6":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`${size} fill-[#5985B1]`}
          >
            <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
          </svg>
        );
      case "add":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={`${size} fill-[#5985B1]`}
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        );
      case "delete":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={`${size} fill-[#e74c3c]`}
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "No especificado";
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDFAFA] to-[#D3E3E6] flex flex-col items-center relative">
      {/* Navbar */}
      <Navbar bgColor="bg-[#5985b1]" bgOpacity="opacity-100" />

      {/* Fondo similar al dashboard */}
      <div
        className={`relative min-h-[90vh] w-[90%] mx-auto mt-16 bg-white rounded-b-[50px] shadow-lg overflow-hidden ${
          isFormOpen || isDetailsOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Título */}
        <h1 className="text-6xl font-bold text-[#5985B1] text-center mt-8">
          MIS ENTORNOS
        </h1>

        {/* Contenido */}
        <div className="p-8">
          {entornos.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center font-semibold">
              <p className="text-5xl text-[#5985B1] opacity-50 text-center mb-8">
                NO TIENES ENTORNOS CREADOS
              </p>
              <button
                onClick={toggleForm}
                className="px-8 py-4 bg-[#5985B1] text-white text-xl font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300 cursor-pointer"
              >
                Crear Nuevo Entorno
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {entornos.map((entorno) => (
                <div 
                  key={entorno.id}
                  className="w-72 bg-white rounded-xl shadow-lg overflow-hidden border border-[#D3E3E6] hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
                  onClick={() => toggleDetails(entorno)}
                >
                  <div className="p-6 flex flex-col items-center flex-grow">
                    <div className="mb-4">
                      {renderIcon(entorno.icon, "w-16 h-16")}
                    </div>
                    <h3 className="text-2xl font-bold text-[#5985B1] mb-2 text-center">
                      {entorno.nombre}
                    </h3>
                    <div className="w-full mt-4 space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Inicio:</span>
                        <span className="text-[#5985B1] font-semibold">
                          {formatDateTime(entorno.inicio)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Fin:</span>
                        <span className="text-[#5985B1] font-semibold">
                          {formatDateTime(entorno.fin)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Playlist:</span>
                        <span className="text-[#5985B1] font-semibold">
                          {entorno.playlist || "No especificada"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDelete(entorno._id, e)}
                    className="mt-auto w-full py-2 bg-[#f8f9fa] text-[#e74c3c] font-semibold rounded-b-xl hover:bg-[#5985B1] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {renderIcon("delete", "w-5 h-5")}
                    Eliminar
                  </button>
                </div>
              ))}
              
              {/* Tarjeta para agregar nuevo entorno */}
              <div 
                className="w-72 bg-white rounded-xl shadow-lg overflow-hidden border border-[#D3E3E6] hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={toggleForm}
              >
                <div className="p-6 flex flex-col items-center h-full justify-center">
                  <div className="mb-4">
                    {renderIcon("add", "w-16 h-16")}
                  </div>
                  <h3 className="text-2xl font-bold text-[#5985B1] text-center">
                    Crear Nuevo Entorno
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Formulario */}
      {isFormOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-[500px] relative border-1 border-[#D3E3E6]">
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-[#5985B1] mb-6 text-center">
              Crear Nuevo Entorno
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombre del Entorno
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre del entorno"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5985B1] text-[#5985B1] font-semibold"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Playlists
                </label>
                <select 
                  name="playlist"
                  value={formData.playlist}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5985B1] text-[#5985B1] font-semibold"
                >
                  <option value="">Selecciona una Playlist (Opcional)</option>
                  <option value="Relax">Relax</option>
                  <option value="Workout">Workout</option>
                  <option value="Focus">Focus</option>
                  <option value="Sleep">Sleep</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Horario de Inicio
                </label>
                <input
                  type="datetime-local"
                  name="inicio"
                  value={formData.inicio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5985B1] text-[#5985B1] font-semibold appearance-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Horario de Fin
                </label>
                <input
                  type="datetime-local"
                  name="fin"
                  value={formData.fin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5985B1] text-[#5985B1] font-semibold appearance-none"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Icono del Entorno
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((iconNum) => (
                    <label key={`icon${iconNum}`} className="flex flex-col items-center cursor-pointer">
                      <input
                        type="radio"
                        name="icon"
                        value={`icon${iconNum}`}
                        className="sr-only"
                        onChange={handleIconChange}
                        checked={selectedIcon === `icon${iconNum}`}
                        required
                      />
                      <div className={`w-12 h-12 p-2 border-2 rounded-lg flex items-center justify-center ${
                        selectedIcon === `icon${iconNum}` 
                          ? "border-[#5985B1] bg-[#5985B1]/10" 
                          : "border-transparent hover:border-[#5985B1]"
                      }`}>
                        {renderIcon(`icon${iconNum}`)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#5985B1] text-white font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300 cursor-pointer"
              >
                {cargando ? (
                    <span className="loading loading-infinity loading-sm"></span>
                 ) : (
                  "Crear Entorno"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

        {/* Modal de Detalles del Entorno - MODIFICADO */}
        {isDetailsOpen && selectedEntorno && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 z-50 mt-20">
            <div className="bg-white rounded-lg shadow-xl w-[95%] md:w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto relative border-1 border-[#D3E3E6]">
              <div className="p-4 md:p-8">
                {/* Encabezado modificado */}
                <div className="relative mb-4 md:mb-6">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#5985B1] text-center">
                    Detalles de Entorno
                  </h2>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 md:w-8 md:h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Componentes de control - MODIFICADO para dispositivos móviles */}
                <div className="w-full">
                  <DetallesEntornos className="w-full" />
                </div>

                {/* Botón para cerrar */}
                <div className="mt-6 md:mt-8 flex justify-center">
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="px-4 py-2 md:px-6 md:py-3 bg-[#5985B1] text-white font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300 text-sm md:text-base"
                  >
                    Cerrar Detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Entornos;