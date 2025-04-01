import React, { useState, useRef, useEffect } from "react";
import { parseBlob } from "music-metadata-browser";
import { Buffer } from "buffer";
import Navbar from "./components/navbar";
window.Buffer = Buffer;


const Entorno = () => {
    const [brightness, setBrightness] = useState(50);
    const [color, setColor] = useState("#ffff00");
    const [temperature, setTemperature] = useState(24);
    const [ventilation, setVentilation] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [trackMetadata, setTrackMetadata] = useState([]);
    const audioRef = useRef(null);

    const audioFiles = [
        "/audio/1.mp3",
        "/audio/2.mp3",
        "/audio/3.mp3",
    ];

    // Cargar metadatos de las canciones
    useEffect(() => {
        const loadMetadata = async () => {
            const metadataList = [];
            for (const file of audioFiles) {
                try {
                    const response = await fetch(file);
                    const blob = await response.blob();
                    const metadata = await parseBlob(blob);
                    metadataList.push({
                        title: metadata.common.title || "Desconocido",
                        artist: metadata.common.artist || "Desconocido",
                        duration: metadata.format.duration || 0,
                        file,
                    });
                } catch (error) {
                    console.error(`Error al cargar metadatos de ${file}:`, error);
                }
            }
            setTrackMetadata(metadataList);
        };

        loadMetadata();
    }, []);

    const handleBrightnessChange = (e) => setBrightness(e.target.value);
    const handleColorChange = (e) => setColor(e.target.value);
    const handleTemperatureChange = (e) => setTemperature(e.target.value);
    const handleVentilationChange = (e) => setVentilation(e.target.value);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % trackMetadata.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(false);
    };

    const handlePreviousTrack = () => {
        const prevIndex =
            (currentTrackIndex - 1 + trackMetadata.length) % trackMetadata.length;
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(false);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [currentTrackIndex]);

    const getTemperatureIcon = () => {
        if (temperature <= 18) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m0-10l-6 6m6-6l6 6m-6-6l-6-6m6 6l6-6" />
                </svg>
            );
        } else if (temperature >= 28) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m8-10h2m-16 0H2m15.364-7.364l1.414 1.414M4.222 19.778l1.414-1.414M19.778 19.778l-1.414-1.414M4.222 4.222l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10V5a2 2 0 10-4 0v5a4 4 0 104 0z" />
                </svg>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#EDFAFA] to-[#D3E3E6] text-[#5985B1] p-4 md:p-8">
            <Navbar bgColor="bg-[#5985b1]" bgOpacity="opacity-100" />
            <div className="max-w-6xl mx-auto mt-18">
                <h1 className="text-6xl font-bold text-center mb-8 text-[#5985B1]">
                    Control de Entorno
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sección de Iluminación */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D3E3E6] hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6 text-[#5985B1] text-center">Control de Iluminación</h2>
                            
                            {/* Simulación de habitación */}
                            <div className="relative w-full h-64 bg-gray-900 rounded-box overflow-hidden flex items-center justify-center mb-6 border border-gray-700">
                                {/* Lámpara en el techo */}
                                <svg className="absolute top-8" width="80" height="80" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="20"
                                        fill={color}
                                        style={{
                                            filter: `drop-shadow(0 0 ${brightness/5}px ${color})`,
                                            opacity: brightness/100,
                                        }}
                                    />
                                    <line x1="50" y1="0" x2="50" y2="30" stroke="white" strokeWidth="2" />
                                </svg>
                                
                                {/* Piso */}
                                <div className="absolute bottom-0 w-full h-16 bg-gray-800"></div>
                                
                                {/* Efecto de luz */}
                                <div 
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at center, ${color}20 0%, transparent ${brightness}%)`,
                                    }}
                                ></div>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold text-[#5985B1]">Brillo: {brightness}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={brightness}
                                        onChange={handleBrightnessChange}
                                        className="w-full h-3 bg-[#D3E3E6] rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                
                                <div>
                                    <div className="font-semibold text-[#5985B1] mb-2 text-center">Color de la luz</div>
                                    <div className="flex items-center justify-center gap-4">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={handleColorChange}
                                            className="w-16 h-16 cursor-pointer rounded-full border-2 border-[#D3E3E6]"
                                        />
                                        <div className="badge badge-lg font-semibold" style={{ backgroundColor: color, color: '#fff' }}>
                                            {color.toUpperCase()}
                                        </div>
                                    </div>
                                </div>

                                {/* Modos predefinidos */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-[#5985B1] mb-4 text-center">Modos predefinidos</h3>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <button
                                            className="px-4 py-2 bg-[#5985B1] text-white font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300"
                                            onClick={() => {
                                                setColor("#FFD700");
                                                setBrightness(80);
                                            }}
                                        >
                                            Lectura
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-[#5985B1] text-white font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300"
                                            onClick={() => {
                                                setColor("#FF69B4");
                                                setBrightness(50);
                                            }}
                                        >
                                            Relajación
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-[#5985B1] text-white font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300"
                                            onClick={() => {
                                                setColor("#00FF00");
                                                setBrightness(100);
                                            }}
                                        >
                                            Fiesta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sección de Clima */}
                    <div className="space-y-8">
                        {/* Control de temperatura */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D3E3E6] hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-6 text-[#5985B1] text-center">
                                    Control de Temperatura
                                </h2>
                                
                                <div className="flex flex-col items-center mb-6">
                                    {getTemperatureIcon()}
                                    <div className="mt-6 text-4xl font-bold text-[#5985B1]">
                                        {temperature}°C
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold text-[#5985B1]">Temperatura: {temperature}°C</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="16"
                                        max="30"
                                        value={temperature}
                                        onChange={handleTemperatureChange}
                                        className="w-full h-3 bg-[#D3E3E6] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-sm mt-1 text-[#5985B1]">
                                        <span>16°C</span>
                                        <span>23°C</span>
                                        <span>30°C</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Control de ventilación */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D3E3E6] hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-6 text-[#5985B1] text-center">Control de Ventilación</h2>
                                
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        {/* Base del ventilador */}
                                        <div className="absolute w-24 h-24 rounded-full bg-[#D3E3E6] border-4 border-[#5985B1] flex items-center justify-center">
                                            {/* Centro del ventilador */}
                                            <div className="w-8 h-8 rounded-full bg-[#5985B1]"></div>
                                        </div>
                                        
                                        {/* Aspas del ventilador con animación */}
                                        <div 
                                            className="absolute w-full h-full"
                                            style={{
                                                animation: `spin ${3 / ventilation}s linear infinite`,
                                                transformOrigin: 'center'
                                            }}
                                        >
                                            {/* Aspa 1 */}
                                            <div className="absolute top-1/2 left-1/2 w-24 h-4 bg-[#5985B1] rounded-full" 
                                                style={{ transform: 'translate(-50%, -50%) rotate(0deg) translateX(20px)' }}></div>
                                            {/* Aspa 2 */}
                                            <div className="absolute top-1/2 left-1/2 w-24 h-4 bg-[#5985B1] rounded-full" 
                                                style={{ transform: 'translate(-50%, -50%) rotate(120deg) translateX(20px)' }}></div>
                                            {/* Aspa 3 */}
                                            <div className="absolute top-1/2 left-1/2 w-24 h-4 bg-[#5985B1] rounded-full" 
                                                style={{ transform: 'translate(-50%, -50%) rotate(240deg) translateX(20px)' }}></div>
                                        </div>
                                        
                                        {/* Indicador de nivel */}
                                        <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#5985B1] text-white font-semibold rounded-full">
                                            {ventilation}
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold text-[#5985B1]">Velocidad: {ventilation}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={ventilation}
                                        onChange={handleVentilationChange}
                                        className="w-full h-3 bg-[#D3E3E6] rounded-lg appearance-none cursor-pointer"
                                        step="1"
                                    />
                                    <div className="flex justify-between text-sm mt-1 text-[#5985B1]">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <span key={level}>{level}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Control de música */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D3E3E6] hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-6 text-[#5985B1] text-center">Control de Música</h2>

                                {trackMetadata.length > 0 && (
                                    <div className="mb-6 text-center">
                                        <p className="text-lg font-semibold text-[#5985B1]">
                                            {trackMetadata[currentTrackIndex]?.title}
                                        </p>
                                        <p className="text-sm text-[#5985B1]">
                                            {trackMetadata[currentTrackIndex]?.artist}
                                        </p>
                                        <p className="text-sm text-[#5985B1]">
                                            {Math.floor(trackMetadata[currentTrackIndex]?.duration / 60)}:
                                            {Math.floor(trackMetadata[currentTrackIndex]?.duration % 60)
                                                .toString()
                                                .padStart(2, "0")}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={handlePreviousTrack}
                                        className="px-4 py-2 bg-[#5985B1] text-white font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300"
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        onClick={toggleMusic}
                                        className={`px-6 py-3 text-lg ${
                                            isPlaying ? "bg-[#e74c3c]" : "bg-[#2ecc71]"
                                        } text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-colors duration-300`}
                                    >
                                        {isPlaying ? "Pausar" : "Reproducir"}
                                    </button>
                                    <button
                                        onClick={handleNextTrack}
                                        className="px-4 py-2 bg-[#5985B1] text-white font-semibold rounded-lg shadow-md hover:bg-[#476a8c] transition-colors duration-300"
                                    >
                                        Siguiente
                                    </button>
                                </div>

                                <audio ref={audioRef} controls className="hidden">
                                    <source
                                        src={trackMetadata[currentTrackIndex]?.file}
                                        type="audio/mpeg"
                                    />
                                    Tu navegador no soporta el elemento de audio.
                                </audio>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="mt-8 text-center">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-white text-[#5985B1] font-semibold rounded-lg shadow-md border border-[#5985B1] hover:bg-[#5985B1] hover:text-white transition-colors duration-300"
                    >
                        Regresar a Entornos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Entorno;