// app/page.tsx
// Frontend: React Component with Tailwind CSS classes

export default function Home() {
  // Classes used: flex (layout), min-h-screen (full height), bg-gray-50 (light gray background)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">

      {/* Professional Header */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
        John Reyna
      </h1>
         <h2 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
        <span className="text-blue-600">Senior E-commerce Architect</span>
      </h2>

      {/* Professional Summary */}
      <p className="text-xl text-gray-600 mb-8 max-w-2xl text-center">
        Specialist in legacy system modernization, scalable architecture (Next.js, Headless WordPress), and technical leadership.
      </p>

      {/* AI Functionality Placeholder */}
      <div className="w-full max-w-lg p-6 bg-white border border-blue-200 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800">🤖 Ask My AI Agent</h2>
        <input 
          type="text" 
          placeholder="Ex: What was the sales increase at USA Tile & Marble?"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
        <button className="mt-4 w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-150">
          Consult My Experience
        </button>
      </div>
    </div>
  );
}