'use client'; // Esta línea es OBLIGATORIA en Next.js para usar funcionalidades interactivas (hooks)

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  // Estado para la IA (se mantienen para cuando se reactive)
  const [question, setQuestion] = useState(''); 
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const consultAI = async () => {
    if (!question.trim()) return;
    setAnswer('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (data.error) {
        setAnswer(`Error: ${data.error}`);
      } else {
        setAnswer(data.answer);
      }
    } catch (error) {
      setAnswer('Connection Error.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 bg-gray-50 min-h-screen">
      
      {/* Profile Image Container */}
      <img 
          src="/john-reyna.webp" 
          alt="John Reyna Profile" 
          className="w-48 h-48 rounded-full mb-6 object-cover shadow-lg border-4 border-blue-200" 
      />

      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-2 text-center">
        John Reyna
      </h1>

      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        <span className="text-blue-600">Digital Platform Specialist</span>
      </h2>

      <p className="text-xl text-gray-600 mb-10 max-w-2xl text-center leading-relaxed">
        Technical Leader specializing in CMS Operations, Web Performance, and driving growth through Digital Experience optimization.
      </p>

      {/* RESUME SECTION */}
      <div className="w-full max-w-lg p-8 bg-white border border-gray-200 rounded-2xl shadow-xl text-center mb-16">
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

      {/* --- PROJECTS SECTION --- */}
      <div className="w-full max-w-6xl mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center uppercase tracking-widest">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Project 1: USA Tile */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col hover:border-blue-300 transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🛒 WooCommerce Optimization</h3>
            <p className="text-sm text-blue-600 font-bold mb-4 uppercase tracking-tighter">USA Tile & Marble</p>
            <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
              Developed custom PHP logic for square footage pricing and built a centralized product data system ("Rosetta Stone") for multi-brand management.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#PHP</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#WooCommerce</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#ACF</span>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <a href="https://usa-tile.com" target="_blank" className="text-blue-600 hover:underline">usa-tile.com →</a>
              <a href="https://itilemosaic.com" target="_blank" className="text-blue-600 hover:underline">itilemosaic.com →</a>
            </div>
          </div>

          {/* Project 2: PHIL AI */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col hover:border-blue-300 transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🤖 PHIL – AI Chat Platform</h3>
            <p className="text-sm text-blue-600 font-bold mb-4 uppercase tracking-tighter">Vision Bridge Logistics</p>
            <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
              Architected a conversational AI interface using n8n and WordPress, featuring monetized access control via MemberPress.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#AI_Agents</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#n8n</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#WordPress</span>
            </div>
            <a href="https://visionbridgelogistics.com/" target="_blank" className="text-blue-600 text-xs hover:underline">visionbridgelogistics.com →</a>
          </div>

          {/* Project 3: Shopify UX */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col hover:border-blue-300 transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🛍️ Shopify UX Engineering</h3>
            <p className="text-sm text-blue-600 font-bold mb-4 uppercase tracking-tighter">NF Sports / Fear The Lamb</p>
            <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
              Implemented dynamic content scheduling using Shopify Metaobjects and Liquid to reduce manual updates and improve UX.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#Liquid</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#Metaobjects</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">#Shopify</span>
            </div>
            <a href="https://nfsports.com/" target="_blank" className="text-blue-600 text-xs hover:underline">nfsports.com →</a>
          </div>

        </div>
      </div>

      {/* AI AGENT SECTION - TEMPORARILY DISABLED (COMMENTED OUT) */}
      {/* 
      <div className="w-full max-w-lg p-6 bg-white border border-blue-200 rounded-lg shadow-xl mt-12">
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
