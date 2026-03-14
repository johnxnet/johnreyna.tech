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
      
      {/* Profile Image Container */}
      <img 
          src="/john-reyna.webp" // Ruta desde la carpeta 'public'
          alt="John Reyna Profile" 
          className="w-48 h-48 rounded-full mb-6 object
