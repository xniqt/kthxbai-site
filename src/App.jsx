import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-purple-500/30 font-sans overflow-hidden">
      
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      <main className="max-w-4xl mx-auto pt-24 px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            kthxbai
          </h1>
          <p className="mt-4 text-gray-400 text-lg font-medium tracking-wide">
            developer // gamer // creator
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Large Featured Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="md:col-span-2 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-white/[0.08] transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2">Minecraft Server</h2>
            <p className="text-gray-400">Join the community. High performance, zero lag, custom survival.</p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-green-400 font-mono text-sm uppercase tracking-widest">Online: 12 Players</span>
            </div>
          </motion.div>

          {/* Small Social/Status Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold">Discord</h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Join →</a>
          </motion.div>

          {/* Project Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl"
          >
            <h2 className="text-xl font-bold mb-2">Projects</h2>
            <p className="text-sm text-gray-400">View my latest React builds.</p>
          </motion.div>

        </div>
      </main>
    </div>
  );
}