import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faGlobe, faLightbulb, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  useEffect(() => {
    const handleScroll = () => {
      const mission = document.querySelector("#mission");
      const vision = document.querySelector("#vision");

      const missionPosition = mission.getBoundingClientRect().top;
      const visionPosition = vision.getBoundingClientRect().top;

      const screenPosition = window.innerHeight / 1.3;

      if (missionPosition < screenPosition) {
        mission.classList.add("animate-fade-in-left");
      }
      if (visionPosition < screenPosition) {
        vision.classList.add("animate-fade-in-right");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    /* Sección Principal */
    <div className="min-h-screen bg-gradient-to-b from-[#EDFAFA] to-[#D3E3E6] flex flex-col items-center">
      <div className="dashboard-bg relative h-screen w-11/12 mx-auto">
        <Navbar bgColor="bg-[#5985b1]" bgOpacity="opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white text-center px-4 leading-tight">
            <span>CONÉCTATE AL FUTURO</span>
            <br />
            <span>AUTOMATIZACIÓN INTELIGENTE A TU ALCANCE</span>
          </h1>
        </div>
      </div>
      {/* Sección Informativa */}
        <div className="w-full text-center py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Imagen a la izquierda */}
          <div className="w-full md:w-1/2">
            <img
              src="https://i.imgur.com/XNrlj5l.jpeg"
              alt="WorkSpace"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          {/* Texto a la derecha */}
          <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              WORKSPACE
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              En WorkSpace ofrecemos una funcionalidad innovadora que permite la automatización y el monitoreo de entornos inteligentes mediante dispositivos IoT. A través de una app y una interfaz web, los usuarios pueden configurar escenarios personalizados, optimizar el uso de recursos y mejorar la eficiencia de sus espacios. Con tecnología avanzada y un enfoque intuitivo, brindamos una solución que transforma la manera en que interactuamos con nuestro entorno.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full text-center py-16 px-4">
  {/* Título de la sección de cards */}
  <div className="mb-12">
    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
      OPTIMIZA TU ENTORNO CON TECNOLOGÍA INTELIGENTE
    </h2>
    <p className="text-xl md:text-2xl text-gray-700">
      Automatiza, monitorea y controla escenarios personalizados con dispositivos IoT desde una sola plataforma.
    </p>
  </div>
  {/* Contenedor de las cards */}
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Card 1 */}
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <img
        src="https://i.imgur.com/dUypAWz.jpeg"
        alt="Automatización de Entornos Inteligentes"
        className="rounded-lg mb-4 w-full"
      />
      <h3 className="text-xl font-bold text-gray-800 mb-4">Automatización de Entornos Inteligentes</h3>
      <p className="text-lg text-gray-600">
      WorkSpace convierte espacios comunes en entornos inteligentes que se adaptan automáticamente a las necesidades de usuarios y negocios, mejorando calidad de vida y productividad
      </p>
    </div>
    {/* Card 2 */}
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <img
        src="https://i.imgur.com/o4P1jY0.jpeg"
        alt="App e Interfaz Web"
        className="rounded-lg mb-4 w-full"
      />
      <h3 className="text-xl font-bold text-gray-800 mb-4">App e Interfaz Web</h3>
      <p className="text-lg text-gray-600">
      Gestiona todos tus dispositivos inteligentes desde una plataforma unificada, con control remoto, programación avanzada y análisis en tiempo real para máxima eficiencia.
      </p>
    </div>
    {/* Card 3 */}
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <img
        src="https://i.imgur.com/URUATxX.jpeg"
        alt="Ahorro de Recursos"
        className="rounded-lg mb-4 w-full"
      />
      <h3 className="text-xl font-bold text-gray-800 mb-4">Ahorro de Recursos</h3>
      <p className="text-lg text-gray-600">
      Nuestra automatización inteligente optimiza el uso de energía y recursos, garantizando mayor eficiencia operativa y reducción significativa de costos a largo plazo.
      </p>
    </div>
    {/* Card 4 */}
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <img
        src="https://i.imgur.com/Blkr4xw.jpeg"
        alt="Tecnología Intuitiva"
        className="rounded-lg mb-4 w-full"
      />
      <h3 className="text-xl font-bold text-gray-800 mb-4">Tecnología Intuitiva</h3>
      <p className="text-lg text-gray-600">
      Interfaces amigables y asistencia inteligente hacen que la gestión de entornos automatizados sea accesible para cualquier usuario, sin complicaciones técnicas.
      </p>
    </div>
  </div>
</div>
{/* Sección Objetivo */}
<div className="objetivo-bg relative h-[70vh] w-11/12 mx-auto my-16">
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
      OBJETIVO
    </h2>
    <p className="text-2xl md:text-3xl text-white font-semibold leading-relaxed">
      Nos dedicamos a crear soluciones innovadoras que elevan la calidad de vida de las personas, mientras expandimos nuestro alcance en mercados globales. Nuestro compromiso es construir relaciones sólidas y duraderas, basadas en tecnología transformadora y confianza mutua.
    </p>
  </div>
</div>
      <div className="w-full text-center py-16 px-4">
  {/* Misión */}
  <div
    id="mission"
    className="container mx-auto flex flex-col md:flex-row items-center gap-8 mb-16 opacity-0"
  >
    {/* Imagen de la misión */}
    <div className="w-full md:w-1/2">
      <img
        src="https://i.imgur.com/s3ksHJd.jpeg"
        alt="Misión"
        className="rounded-lg shadow-lg w-full"
      />
    </div>
    {/* Contenido de la misión */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
        MISIÓN
      </h2>
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        Nuestra misión es ofrecer productos y servicios de alta calidad que superen las expectativas de nuestros clientes.
      </p>
    </div>
  </div>

  {/* Visión */}
  <div
    id="vision"
    className="container mx-auto flex flex-col md:flex-row items-center gap-8 opacity-0"
  >
    {/* Contenido de la visión */}
    <div className="w-full md:w-1/2 text-center md:text-right order-2 md:order-1">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
        VISIÓN
      </h2>
      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        Ser reconocidos como líderes en innovación y excelencia en nuestro sector, contribuyendo al bienestar de la sociedad.
      </p>
    </div>
    {/* Imagen de la visión */}
    <div className="w-full md:w-1/2 order-1 md:order-2">
      <img
        src="https://i.imgur.com/Qowh3Yy.jpeg"
        alt="Visión"
        className="rounded-lg shadow-lg w-full"
      />
    </div>
  </div>
</div>
{/* Sección Descarga App Móvil */}
<div
  className="relative h-[70vh] w-11/12 mx-auto my-16 bg-cover bg-center rounded-lg shadow-lg"
  style={{ backgroundImage: "url('https://i.imgur.com/jKCaVTU.jpeg')" }}
>
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
    DESCARGA NUESTRA APP MÓVIL
    </h2>
    <p className="text-2xl md:text-3xl text-white font-semibold leading-relaxed mb-8">
      Lleva el control de tus entornos inteligentes a donde vayas. Descarga nuestra app móvil desde tu tienda favorita.
    </p>
    <div className="flex gap-4">
      <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        <img
          alt="Descargar en Google Play"
          className="h-16"
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        />
      </a>
      <a
        href="https://www.apple.com/app-store/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-900 transition-colors"
      >
        <img
          alt="Descargar en App Store"
          className="h-16"
          src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
        />
      </a>
    </div>
  </div>
</div>
<Footer />
</div>
  );
};

export default Dashboard;