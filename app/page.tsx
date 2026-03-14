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
      
      {/* Profile Image Container - CORREGIDO */}
      <img 
          src="/john-reyna.webp" 
          alt="John Reyna Profile" 
          className="w-48 h-48 rounded-full mb-6 object-cover shadow-lg border-4 border-blue-200" 
      />

      {/* Main Name Heading */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-2 text-center">
        John Reyna
      </h1>

      {/* Professional Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        <span className="text-blue-600">Digital Platform Specialist</span>
      </h2>

      {/* Professional Summary */}
      <p className="text-xl text-gray-600 mb-10 max-w-2xl text-center leading-relaxed">
        Technical Leader specializing in CMS Operations, Web Performance, and driving growth through Digital Experience optimization.
      </p>

      {/* ACTIVE SECTION: Resume Download (PDF) */}
      <div className="w-full max-w-lg p-8 bg-white border border-gray-200 rounded-2xl shadow-2xl text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">📄 Professional Background</h3>
        <p className="text-gray-600 mb-8">
          Explore my detailed experience in platform architecture, CMS operations, and digital project management.
        </p>
        <a 
          href="/John_Reyna_Resume.pdf" 
          download
          className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Download Resume (PDF)
        </a>
      </div>

      {/* AI AGENT SECTION - TEMPORARILY DISABLED (COMMENTED OUT) */}
      {/* <div className="w-full max-w-lg p-6 bg-white border border-blue-200 rounded-lg shadow-xl mt-12">
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
