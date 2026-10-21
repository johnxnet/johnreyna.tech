'use client'

import { useState, useEffect } from 'react'

type WindowKey = 'home' | 'experience' | 'cases' | 'skills' | 'education' | 'recruiter'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [bootLogs, setBootLogs] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<WindowKey>('home')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [time, setTime] = useState('12:00 PM')

  useEffect(() => {
    const logs = [
      'BIOS Version 2.0.01 - Turbo Architecture',
      'Initializing Node.js runtime & V8 engine...',
      'Loading Next.js 16 kernel (Turbopack compiler)...',
      'Mounting virtual filesystem (Rosetta Stone CMS)...',
      'Establishing secure connection to GitHub & Vercel...',
      'System Ready. Launching Win2000 Desktop GUI...'
    ]

    let current = 0
    const interval = setInterval(() => {
      if (current < logs.length) {
        setBootLogs((prev) => [...prev, logs[current]])
        current++
      } else {
        clearInterval(interval)
        setTimeout(() => setLoading(false), 500)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-6 flex flex-col justify-center max-w-lg mx-auto">
        <div className="space-y-2">
          <div className="text-white font-bold mb-4">=== JOHN REYNA KERNEL BOOT ===</div>
          {bootLogs.map((log, index) => (
            <div key={index} className="text-xs">
              <span className="text-blue-400">[OK]</span> {log}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#008080] text-black font-mono flex flex-col justify-between select-none overflow-x-hidden">
      
      {/* MOBILE HEADER */}
      <header className="bg-[#000080] text-white px-3 py-2 flex justify-between items-center text-xs border-b-2 border-white md:hidden">
        <span className="font-bold">💻 John_Reyna_OS</span>
        <span>{time}</span>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-2 sm:p-6 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        
        {/* DESKTOP ICON GRID */}
        <div className="w-full grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 mb-4 px-1">
          <button
            onClick={() => setActiveWindow('experience')}
            className="flex flex-col items-center p-2 bg-black/20 sm:bg-transparent hover:bg-[#000080]/40 border border-white/20 sm:border-transparent cursor-pointer"
          >
            <span className="text-2xl mb-1">📁</span>
            <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black truncate w-full text-center">Experience</span>
          </button>

          <button
            onClick={() => setActiveWindow('cases')}
            className="flex flex-col items-center p-2 bg-black/20 sm:bg-transparent hover:bg-[#000080]/40 border border-white/20 sm:border-transparent cursor-pointer"
          >
            <span className="text-2xl mb-1">🗂️</span>
            <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black truncate w-full text-center">Cases</span>
          </button>

          <button
            onClick={() => setActiveWindow('skills')}
            className="flex flex-col items-center p-2 bg-black/20 sm:bg-transparent hover:bg-[#000080]/40 border border-white/20 sm:border-transparent cursor-pointer"
          >
            <span className="text-2xl mb-1">⚙️</span>
            <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black truncate w-full text-center">Skills</span>
          </button>

          <button
            onClick={() => setActiveWindow('education')}
            className="flex flex-col items-center p-2 bg-black/20 sm:bg-transparent hover:bg-[#000080]/40 border border-white/20 sm:border-transparent cursor-pointer"
          >
            <span className="text-2xl mb-1">📄</span>
            <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black truncate w-full text-center">Education</span>
          </button>

          <button
            onClick={() => setActiveWindow('recruiter')}
            className="flex flex-col items-center p-2 bg-black/20 sm:bg-transparent hover:bg-[#000080]/40 border border-white/20 sm:border-transparent cursor-pointer col-span-3 sm:col-span-1"
          >
            <span className="text-2xl mb-1">⭐</span>
            <span className="text-yellow-200 text-[10px] font-bold bg-[#800000] px-1 border border-black truncate w-full text-center animate-pulse">Recruiter.msg</span>
          </button>
        </div>

        {/* WINDOW CONTAINER */}
        <div className="w-full bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] shadow-xl">
          
          {/* WINDOW TITLE BAR */}
          <div className="bg-[#000080] px-2 py-1.5 flex justify-between items-center text-white font-bold text-xs">
            <div className="flex items-center gap-1.5 truncate">
              <span>💻</span>
              <span className="truncate">John_Reyna_System_Manager.exe</span>
            </div>
            <div className="flex gap-1 shrink-0">
              <button 
                onClick={() => setActiveWindow('home')}
                className="bg-[#c0c0c0] text-black px-2 border border-black text-xs font-extrabold"
              >
                _
              </button>
              <button 
                onClick={() => setActiveWindow('home')}
                className="bg-[#c0c0c0] text-black px-2 border border-black text-xs font-extrabold"
              >
                X
              </button>
            </div>
          </div>

          {/* MENU BAR */}
          <div className="bg-[#c0c0c0] px-2 py-1 border-b border-[#808080] text-[11px] hidden sm:flex gap-4 text-black">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Help</span>
          </div>

          {/* WINDOW CONTENT AREA */}
          <div className="p-3 sm:p-6 bg-[#ffffff] text-black space-y-4 min-h-[360px] max-h-[70vh] overflow-y-auto border-2 border-inset border-[#808080] m-1 sm:m-2">

            {/* HOME VIEW */}
            {activeWindow === 'home' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#f5f5f5] p-3 border border-gray-400">
                  <img
                    src="/john-reyna.webp"
                    alt="John Reyna"
                    className="w-20 h-20 sm:w-28 sm:h-28 object-cover border-2 border-black shrink-0"
                  />
                  <div className="space-y-2 text-center sm:text-left w-full">
                    <div className="bg-[#000080] text-white px-2 py-0.5 text-[11px] inline-block font-bold">
                      Digital Platform & Web Operations Specialist
                    </div>
                    <h1 className="text-lg sm:text-2xl font-extrabold text-black">
                      John Reyna
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-800 font-sans leading-relaxed">
                      10+ years driving e-commerce optimization, shopping experiences, multi-site CMS governance, and cross-functional agile delivery.
                    </p>
                    
                    {/* CLICKEABLE CONTACT INFO BAR */}
                    <div className="text-[11px] font-bold text-gray-700 flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 pt-1 border-t border-gray-300">
                      <span>📍 Orlando, FL</span>
                      <span>•</span>
                      <a href="tel:6893192244" className="text-blue-700 hover:underline">📞 (689) 319-2244</a>
                      <span>•</span>
                      <a href="https://wa.me/16893192244" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">💬 WhatsApp</a>
                      <span>•</span>
                      <a href="mailto:john.rear@gmail.com" className="text-blue-700 hover:underline">✉️ Email</a>
                      <span>•</span>
                      <a href="https://linkedin.com/in/johnreyna" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">💼 LinkedIn</a>
                    </div>
                  </div>
                </div>

                {/* DIRECTORY BUTTONS */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    📁 SELECT DIRECTORY / SECTION:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveWindow('experience')}
                      className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center"
                    >
                      <span>🏢 Work Experience & Leadership</span>
                      <span className="text-[10px] bg-white px-1 border">Open</span>
                    </button>

                    <button
                      onClick={() => setActiveWindow('cases')}
                      className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center"
                    >
                      <span>🚀 Case Studies & E-Commerce</span>
                      <span className="text-[10px] bg-white px-1 border">Open</span>
                    </button>

                    <button
                      onClick={() => setActiveWindow('skills')}
                      className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center"
                    >
                      <span>🛠️ Core Competencies Matrix</span>
                      <span className="text-[10px] bg-white px-1 border">Open</span>
                    </button>

                    <button
                      onClick={() => setActiveWindow('education')}
                      className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center"
                    >
                      <span>🎓 Education & Credentials</span>
                      <span className="text-[10px] bg-white px-1 border">Open</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-2 pt-2">
                  <a
                    href="/John_Reyna_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-xs font-bold text-center hover:bg-gray-300"
                  >
                    📄 Download Resume (PDF)
                  </a>
                  <a
                    href="https://wa.me/16893192244"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-xs font-bold text-center text-emerald-900 hover:bg-gray-300"
                  >
                    💬 WhatsApp Direct
                  </a>
                  <button
                    onClick={() => setActiveWindow('recruiter')}
                    className="px-3 py-2 bg-yellow-100 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-xs font-bold text-center text-blue-900 animate-pulse"
                  >
                    ⭐ Recruiter Welcome Note
                  </button>
                </div>
              </div>
            )}

            {/* RECRUITER WELCOME NOTE */}
            {activeWindow === 'recruiter' && (
              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-center border-b border-black pb-2">
                  <h2 className="font-extrabold text-xs sm:text-sm text-[#000080]">⭐ Recruiter_Welcome.msg (Direct Brief)</h2>
                  <button 
                    onClick={() => setActiveWindow('home')}
                    className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono"
                  >
                    Close [X]
                  </button>
                </div>

                <div className="bg-[#ffffe1] p-4 border border-gray-400 space-y-3 text-xs sm:text-sm text-gray-900 shadow-inner font-sans">
                  <p className="font-bold text-blue-900">
                    Hello! Welcome to my interactive portfolio.
                  </p>
                  <p>
                    If you are reviewing my profile for a Product, E-Commerce, or Web Operations role, here is why I am an immediate fit for your team:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Strategic Location:</strong> Based in Orlando / Celebration, FL[cite: 6], fully available for hybrid, on-site, or remote collaboration.</li>
                    <li><strong>Proven Track Record:</strong> 10+ years driving large-scale e-commerce, multi-site CMS governance, promotional rules, and product delivery.</li>
                    <li><strong>Cross-Functional Alignment:</strong> Experienced in bridging Marketing, Revenue, Legal, Design, and Engineering stakeholders.</li>
                  </ul>
                  <p className="pt-2 border-t border-yellow-300 font-semibold text-gray-800">
                    Let&apos;s connect directly:
                  </p>
                  <div className="flex flex-wrap gap-3 font-bold text-xs">
                    <a href="tel:6893192244" className="text-blue-700 hover:underline">📞 (689) 319-2244</a>
                    <a href="https://wa.me/16893192244" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">💬 WhatsApp</a>
                    <a href="mailto:john.rear@gmail.com" className="text-blue-700 hover:underline">✉️ Email</a>
                    <a href="https://linkedin.com/in/johnreyna" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">💼 LinkedIn</a>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">
                    &lt;&lt; Back to Desktop
                  </button>
                </div>
              </div>
            )}

            {/* EXPERIENCE VIEW */}
            {activeWindow === 'experience' && (
              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-center border-b border-black pb-2">
                  <h2 className="font-extrabold text-xs sm:text-sm text-[#000080]">🏢 Work Experience</h2>
                  <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-[#f9f9f9] p-3 border border-gray-300 space-y-1">
                    <div className="font-bold text-[#000080]">Web Platform & Digital Operations Consultant (2025–Present)</div>
                    <p className="text-gray-800 text-xs">Technical delivery for PHIL AI SaaS (201 Digital Group) and Shopify feature development at NF Sports.</p>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 border border-gray-300 space-y-1">
                    <div className="font-bold text-[#000080]">Web Platform Manager — USA Tile & Marble (2021–2025)</div>
                    <p className="text-gray-800 text-xs">Managed multi-site WooCommerce ecosystems, checkout rules, and &ldquo;Rosetta Stone&rdquo; centralized CMS architecture.</p>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 border border-gray-300 space-y-1">
                    <div className="font-bold text-[#000080]">WordPress Lead Developer — Chicago Code Monkeys (2013–2020)</div>
                    <p className="text-gray-800 text-xs">Led distributed developer teams across South America, managing Jira agile workflows.</p>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button>
                </div>
              </div>
            )}

            {/* CASES VIEW */}
            {activeWindow === 'cases' && (
              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-center border-b border-black pb-2">
                  <h2 className="font-extrabold text-xs sm:text-sm text-[#000080]">🚀 Case Studies</h2>
                  <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-[#f9f9f9] p-3 border border-gray-300 flex justify-between items-center gap-2">
                    <div>
                      <div className="font-bold text-[#000080]">USA Tile & Marble</div>
                      <p className="text-gray-800 text-[11px]">Centralized product governance & checkout optimization.</p>
                    </div>
                    <a href="https://itilemosaic.com" target="_blank" rel="noreferrer" className="px-2 py-1 bg-[#c0c0c0] border text-[11px] font-bold shrink-0">Visit ↗</a>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 border border-gray-300 flex justify-between items-center gap-2">
                    <div>
                      <div className="font-bold text-[#000080]">NF Sports & Fear The Lamb</div>
                      <p className="text-gray-800 text-[11px]">Shopify Liquid custom modules & subscription flows.</p>
                    </div>
                    <a href="https://nfsports.com" target="_blank" rel="noreferrer" className="px-2 py-1 bg-[#c0c0c0] border text-[11px] font-bold shrink-0">Visit ↗</a>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 border border-gray-300 flex justify-between items-center gap-2">
                    <div>
                      <div className="font-bold text-[#000080]">PHIL AI SaaS Platform</div>
                      <p className="text-gray-800 text-[11px]">FastAPI integration & n8n automation.</p>
                    </div>
                    <a href="https://visionbridgelogistics.com" target="_blank" rel="noreferrer" className="px-2 py-1 bg-[#c0c0c0] border text-[11px] font-bold shrink-0">Visit ↗</a>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button>
                </div>
              </div>
            )}

            {/* SKILLS VIEW */}
            {activeWindow === 'skills' && (
              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-center border-b border-black pb-2">
                  <h2 className="font-extrabold text-xs sm:text-sm text-[#000080]">🛠️ Core Competencies</h2>
                  <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                    <div className="font-bold text-[#000080]">E-Commerce & CMS</div>
                    <p className="text-gray-700 text-[11px]">WooCommerce, Shopify Liquid, WordPress, ACF.</p>
                  </div>
                  <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                    <div className="font-bold text-[#000080]">Product & Agile QA</div>
                    <p className="text-gray-700 text-[11px]">Jira Sprints, User Stories, End-to-End QA.</p>
                  </div>
                  <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                    <div className="font-bold text-[#000080]">APIs & AI Stack</div>
                    <p className="text-gray-700 text-[11px]">REST APIs, Swagger, n8n, Next.js 16, TypeScript.</p>
                  </div>
                  <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                    <div className="font-bold text-[#000080]">Analytics & CRO</div>
                    <p className="text-gray-700 text-[11px]">GA4, Google Tag Manager, Hotjar Heatmaps.</p>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button>
                </div>
              </div>
            )}

            {/* EDUCATION VIEW */}
            {activeWindow === 'education' && (
              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-center border-b border-black pb-2">
                  <h2 className="font-extrabold text-xs sm:text-sm text-[#000080]">🎓 Education & Credentials</h2>
                  <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                    <div className="font-bold text-[#000080]">Western Governors University (WGU)</div>
                    <p className="text-gray-700 text-[11px]">B.S. in Software Engineering (2026 – Expected 2028).</p>
                  </div>
                  <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                    <div className="font-bold text-[#000080]">Instituto Privado Leonardo Da Vinci</div>
                    <p className="text-gray-700 text-[11px]">Associate&apos;s Degree in Computer Science.</p>
                  </div>
                  <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                    <div className="font-bold text-[#000080]">Certifications</div>
                    <p className="text-gray-700 text-[11px]">&bull; IBM: Creative & Critical Thinking | Google AI Essentials.</p>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button>
                </div>
              </div>
            )}

          </div>

          {/* STATUS BAR */}
          <div className="bg-[#c0c0c0] px-2 py-1 border-t border-white text-[10px] sm:text-[11px] text-gray-800 flex justify-between">
            <span>Status: Ready</span>
            <span>Available for remote, hybrid or onsite positions</span>
          </div>

        </div>
      </main>

      {/* TASKBAR */}
      <footer className="w-full bg-[#c0c0c0] border-t-2 border-white px-1 py-1 flex items-center justify-between text-xs z-40">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setActiveWindow('home')}
            className="px-2.5 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] font-bold flex items-center gap-1 text-xs"
          >
            <span>🪟</span> <span>Start</span>
          </button>
          
          <div className="hidden sm:block h-5 w-[1px] bg-gray-500 mx-1"></div>

          <div className="flex gap-1">
            <button
              onClick={() => setActiveWindow('home')}
              className="px-2 py-1 bg-white border border-[#404040] text-[10px] font-bold truncate max-w-[90px]"
            >
              Desktop
            </button>
            <button
              onClick={() => setActiveWindow('recruiter')}
              className="px-2 py-1 bg-yellow-100 border border-[#404040] text-[10px] font-bold truncate max-w-[110px]"
            >
              ⭐ Note.msg
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-1">
          <div className="border border-[#404040] px-2 py-0.5 bg-[#f0f0f0] flex items-center gap-2 text-[10px] sm:text-[11px]">
            <span>📞 <a href="tel:6893192244" className="hover:underline">(689) 319-2244</a></span>
            <span className="hidden sm:inline">💬 <a href="https://wa.me/16893192244" target="_blank" rel="noreferrer" className="text-emerald-800 font-bold hover:underline">WhatsApp</a></span>
            <span className="border-l border-gray-400 pl-1">{time}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}