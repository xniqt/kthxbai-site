import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-noguchi-dark text-white selection:bg-noguchi-purple/30 font-sans tracking-tight overflow-hidden relative">
      
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-noguchi-purple/15 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-noguchi-light/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-4xl mx-auto pt-32 px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-noguchi-light bg-clip-text text-transparent italic">
            kthxbai
          </h1>
          <p className="mt-4 text-noguchi-light/70 text-lg font-light tracking-[0.2em] uppercase">
            Systems // Interface // Gaming
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Card */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(191, 192, 209, 0.3)' }}
            className="md:col-span-8 p-10 rounded-[3rem] bg-noguchi-charcoal/30 border border-noguchi-charcoal/50 backdrop-blur-3xl transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-12">
               <h2 className="text-3xl font-bold tracking-tight">Minecraft Server</h2>
               <div className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-green-500 font-mono text-[10px] uppercase font-bold">Live</span>
               </div>
            </div>
            <p className="text-noguchi-light/80 text-xl leading-relaxed max-w-md">
              Custom survival experience with a focus on performance and community-driven updates.
            </p>
          </motion.div>

          {/* Social Card */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(191, 192, 209, 0.3)' }}
            className="md:col-span-4 p-10 rounded-[3rem] bg-noguchi-charcoal/30 border border-noguchi-charcoal/50 backdrop-blur-3xl flex flex-col justify-between group"
          >
            <h2 className="text-2xl font-bold tracking-tight">Discord</h2>
            <a href="#" className="w-12 h-12 rounded-full bg-noguchi-purple flex items-center justify-center self-end group-hover:scale-110 transition-transform">
              <span className="text-2xl">→</span>
            </a>
          </motion.div>

        </div>
      </main>
    </div>
  );
}