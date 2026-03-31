'use client';

import { useState } from 'react';

export default function Home() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 bg-gray-50 min-h-screen font-sans text-gray-900">
      
      {/* --- LIGHTBOX / MODAL FOR IMAGES --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300"
              alt="Project Showcase"
            />
            <button className="absolute top-4 right-4 text-white bg-white/10 rounded-full p-3 hover:bg-white/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* --- PROFILE SECTION --- */}
      <img 
        src="/john-reyna.webp" 
        alt="John Reyna Profile" 
        className="w-40 h-40 rounded-full mb-6 object-cover shadow-lg border-4 border-blue-200" 
      />
      <h1 className="text-5xl font-extrabold mb-2 text-center tracking-tight">John Reyna</h1>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Digital Platform Specialist</h2>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl text-center leading-relaxed italic">
        "Bridging technical architecture with digital growth."
      </p>

      {/* --- FEATURED PROJECTS SECTION --- */}
      <div className="w-full max-w-5xl mb-16 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center uppercase tracking-widest border-b-2 border-blue-100 pb-4">Featured Projects</h2>
        
        {/* PROJECT 1: USA TILE & MARBLE */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-1 italic">🛒 USA Tile & Marble – WooCommerce Platform Optimization</h3>
              <p className="text-blue-600 font-bold text-sm tracking-widest uppercase">Live Site: itilemosaic.com</p>
              <a href="https://itilemosaic.com" target="_blank" className="text-blue-500 text-xs hover:underline mt-2 inline-block">itilemosaic.com →</a>
            </div>
            <button onClick={() => toggleProject('usa-tile')} className="w-full md:w-auto bg-blue-50 text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-100 transition-all shadow-sm">
              {expandedProject === 'usa-tile' ? 'Close Case ▲' : 'Read Case ▼'}
            </button>
          </div>
          {expandedProject === 'usa-tile' && (
            <div className="px-8 pb-10 border-t border-gray-100 pt-8 animate-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-sm leading-relaxed text-gray-700">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-red-600">The Problem</h4>
                  <p>WooCommerce did not support pricing based on square footage (SF), causing inconsistencies across product, cart, and checkout.</p>
                  <h4 className="text-lg font-bold text-green-600">Result</h4>
                  <p>Delivered a consistent and reliable purchasing experience, improving pricing accuracy and reducing friction during checkout.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-blue-800 mb-3">What I Did</h4>
                  <ul className="list-disc list-inside space-y-2 text-xs">
                    <li>Developed custom PHP logic to dynamically calculate pricing based on square footage and ensured consistency across the entire purchase flow (product, cart, checkout, and order confirmation).</li>
                    <li>Customized WooCommerce templates and extended core functionality to support real-time quantity updates and pricing accuracy.</li>
                    <li>Leveraged Advanced Custom Fields (ACF) to structure complex product data and enable scalable customization across multiple websites.</li>
                    <li>Designed a centralized product data system (“Rosetta Stone”) to manage pricing, inventory, and SEO metadata across multiple brands sharing a single warehouse.</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { src: '/images/itilemosaic/product-page.jpg', label: 'SF CALCULATOR' },
                  { src: '/images/itilemosaic/cart-page.jpg', label: 'CART SYNCHRONIZATION' },
                  { src: '/images/itilemosaic/checkout-page.jpg', label: 'ORDER INTEGRITY' }
                ].map((img, idx) => (
                  <div key={idx} className="cursor-zoom-in group text-center" onClick={() => setSelectedImage(img.src)}>
                    <img src={img.src} className="rounded-xl border shadow-sm group-hover:opacity-90 transition" alt={img.label} />
                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase">{img.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROJECT 2: PHIL AI */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-1">🤖 PHIL – AI Chat Platform with WordPress & n8n</h3>
              <p className="text-blue-600 font-bold text-sm tracking-widest uppercase">Live Site: visionbridgelogistics.com</p>
              <a href="https://visionbridgelogistics.com/" target="_blank" className="text-blue-500 text-xs hover:underline mt-2 inline-block">visionbridgelogistics.com →</a>
            </div>
            <button onClick={() => toggleProject('phil')} className="w-full md:w-auto bg-blue-50 text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-100 transition-all shadow-sm">
              {expandedProject === 'phil' ? 'Close Case ▲' : 'Read Case ▼'}
            </button>
          </div>
          {expandedProject === 'phil' && (
            <div className="px-8 pb-10 border-t border-gray-100 pt-8 animate-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-sm leading-relaxed text-gray-700">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-red-600">The Problem</h4>
                  <p>Manual processes and repetitive user queries required ongoing manual handling, limiting scalability and response efficiency.</p>
                  <h4 className="text-lg font-bold text-green-600">Result</h4>
                  <p>Reduced manual workload, enabled scalable user interaction through an AI-driven interface, and introduced a monetized access model for the platform.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-blue-800 mb-3">What I Did</h4>
                  <ul className="list-disc list-inside space-y-2 text-xs">
                    <li>Developed a custom WordPress plugin powering a conversational AI chat interface inspired by ChatGPT/Gemini, allowing users to submit queries directly within the platform.</li>
                    <li>Connected the frontend chat interface with n8n workflows to process user inputs and generate automated responses.</li>
                    <li>Implemented secure access control using MemberPress, restricting the AI tool to authenticated users with active subscriptions.</li>
                    <li>Designed structured workflows to handle queries and simulate intelligent responses in a controlled environment.</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { src: '/images/phil/ai-agent.jpg', label: 'N8N WORKFLOW' },
                  { src: '/images/phil/ai-agent-2.jpg', label: 'AI MAPPING' },
                  { src: '/images/phil/ai-agent-plugin.jpg', label: 'WP BACKEND' },
                  { src: '/images/phil/login.jpg', label: 'ACCESS PORTAL' }
                ].map((img, idx) => (
                  <div key={idx} className="cursor-zoom-in group text-center" onClick={() => setSelectedImage(img.src)}>
                    <img src={img.src} className="rounded-lg border shadow-sm group-hover:opacity-90 transition h-24 w-full object-cover" alt={img.label} />
                    <p className="text-[8px] text-gray-400 mt-1 font-bold">{img.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROJECT 3: SHOPIFY OPTIMIZATION */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-1">🛍️ Shopify Optimization – Dynamic Content & UX Improvements</h3>
              <p className="text-blue-600 font-bold text-sm tracking-widest uppercase italic leading-tight">NF Sports | Fear The Lamb</p>
              <div className="flex flex-wrap gap-x-4 mt-2 text-center md:text-left">
                <a href="https://nfsports.com/" target="_blank" className="text-blue-500 text-xs hover:underline">nfsports.com →</a>
                <a href="https://fearthelambapparel.com/pages/daily-bible-verse" target="_blank" className="text-blue-500 text-xs hover:underline">fearthelamb.com →</a>
              </div>
            </div>
            <button onClick={() => toggleProject('shopify')} className="w-full md:w-auto bg-blue-50 text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-100 transition-all shadow-sm">
              {expandedProject === 'shopify' ? 'Close Case ▲' : 'Read Case ▼'}
            </button>
          </div>
          {expandedProject === 'shopify' && (
            <div className="px-8 pb-10 border-t border-gray-100 pt-8 animate-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-sm leading-relaxed text-gray-700">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-red-600">The Problem</h4>
                  <p>The storefront required manual updates for dynamic content and had limitations in navigation and product discovery.</p>
                  <h4 className="text-lg font-bold text-green-600">Result</h4>
                  <p>Eliminated manual content updates, improved consistency across the storefront, and enhanced overall user experience.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-blue-800 mb-3">What I Did</h4>
                  <ul className="list-disc list-inside space-y-2 text-xs">
                    <li>Customized Shopify themes using Liquid to improve navigation, product discovery, and overall user experience.</li>
                    <li>Built a dynamic content system using Shopify Metaobjects, enabling content to be scheduled by date directly from the admin panel.</li>
                    <li>Implemented logic to automatically display content based on the current date, including fallback mechanisms to ensure content is always shown.</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { src: '/images/nfsports-fear/bibleverses-rotation.jpg', label: 'DYNAMIC UI' },
                  { src: '/images/nfsports-fear/bibleverses-rotation2.jpg', label: 'METAOBJECTS SETUP' },
                  { src: '/images/nfsports-fear/bibleverses-rotation3.jpg', label: 'SCHEDULED ENTRIES' },
                  { src: '/images/nfsports-fear/bibleverses-rotation4.jpg', label: 'LIQUID LOGIC' },
                  { src: '/images/nfsports-fear/bibleverses-rotation5.jpg', label: 'FRONTEND PREVIEW' },
                  { src: '/images/nfsports-fear/search-bar-improvement.jpg', label: 'SEARCH UX' }
                ].map((img, idx) => (
                  <div key={idx} className="cursor-zoom-in group text-center" onClick={() => setSelectedImage(img.src)}>
                    <img src={img.src} className="rounded-lg border shadow-sm group-hover:opacity-90 transition h-32 w-full object-cover" alt={img.label} />
                    <p className="text-[8px] text-gray-400 mt-1 font-bold">{img.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROJECT 4: PERSONAL PORTFOLIO & CI/CD */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-1">🚀 Modern Portfolio & CI/CD Pipeline</h3>
              <p className="text-blue-600 font-bold text-sm tracking-widest uppercase">johnreyna.tech</p>
              <a href="https://johnreyna.tech" target="_blank" className="text-blue-500 text-xs hover:underline mt-2 inline-block">johnreyna.tech →</a>
            </div>
            <button onClick={() => toggleProject('portfolio')} className="w-full md:w-auto bg-blue-50 text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-100 transition-all shadow-sm">
              {expandedProject === 'portfolio' ? 'Close Case ▲' : 'Read Case ▼'}
            </button>
          </div>
          {expandedProject === 'portfolio' && (
            <div className="px-8 pb-10 border-t border-gray-100 pt-8 animate-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 text-sm leading-relaxed text-gray-700">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-red-600">The Objective</h4>
                  <p>Engineer a high-performance technical showcase with automated deployment workflows.</p>
                  <h4 className="text-lg font-bold text-green-600">Result</h4>
                  <p>A serverless, high-speed platform with 100% automated CI/CD via Vercel.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-blue-800 mb-3">Stack</h4>
                  <ul className="list-disc list-inside space-y-2 text-xs">
                    <li>Framework: Next.js 15 & TypeScript.</li>
                    <li>Deployment: GitHub CI/CD pipeline to Vercel.</li>
                    <li>UI: Tailwind CSS & Framer Motion.</li>
                  </ul>
                </div>
              </div>

              {/* HOME IMAGE WITH LIGHTBOX CLICK */}
              <div className="mt-8 mb-8 cursor-zoom-in group text-center" onClick={() => setSelectedImage('/images/johnreyna/home.jpg')}>
                <img 
                  src="/images/johnreyna/home.jpg" 
                  alt="johnreyna.tech Home" 
                  className="w-full max-w-2xl mx-auto rounded-xl border border-gray-200 shadow-xl group-hover:scale-[1.01] transition-transform duration-300"
                />
                <p className="text-[10px] text-gray-400 mt-3 font-mono uppercase tracking-widest italic">Click to view full size</p>
              </div>
              
              <div className="bg-blue-900 rounded-xl p-4 text-white font-mono text-[10px] overflow-hidden shadow-inner text-left">
                <p className="text-blue-300">// Automated Deployment Log</p>
                <p>✓ Optimization: Compiled successfully</p>
                <p>✓ GitHub Action: Triggered by push to (main)</p>
                <p>✓ Vercel: Deploying to johnreyna.tech...</p>
                <p className="text-green-400">✓ Production: Live</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- RESUME DOWNLOAD SECTION --- */}
      <div className="w-full max-w-lg p-10 bg-white border-2 border-blue-100 rounded-3xl shadow-2xl text-center mb-16">
        <h3 className="text-3xl font-bold mb-4">📄 Full Career History</h3>
        <a href="/John_Reyna_Resume.pdf" download className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded-2xl transition-all shadow-lg transform hover:-translate-y-1 text-lg">
          Download PDF Resume
        </a>
      </div>
      
    </div>
  );
}