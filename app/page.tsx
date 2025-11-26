'use client'; // Esta línea es OBLIGATORIA en Next.js para usar funcionalidades interactivas (hooks)

import { useState } from 'react';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      
      {/* NUEVO: Contenedor para la imagen */}
        <img 
            src="/john-reyna.webp" // Ruta desde la carpeta 'public'
            alt="John Reyna Profile" 
            className="w-60 h-60 rounded-full mb-6 object-cover shadow-lg border-4 border-blue-200" // Clases Tailwind
        />
        {/* FIN NUEVO */}


      {/* Tu Encabezado Profesional */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
        John Reyna
      </h1>

      {/* Tu Encabezado Profesional */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
        <span className="text-blue-600">Senior E-commerce Architect</span>
      </h1>

      {/* Resumen */}
      <p className="text-xl text-gray-600 mb-8 max-w-2xl text-center">
        Specialist in legacy system modernization, scalable architecture (Next.js, Headless WordPress), and technical leadership.
      </p>

      {/* AI Functionality Box */}
      <div className="w-full max-w-lg p-6 bg-white border border-blue-200 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800">🤖 Ask My AI Agent</h2>
        
        <input 
          type="text" 
          placeholder="Ex: What was the sales increase at USA Tile & Marble?"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          value={question} // Conectamos el input con la variable de estado 'question'
          onChange={(e) => setQuestion(e.target.value)} // Guardamos lo que escribe el usuario
          disabled={isLoading} // Deshabilitamos si está cargando
          onKeyDown={(e) => { if (e.key === 'Enter') consultAI(); }} // Permite enviar con Enter
        />
        
        <button 
          className="mt-4 w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-150 disabled:bg-gray-400"
          onClick={consultAI} // Llamamos a la función de consulta al hacer clic
          disabled={isLoading} // Deshabilitamos si está cargando
        >
          {isLoading ? 'Consulting...' : 'Consult My Experience'}
        </button>

        {/* Área de Respuesta de la IA */}
        {answer && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-gray-800 whitespace-pre-wrap">
            <p className="font-bold mb-1">AI Agent:</p>
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}