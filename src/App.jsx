import { motion } from "framer-motion";

export default function App() {
  return (
    // Background uses Noguchi Dark (#1e202c)
    <div className="min-h-screen bg-noguchi-dark text-white selection:bg-noguchi-purple/30 font-sans overflow-hidden relative">
      
      {/* Background Glow Blobs - Using Noguchi Purple and Light */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-noguchi-purple/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-noguchi-light/10 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-4xl mx-auto pt-24 px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          {/* Headline gradient uses Noguchi Light (#bfc0d1) */}
          <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-white via-noguchi-light to-noguchi-purple bg-clip-text text-transparent">
            kthxbai
          </h1>
          <p className="mt-5 text-noguchi-light/90 text-xl font-medium tracking-wide">
            developer // gamer // creator
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Large Featured Card - Noguchi Charcoal Base (#31323e) */}
          <motion.div 
            whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.2)' }}
            className="md:col-span-2 p-10 rounded-[3rem] bg-noguchi-charcoal/40 border border-noguchi-charcoal/60 backdrop-blur-3xl transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-3">Minecraft Server</h2>
            <p className="text-noguchi-light text-lg">Join the community. High performance, custom survival, zero lag.</p>
            <div className="mt-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
              {/* Status text uses Noguchi Purple accent */}
              <span className="text-noguchi-purple font-mono text-sm uppercase tracking-widest font-bold">Online: 12 Players</span>
            </div>
          </motion.div>

          {/* Social Card */}
          <motion.div 
            whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.2)' }}
            className="p-10 rounded-[3rem] bg-noguchi-charcoal/40 border border-noguchi-charcoal/60 backdrop-blur-3xl flex flex-col justify-between"
          >
            <h2 className="text-2xl font-bold">Discord</h2>
            {/* Link uses Noguchi Purple (#60519b) */}
            <a href="#" className="text-noguchi-purple hover:text-white transition-colors text-lg font-medium">Join Community →</a>
          </motion.div>

          {/* Project Card */}
          <motion.div 
            whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.2)' }}
            className="p-10 rounded-[3rem] bg-noguchi-charcoal/40 border border-noguchi-charcoal/60 backdrop-blur-3xl"
          >
            <h2 className="text-2xl font-bold mb-3">Projects</h2>
            <p className="text-noguchi-light text-base">Explore my latest React & Vite builds.</p>
          </motion.div>

        </div>
      </main>
    </div>
  );
}