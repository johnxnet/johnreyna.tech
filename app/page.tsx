'use client'; // Esta línea es OBLIGATORIA en Next.js para usar funcionalidades interactivas (hooks)

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  // Estado 1: Almacena la pregunta del usuario
  const [question, setQuestion] = useState(''); 
  // Estado 2: Almacena la respuesta del agente de IA
  const [answer, setAnswer] = useState('');
  // Estado 3: Indica si la aplicación está esperando la respuesta de la IA (para mostrar el spinner)
  const [isLoading, setIsLoading] = useState(false);

  // Función asíncrona que se ejecuta al hacer clic en el botón
  const consultAI = async () => {
    if (!question.trim()) return; // Ignorar si el campo está vacío

    setAnswer(''); // Limpiamos la respuesta anterior
    setIsLoading(true); // Activamos el spinner

    try {
      // Hacemos la llamada al Backend (la API Route que creamos)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos la pregunta en formato JSON
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (data.error) {
        setAnswer(`Error: ${data.error}`);
      } else {
        // Mostramos la respuesta generada por la IA
        setAnswer(data.answer);
      }
    } catch (error) {
      setAnswer('Connection Error. Check the console and ensure the API key is valid.');
      console.error(error);
    } finally {
      setIsLoading(false); // Desactivamos el spinner
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 
                    sm:min-h-screen sm:justify-around 
                    lg:min-h-screen lg:justify-center bg-gray-50">
      
        {/* NUEVO: Contenedor para la imagen */}
        <img 
            src="/john-reyna.webp" // Ruta desde la carpeta 'public'
            alt="John Reyna Profile" 
            className="w-50 h-50 rounded-full mb-6 object-cover shadow-lg border-4 border-blue-200" // Clases Tailwind
        />


      {/* Tu Encabezado Profesional */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
        John Reyna
      </h1>

      {/* Título Profesional */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
        <span className="text-blue-600">Digital Platform Specialist</span>
      </h1>

      {/* Resumen */}
      <p className="text-xl text-gray-600 mb-8 max-w-2xl text-center">
        Technical Leader specializing in CMS Operations, Web Performance, and driving growth through Digital Experience optimization
      </p>

      {/* SECCIÓN TEMPORAL: Descarga de Resume */}
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📄 Mi Trayectoria Profesional</h2>
        <p className="text-gray-600 mb-6">
          Explora mi experiencia detallada en arquitectura de plataformas y gestión de proyectos digitales.
        </p>
        <a 
          href="/john_reyna_resume.txt" 
          download
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
          Descargar Resume (TXT)
        </a>
      </div>

      {/* AI Functionality Box - COMENTADA TEMPORALMENTE */}
      {/* <div className="w-full max-w-lg p-6 bg-white border border-blue-200 rounded-lg shadow-xl mt-8">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800">🤖 Ask My AI Agent</h2>
        
        <input 
          type="text" 
          placeholder="Ex: Why should I hire John?"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          disabled={isLoading} 
          onKeyDown={(e) => { if (e.key === 'Enter') consultAI(); }} 
        />
        
        <button 
          className="mt-4 w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-150 disabled:bg-gray-400"
          onClick={consultAI} 
          disabled={isLoading} 
        >
          {isLoading ? 'Consulting...' : 'Consult My Experience'}
        </button>

        {answer && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-gray-800 whitespace-pre-wrap">
            <p className="font-bold mb-1">AI Agent:</p>
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        )}
      </div>
      */}
      
    </div>
  );
}
