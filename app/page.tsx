'use client'

import { useState, useEffect, useRef } from 'react'

type WindowKey = 'home' | 'experience' | 'cases' | 'skills' | 'education' | 'recruiter' | 'ai_chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayedText('')
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 12)

    return () => clearInterval(timer)
  }, [text])

  return <span>{displayedText}</span>
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [bootLogs, setBootLogs] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<WindowKey>('home')
  const [time, setTime] = useState('12:00 PM')
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'SYSTEM AI ASSISTANT INITIALIZED. Ask me anything about my experience in E-Commerce, CMS Governance, Agile, or AI Automations!' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    const logs = [
      'BIOS Version 2.0.01 - Turbo Architecture',
      'Initializing Node.js runtime & V8 engine...',
      'Loading Next.js 16 kernel (Turbopack compiler)...',
      'Mounting virtual filesystem (Rosetta Stone CMS)...',
      'Establishing secure connection to GitHub & Vercel...',
      'System Ready. Launching Executive OS with AI Assistant...'
    ]

    let current = 0
    const interval = setInterval(() => {
      if (current < logs.length) {
        setBootLogs((prev) => [...prev, logs[current]])
        current++
      } else {
        clearInterval(interval)
        setTimeout(() => setLoading(false), 300)
      }
    }, 250)

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userText = inputMessage.trim()
    const newMessages = [...messages, { role: 'user' as const, content: userText }]
    setMessages(newMessages)
    setInputMessage('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Connection error with AI Assistant. Contact me directly at john.rear@gmail.com." }])
    } finally {
      setIsTyping(false)
    }
  }

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
    <div className="min-h-screen bg-[#008080] text-black font-mono flex flex-col justify-between select-none overflow-x-hidden relative">
      
      {/* Background Retro Watermark */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 pointer-events-none opacity-20 hidden sm:flex space-y-2">
        <span className="text-[#004040] text-6xl font-black tracking-widest font-mono drop-shadow-[2px_2px_0px_rgba(255,255,255,0.3)]">JOHNREYNA.TECH</span>
        <span className="text-[#004040] text-sm font-bold tracking-widest font-mono">=== EXECUTIVE DIGITAL PLATFORM & WEB OPERATIONS OS ===</span>
      </div>

      {/* ========================================================= */}
      {/* MOBILE VIEW: BLACKBERRY EXECUTIVE PDA STYLE (EXACT FIT)    */}
      {/* ========================================================= */}
      <div className="block sm:hidden h-[100dvh] bg-[#1c1c1c] text-white p-2 flex flex-col justify-between font-sans overflow-hidden z-10">
        
        <div className="bg-[#111] border-b border-gray-800 px-3 py-1 flex justify-between items-center text-[10px] text-gray-400 font-mono shrink-0">
          <span>📶 EDGE // JOHN_REYNA_OS</span>
          <span>{time}</span>
          <span>🔋 100%</span>
        </div>

        <div className="bg-[#000080] text-white py-1.5 px-3 text-center border-b-2 border-white shadow-md shrink-0">
          <div className="text-xs font-bold text-yellow-300 tracking-wider">JOHN REYNA // PORTFOLIO</div>
          <div className="text-[9px] text-gray-200">Digital Platform & Web Operations Specialist</div>
        </div>

        <div className="flex-1 bg-white text-black p-2.5 my-1 overflow-y-auto space-y-2.5 border-2 border-gray-600 shadow-inner flex flex-col min-h-0">
          
          {activeWindow === 'home' && (
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 bg-gray-100 p-2 border border-gray-300">
                <img src="/john-reyna.webp" alt="John Reyna" className="w-12 h-12 object-cover border border-black shrink-0" />
                <div>
                  <div className="font-extrabold text-xs text-black">John Reyna</div>
                  <div className="text-[10px] text-blue-900 font-bold">Orlando, FL</div>
                </div>
              </div>
              <p className="text-gray-800 leading-tight text-[10px]">
                I am a digital platform and web operations specialist with 10 years of experience driving performance optimization, e-commerce solutions, and digital initiatives.
              </p>

              <div className="space-y-1 pt-1 border-t border-gray-300 font-mono">
                <div className="font-bold text-[9px] text-gray-600 uppercase">Directory / Navigation:</div>
                <div className="grid grid-cols-2 gap-1">
                  <button onClick={() => setActiveWindow('ai_chat')} className="p-2 bg-[#c0c0c0] text-black font-bold text-[10px] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left col-span-2 flex justify-between items-center shadow-sm">
                    <span>⚡ Chat with my AI Assistant</span><span className="text-[9px] bg-purple-900 text-white px-1">Open ↗</span>
                  </button>
                  <button onClick={() => setActiveWindow('experience')} className="p-1.5 bg-[#c0c0c0] text-black font-bold text-[10px] border border-black text-left">📁 Experience</button>
                  <button onClick={() => setActiveWindow('cases')} className="p-1.5 bg-[#c0c0c0] text-black font-bold text-[10px] border border-black text-left">🗂️ Cases</button>
                  <button onClick={() => setActiveWindow('skills')} className="p-1.5 bg-[#c0c0c0] text-black font-bold text-[10px] border border-black text-left">⚙️ Skills</button>
                  <button onClick={() => setActiveWindow('education')} className="p-1.5 bg-[#c0c0c0] text-black font-bold text-[10px] border border-black text-left">🎓 Education</button>
                </div>
                
                {/* Botón de descarga de PDF en móvil */}
                <a href="/John_Reyna_Resume.pdf" target="_blank" rel="noreferrer" className="block w-full p-1.5 bg-[#c0c0c0] text-black font-bold text-[10px] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-center shadow-sm">
                  📄 Download Resume (PDF)
                </a>

                <button onClick={() => setActiveWindow('recruiter')} className="w-full p-1.5 bg-yellow-200 text-blue-900 font-bold text-[10px] border border-black text-center">
                  ⭐ Recruiter Welcome Note
                </button>
              </div>

              <div className="pt-1 border-t border-gray-300 flex flex-col gap-0.5 text-[10px] font-bold font-mono">
                <a href="tel:6893192244" className="text-blue-700">📞 (689) 319-2244</a>
                <a href="https://wa.me/16893192244" className="text-emerald-700">💬 WhatsApp Direct</a>
                <a href="mailto:john.rear@gmail.com" className="text-blue-700">✉️ Email</a>
                <a href="https://linkedin.com/in/johnreyna" className="text-blue-700">💼 LinkedIn</a>
              </div>
            </div>
          )}

          {activeWindow === 'ai_chat' && (
            <div className="space-y-1.5 text-xs flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center border-b border-purple-900 pb-1 font-mono shrink-0">
                <span className="font-bold text-purple-900 text-[11px]">💬 AI Assistant</span>
                <button onClick={() => setActiveWindow('home')} className="px-2 py-0.5 bg-gray-200 border text-[10px] font-bold">X</button>
              </div>
              <div className="flex-1 bg-black text-green-400 p-2.5 overflow-y-auto space-y-2 font-mono text-[10px] border border-gray-700 min-h-0">
                {messages.map((m, idx) => (
                  <div key={idx} className={m.role === 'user' ? 'text-blue-300 text-right' : 'text-green-300'}>
                    <span className="font-bold">{m.role === 'user' ? 'USER > ' : 'JOHN_AI > '}</span>
                    {m.role === 'assistant' && idx === messages.length - 1 ? (
                      <TypewriterText text={m.content} />
                    ) : (
                      <span>{m.content}</span>
                    )}
                  </div>
                ))}
                {isTyping && <div className="text-yellow-400">Consulting my background...</div>}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-1 shrink-0 pt-1">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about my experience..."
                  className="flex-1 border border-gray-400 p-1 text-[10px] text-black font-mono bg-white"
                />
                <button type="submit" className="bg-purple-900 text-white px-2.5 py-1 font-bold text-[10px]">Send</button>
              </form>
              <button onClick={() => setActiveWindow('home')} className="w-full p-1 bg-gray-200 text-black font-bold border border-black font-mono text-center text-[10px] shrink-0">← Back to Menu</button>
            </div>
          )}

          {activeWindow === 'recruiter' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-blue-900 border-b pb-1 font-mono">⭐ Recruiter_Welcome.msg</div>
              <p className="text-[10px]"><strong>Hello and welcome to my portfolio! 🎯</strong></p>
              <p className="text-[10px]">If you are evaluating candidates who can lead e-commerce architecture, govern complex CMS platforms, and connect engineering directly with business outcomes, here is why I am an ideal fit:</p>
              <ul className="list-disc pl-4 space-y-1 text-[10px]">
                <li><strong>Proven Impact:</strong> 10 years optimizing multi-site e-commerce ecosystems and AI pipelines.</li>
                <li><strong>Availability:</strong> Based in Orlando, FL (Remote, hybrid, or onsite).</li>
              </ul>
              <button onClick={() => setActiveWindow('home')} className="w-full mt-1 p-1.5 bg-gray-200 text-black font-bold border border-black font-mono">← Back to Menu</button>
            </div>
          )}

          {activeWindow === 'experience' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-blue-900 border-b pb-1 font-mono">🏢 Work Experience</div>
              <div className="bg-gray-50 p-2 border border-gray-300 space-y-0.5">
                <div className="font-bold text-[#000080] text-[10px]">Web Platform & Digital Operations Consultant (2025–Present)</div>
                <p className="text-[10px] text-gray-800">Consulting for U.S. organizations. Technical delivery and governance for PHIL (AI SaaS at 201 Digital Group) managing GitHub, AWS, n8n automation, and Bricks/FastAPI. Shopify custom features at NF Sports.</p>
              </div>
              <div className="bg-gray-50 p-2 border border-gray-300 space-y-0.5">
                <div className="font-bold text-[#000080] text-[10px]">Web Platform Manager — USA Tile & Marble (2021–2025)</div>
                <p className="text-[10px] text-gray-800">Owned multi-site WooCommerce ecosystems, custom SF-to-box calculators, Rosetta Stone database, GA4, and SpeedSize optimization.</p>
              </div>
              <div className="bg-gray-50 p-2 border border-gray-300 space-y-0.5">
                <div className="font-bold text-[#000080] text-[10px]">WordPress Lead Dev — Chicago Code Monkeys (2013–2020)</div>
                <p className="text-[10px] text-gray-800">Led distributed developer teams across South America for concurrent WordPress/WooCommerce projects via Jira Agile.</p>
              </div>
              <button onClick={() => setActiveWindow('home')} className="w-full mt-1 p-1.5 bg-gray-200 text-black font-bold border border-black font-mono">← Back to Menu</button>
            </div>
          )}

          {activeWindow === 'cases' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-blue-900 border-b pb-1 font-mono">🚀 Case Studies & E-Commerce</div>
              <div className="bg-gray-50 p-2 border border-gray-300 space-y-0.5">
                <div className="font-bold text-[#000080] text-[10px]">USA Tile & Marble</div>
                <p className="text-[10px] text-gray-800">Multi-brand WooCommerce architecture, custom box calculators & Rosetta Stone data.</p>
                <a href="https://itilemosaic.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline block text-[10px]">itilemosaic.com ↗</a>
              </div>
              <div className="bg-gray-50 p-2 border border-gray-300 space-y-0.5">
                <div className="font-bold text-[#000080] text-[10px]">NF Sports & Fear The Lamb</div>
                <p className="text-[10px] text-gray-800">Shopify Liquid custom modules, predictive search, and subscription workflows.</p>
                <a href="https://nfsports.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline block text-[10px]">nfsports.com ↗</a>
              </div>
              <button onClick={() => setActiveWindow('home')} className="w-full mt-1 p-1.5 bg-gray-200 text-black font-bold border border-black font-mono">← Back to Menu</button>
            </div>
          )}

          {activeWindow === 'skills' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-blue-900 border-b pb-1 font-mono">🛠️ Core Competencies & Skills</div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-gray-50 p-1.5 border border-gray-300">
                  <div className="font-bold text-[#000080] text-[9px] mb-0.5">Platforms & CMS</div>
                  <p className="text-[9px] text-gray-800">WordPress, WooCommerce, Shopify Liquid, Bricks.</p>
                </div>
                <div className="bg-gray-50 p-1.5 border border-gray-300">
                  <div className="font-bold text-[#000080] text-[9px] mb-0.5">Development</div>
                  <p className="text-[9px] text-gray-800">PHP, JavaScript, HTML5, CSS3, REST APIs, FastAPI.</p>
                </div>
                <div className="bg-gray-50 p-1.5 border border-gray-300">
                  <div className="font-bold text-[#000080] text-[9px] mb-0.5">Automation & QA</div>
                  <p className="text-[9px] text-gray-800">n8n, Swagger, Git, GitHub, QA, ACF.</p>
                </div>
                <div className="bg-gray-50 p-2 border border-gray-300">
                  <div className="font-bold text-[#000080] text-[9px] mb-0.5">Operations</div>
                  <p className="text-[9px] text-gray-800">GA4, GTM, Jira, Agile, E-commerce Operations.</p>
                </div>
              </div>
              <button onClick={() => setActiveWindow('home')} className="w-full mt-1 p-1.5 bg-gray-200 text-black font-bold border border-black font-mono">← Back to Menu</button>
            </div>
          )}

          {activeWindow === 'education' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-blue-900 border-b pb-1 font-mono">🎓 Education & Credentials</div>
              <div className="bg-gray-50 p-2 border border-gray-300 space-y-0.5">
                <div className="font-bold text-[#000080] text-[10px]">Western Governors University</div>
                <p className="text-[10px] text-gray-800">Bachelor of Science in Software Engineering (2026–2028).</p>
              </div>
              <div className="bg-gray-50 p-2 border border-gray-300 space-y-0.5">
                <div className="font-bold text-[#000080] text-[10px]">Leonardo Da Vinci Institute</div>
                <p className="text-[10px] text-gray-800">Associate&apos;s Degree in Computer Science.</p>
              </div>
              <button onClick={() => setActiveWindow('home')} className="w-full mt-1 p-1.5 bg-gray-200 text-black font-bold border border-black font-mono">← Back to Menu</button>
            </div>
          )}
        </div>

        <div className="bg-[#111] p-1 text-center text-[9px] text-gray-400 border-t border-gray-800 font-mono shrink-0">
          BlackBerry Executive Edition // John Reyna OS
        </div>
      </div>


      {/* ========================================================= */}
      {/* DESKTOP VIEW: WINDOWS 2000 RETRO OS                     */}
      {/* ========================================================= */}
      <div className="hidden sm:flex flex-col justify-between min-h-screen z-10">
        <main className="flex-1 p-6 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
          
          <div className="w-full grid grid-cols-6 gap-3 mb-4 px-1">
            <button onClick={() => setActiveWindow('ai_chat')} className="flex flex-col items-center p-2 bg-[#c0c0c0] hover:bg-gray-300 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] cursor-pointer col-span-1 shadow-md active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white">
              <span className="text-2xl mb-1">⚡</span>
              <span className="text-black text-[10px] font-bold bg-[#c0c0c0] px-1 border border-black w-full text-center truncate">AI_Copilot</span>
            </button>
            <button onClick={() => setActiveWindow('experience')} className="flex flex-col items-center p-2 hover:bg-[#000080]/40 border border-transparent hover:border-dotted hover:border-white cursor-pointer">
              <span className="text-2xl mb-1">📁</span>
              <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black w-full text-center">Experience</span>
            </button>
            <button onClick={() => setActiveWindow('cases')} className="flex flex-col items-center p-2 hover:bg-[#000080]/40 border border-transparent hover:border-dotted hover:border-white cursor-pointer">
              <span className="text-2xl mb-1">🗂️</span>
              <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black w-full text-center">Cases</span>
            </button>
            <button onClick={() => setActiveWindow('skills')} className="flex flex-col items-center p-2 hover:bg-[#000080]/40 border border-transparent hover:border-dotted hover:border-white cursor-pointer">
              <span className="text-2xl mb-1">⚙️</span>
              <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black w-full text-center">Skills</span>
            </button>
            <button onClick={() => setActiveWindow('education')} className="flex flex-col items-center p-2 hover:bg-[#000080]/40 border border-transparent hover:border-dotted hover:border-white cursor-pointer">
              <span className="text-2xl mb-1">📄</span>
              <span className="text-white text-[10px] font-bold bg-[#000080] px-1 border border-black w-full text-center">Education</span>
            </button>
            <button onClick={() => setActiveWindow('recruiter')} className="flex flex-col items-center p-2 hover:bg-[#000080]/40 border border-transparent hover:border-dotted hover:border-white cursor-pointer">
              <span className="text-2xl mb-1">⭐</span>
              <span className="text-yellow-200 text-[10px] font-bold bg-[#800000] px-1 border border-black w-full text-center animate-pulse">Recruiter.msg</span>
            </button>
          </div>

          <div className="w-full bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] shadow-xl">
            <div className="bg-[#000080] px-2 py-1.5 flex justify-between items-center text-white font-bold text-xs">
              <div className="flex items-center gap-1.5"><span>💻</span><span>John_Reyna_System_Manager.exe</span></div>
              <div className="flex gap-1">
                <button onClick={() => setActiveWindow('home')} className="bg-[#c0c0c0] text-black px-2 border border-black text-xs font-extrabold">_</button>
                <button onClick={() => setActiveWindow('home')} className="bg-[#c0c0c0] text-black px-2 border border-black text-xs font-extrabold">X</button>
              </div>
            </div>

            <div className="bg-[#c0c0c0] px-2 py-1 border-b border-[#808080] text-[11px] flex gap-4 text-black">
              <span>File</span><span>Edit</span><span>View</span><span>Help</span>
            </div>

            <div className="p-6 bg-[#ffffff] text-black space-y-4 min-h-[560px] max-h-[760px] overflow-y-auto border-2 border-inset border-[#808080] m-2">
              
              {activeWindow === 'ai_chat' && (
                <div className="space-y-4 font-mono flex flex-col h-[520px]">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <h2 className="font-extrabold text-sm text-purple-900">💬 AI Assistant (Interactive Knowledge Base)</h2>
                    <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close [X]</button>
                  </div>
                  
                  <div className="flex-1 bg-black text-green-400 p-4 overflow-y-auto space-y-3 text-xs border-2 border-inset border-gray-600 shadow-inner">
                    {messages.map((m, idx) => (
                      <div key={idx} className={m.role === 'user' ? 'text-blue-300 text-right' : 'text-green-300'}>
                        <span className="font-bold">{m.role === 'user' ? 'USER > ' : 'JOHN_AI > '}</span>
                        {m.role === 'assistant' && idx === messages.length - 1 ? (
                          <TypewriterText text={m.content} />
                        ) : (
                          <span>{m.content}</span>
                        )}
                      </div>
                    ))}
                    {isTyping && <div className="text-yellow-400">Consulting my professional background...</div>}
                    <div ref={chatEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me about my experience or projects..."
                      className="flex-1 border-2 border-gray-500 p-2.5 text-xs text-black font-mono bg-gray-50"
                    />
                    <button type="submit" className="bg-purple-900 text-white px-5 py-2.5 font-bold text-xs hover:bg-purple-800">Send Query</button>
                  </form>

                  <div className="text-center pt-1">
                    <button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back to Desktop</button>
                  </div>
                </div>
              )}

              {activeWindow === 'home' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-6 bg-[#f5f5f5] p-4 border border-gray-400">
                    <img src="/john-reyna.webp" alt="John Reyna" className="w-28 h-28 object-cover border-2 border-black shrink-0" />
                    <div className="space-y-2 w-full">
                      <div className="bg-[#000080] text-white px-2 py-0.5 text-[11px] inline-block font-bold">Digital Platform & Web Operations Specialist</div>
                      <h1 className="text-2xl font-extrabold text-black">John Reyna</h1>
                      <p className="text-sm text-gray-800 font-sans leading-relaxed">
                        I am a digital platform and web operations specialist with 10 years of experience driving performance optimization, e-commerce solutions, and digital initiatives.
                      </p>
                      <div className="text-[11px] font-bold text-gray-700 flex items-center gap-x-3 pt-1 border-t border-gray-300">
                        <span>📍 Orlando, FL</span><span>•</span>
                        <a href="tel:6893192244" className="text-blue-700 hover:underline">📞 (689) 319-2244</a><span>•</span>
                        <a href="https://wa.me/16893192244" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">💬 WhatsApp</a><span>•</span>
                        <a href="mailto:john.rear@gmail.com" className="text-blue-700 hover:underline">✉️ Email</a><span>•</span>
                        <a href="https://linkedin.com/in/johnreyna" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">💼 LinkedIn</a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">📁 SELECT DIRECTORY / SECTION:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setActiveWindow('ai_chat')} className="p-3 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center col-span-2 shadow-md">
                        <span className="text-black font-bold">⚡ Chat with my AI Assistant ➔ Ask me anything!</span><span className="text-white bg-[#000080] px-2 py-0.5 border border-black text-[10px]">Launch 🚀</span>
                      </button>
                      <button onClick={() => setActiveWindow('experience')} className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center">
                        <span>🏢 Work Experience & Leadership</span><span className="text-[10px] bg-white px-1 border">Open</span>
                      </button>
                      <button onClick={() => setActiveWindow('cases')} className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center">
                        <span>🚀 Case Studies & E-Commerce</span><span className="text-[10px] bg-white px-1 border">Open</span>
                      </button>
                      <button onClick={() => setActiveWindow('skills')} className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center">
                        <span>🛠️ Core Competencies Matrix</span><span className="text-[10px] bg-white px-1 border">Open</span>
                      </button>
                      <button onClick={() => setActiveWindow('education')} className="p-2.5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-left hover:bg-gray-300 font-bold text-xs flex justify-between items-center">
                        <span>🎓 Education & Credentials</span><span className="text-[10px] bg-white px-1 border">Open</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 pt-2">
                    <a href="/John_Reyna_Resume.pdf" target="_blank" rel="noreferrer" className="px-3 py-2 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-xs font-bold hover:bg-gray-300">📄 Download Resume (PDF)</a>
                    <a href="https://wa.me/16893192244" target="_blank" rel="noreferrer" className="px-3 py-2 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-xs font-bold text-emerald-900 hover:bg-gray-300">💬 WhatsApp Direct</a>
                    <button onClick={() => setActiveWindow('recruiter')} className="px-3 py-2 bg-yellow-100 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-xs font-bold text-blue-900">⭐ Recruiter Welcome Note</button>
                  </div>
                </div>
              )}

              {activeWindow === 'recruiter' && (
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <h2 className="font-extrabold text-sm text-[#000080]">⭐ Recruiter_Welcome.msg (Direct Brief)</h2>
                    <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close [X]</button>
                  </div>
                  <div className="bg-[#ffffe1] p-4 border border-gray-400 space-y-3 text-sm text-gray-900 shadow-inner">
                    <p className="font-bold text-blue-900 text-base">Hello, Hiring Manager! 🎯</p>
                    <p>If you are evaluating candidates who can lead e-commerce architecture, govern complex CMS platforms, and connect engineering directly with business outcomes, here is why I am an excellent addition to your team:</p>
                    <p><strong>Why I am a strong fit:</strong></p>
                    <ul className="list-disc pl-4 space-y-1.5">
                      <li><strong>Proven Impact:</strong> Direct ownership of large-scale multi-site e-commerce ecosystems, custom purchasing workflows, and AI automation pipelines.</li>
                      <li><strong>Strategic Availability:</strong> Based in Orlando, FL, fully available for remote, hybrid, or onsite collaboration.</li>
                      <li><strong>End-to-End Ownership:</strong> From custom PHP and Shopify Liquid to cloud governance and cross-functional Agile leadership.</li>
                    </ul>
                    <div className="flex flex-wrap gap-3 font-bold text-xs pt-2 border-t border-gray-300">
                      <a href="tel:6893192244" className="text-blue-700 hover:underline">📞 (689) 319-2244</a>
                      <a href="https://wa.me/16893192244" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">💬 WhatsApp Direct</a>
                      <a href="mailto:john.rear@gmail.com" className="text-blue-700 hover:underline">✉️ Email</a>
                    </div>
                  </div>
                  <div className="text-center pt-2"><button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back to Desktop</button></div>
                </div>
              )}

              {activeWindow === 'experience' && (
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <h2 className="font-extrabold text-sm text-[#000080]">🏢 Work Experience & Leadership</h2>
                    <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300">
                      <div className="font-bold text-[#000080]">Web Platform & Digital Operations Consultant (Oct 2025–Present)</div>
                      <p className="text-gray-800 text-xs">
                        Providing ongoing consulting services to U.S.-based organizations across web platforms, e-commerce, automation, and digital operations. Direct technical delivery and governance for PHIL (multi-tenant AI SaaS platform at 201 Digital Group) managing GitHub, AWS, access controls, n8n automation, frontend Bricks/WordPress/FastAPI, and Swagger validation. Developed custom Shopify Liquid features, responsive landing pages, and subscription-flow optimization at NF Sports.
                      </p>
                    </div>
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300">
                      <div className="font-bold text-[#000080]">Web Platform Manager — USA Tile and Marble, Miami, FL (Jan 2021–Jul 2025)</div>
                      <p className="text-gray-800 text-xs">
                        Owned and optimized multi-site WooCommerce ecosystems supporting multiple brands with shared inventory across online and physical showrooms. Engineered custom square-feet (SF) to box calculators on product pages carrying values through cart (cart.php), checkout, and confirmation emails. Built centralized Rosetta Stone database for product data, SKUs, and SEO metadata. Managed GA4, Google Ads, Merchant Center feeds, and SpeedSize Core Web Vitals optimization.
                      </p>
                    </div>
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300">
                      <div className="font-bold text-[#000080]">WordPress Lead Developer — Chicago Code Monkeys, Chicago, IL (Jan 2013–Dec 2020)</div>
                      <p className="text-gray-800 text-xs">
                        Led distributed developer teams across South America for concurrent WordPress/WooCommerce projects via Jira Agile workflows, CRM integrations, and reliable production launches.
                      </p>
                    </div>
                  </div>
                  <div className="text-center pt-2"><button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button></div>
                </div>
              )}

              {activeWindow === 'cases' && (
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <h2 className="font-extrabold text-sm text-[#000080]">🚀 Case Studies & E-Commerce</h2>
                    <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300 flex justify-between items-center">
                      <div><div className="font-bold text-[#000080]">USA Tile & Marble</div><p className="text-gray-800 text-xs">Multi-brand WooCommerce architecture, SF box calculator, custom cart/checkout hooks, ACF, WP Sheet Editor & Rosetta Stone data architecture.</p></div>
                      <a href="https://itilemosaic.com" target="_blank" rel="noreferrer" className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold shrink-0">Visit ↗</a>
                    </div>
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300 flex justify-between items-center">
                      <div><div className="font-bold text-[#000080]">NF Sports & Fear The Lamb</div><p className="text-gray-800 text-xs">Shopify Liquid custom storefront modules, predictive search, and subscription workflows.</p></div>
                      <a href="https://nfsports.com" target="_blank" rel="noreferrer" className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold shrink-0">Visit ↗</a>
                    </div>
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300 flex justify-between items-center">
                      <div><div className="font-bold text-[#000080]">PHIL AI SaaS Platform</div><p className="text-gray-800 text-xs">FastAPI backend integration, Swagger validation & n8n workflow automation.</p></div>
                      <a href="https://visionbridgelogistics.com" target="_blank" rel="noreferrer" className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold shrink-0">Visit ↗</a>
                    </div>
                  </div>
                  <div className="text-center pt-2"><button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button></div>
                </div>
              )}

              {activeWindow === 'skills' && (
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <h2 className="font-extrabold text-sm text-[#000080]">🛠️ Core Competencies & Tooling</h2>
                    <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300">
                      <div className="font-bold text-[#000080] mb-1 text-xs">Platforms & CMS</div>
                      <p className="text-gray-800 text-xs">WordPress, WooCommerce, Shopify Liquid, Bricks Builder.</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300">
                      <div className="font-bold text-[#000080] mb-1 text-xs">Development & Languages</div>
                      <p className="text-gray-800 text-xs">PHP, JavaScript, HTML5, CSS3, REST APIs, FastAPI.</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300">
                      <div className="font-bold text-[#000080] mb-1 text-xs">Automation & QA</div>
                      <p className="text-gray-800 text-xs">n8n, Swagger, Git, GitHub, Quality Assurance, ACF.</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-3 border border-gray-300">
                      <div className="font-bold text-[#000080] mb-1 text-xs">Operations & Analytics</div>
                      <p className="text-gray-800 text-xs">Google Analytics 4, Google Tag Manager, Jira, Agile, Web Ops.</p>
                    </div>
                  </div>
                  <div className="text-center pt-2"><button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button></div>
                </div>
              )}

              {activeWindow === 'education' && (
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <h2 className="font-extrabold text-sm text-[#000080]">🎓 Education & Credentials</h2>
                    <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-[#c0c0c0] border text-xs font-bold font-mono">Close</button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                      <div className="font-bold text-[#000080]">Western Governors University</div>
                      <p className="text-gray-700 text-[11px]">Bachelor of Science in Software Engineering, 2026 – Expected 2028.</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                      <div className="font-bold text-[#000080]">Instituto Privado Leonardo Da Vinci</div>
                      <p className="text-gray-700 text-[11px]">Associate&apos;s Degree in Computer Science (Credential evaluation by Josef Silny & Associates).</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-2.5 border border-gray-300">
                      <div className="font-bold text-[#000080]">Certifications</div>
                      <p className="text-gray-700 text-[11px]">
                        • Google AI Essentials — Google, Sep 2025<br/>
                        • Solving Problems with Creative and Critical Thinking — IBM, Feb 2026
                      </p>
                    </div>
                  </div>
                  <div className="text-center pt-2"><button onClick={() => setActiveWindow('home')} className="px-4 py-1.5 bg-[#c0c0c0] border-2 text-xs font-bold font-mono">&lt;&lt; Back</button></div>
                </div>
              )}
            </div>

            <div className="bg-[#c0c0c0] px-2 py-1 border-t border-white text-[11px] text-gray-800 flex justify-between">
              <span>Status: Ready</span>
              <span>Available for remote, hybrid or onsite positions</span>
            </div>
          </div>
        </main>

        <footer className="w-full bg-[#c0c0c0] border-t-2 border-white px-1 py-1 flex items-center justify-between text-xs z-40">
          <div className="flex items-center gap-1">
            <button onClick={() => setActiveWindow('home')} className="px-2.5 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] font-bold flex items-center gap-1 text-xs"><span>🪟</span> <span>Start</span></button>
            <div className="h-5 w-[1px] bg-gray-500 mx-1"></div>
            <div className="flex gap-1">
              <button onClick={() => setActiveWindow('home')} className="px-2 py-1 bg-white border border-[#404040] text-[10px] font-bold truncate max-w-[90px]">Desktop</button>
              <button onClick={() => setActiveWindow('ai_chat')} className="px-2 py-1 bg-purple-200 border border-purple-800 text-[10px] font-bold truncate max-w-[90px]">💬 AI Copilot</button>
            </div>
          </div>
          <div className="flex items-center gap-2 px-1">
            <div className="border border-[#404040] px-2 py-0.5 bg-[#f0f0f0] flex items-center gap-2 text-[11px]">
              <span>📞 <a href="tel:6893192244" className="hover:underline">(689) 319-2244</a></span>
              <span>💬 <a href="https://wa.me/16893192244" target="_blank" rel="noreferrer" className="text-emerald-800 font-bold hover:underline">WhatsApp</a></span>
              <span className="border-l border-gray-400 pl-1">{time}</span>
            </div>
          </div>
        </footer>
      </div>

    </div>
  )
}