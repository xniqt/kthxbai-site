import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const springConfig = { type: "spring", stiffness: 400, damping: 30 };

export default function App() {
  // CONFIGURATION
  const DISCORD_INVITE_CODE = "kthxbai"; 
  const DISCORD_INVITE_LINK = `https://discord.gg/${DISCORD_INVITE_CODE}`;

  const [totalMembers, setTotalMembers] = useState(0);

  // Fetch live Discord data using the Invite API for total member count
  useEffect(() => {
    fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`)
      .then((res) => res.json())
      .then((data) => {
        // approximate_member_count includes all members (online + offline)
        setTotalMembers(data.approximate_member_count || 0);
      })
      .catch((err) => console.error("Error fetching Discord status:", err));
  }, [DISCORD_INVITE_CODE]);

  return (
    <div className="min-h-screen bg-thxbai-dark text-white font-sans selection:bg-thxbai-accent/40 p-4 md:p-12 selection:text-white relative">
      
      {/* Background Ambience & Noise */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-thxbai-accent/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none brightness-100 contrast-150" 
             style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Brand Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.01 }} transition={springConfig}
          className="md:col-span-4 glass-card rounded-[2.5rem] p-10 flex flex-col justify-center min-h-[280px]"
        >
          <h1 className="text-6xl font-black tracking-tighter italic mb-3">kthxbai</h1>
          <p className="text-thxbai-muted text-xs font-bold tracking-[0.3em] uppercase opacity-60">
            Est. 2026 // i hate it here
          </p>
        </motion.div>

        {/* Status Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springConfig, delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
          className="md:col-span-8 glass-card rounded-[2.5rem] p-10 flex items-center justify-between overflow-hidden relative"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-thxbai-accent">Minecraft Server</h2>
            <p className="text-thxbai-muted text-lg font-medium italic">ligma.kthxbai.xyz</p>
          </div>
          <div className="flex flex-col items-end relative z-10">
            <span className="text-5xl font-black tracking-tighter">12<span className="text-sm text-thxbai-muted font-normal ml-1">/50</span></span>
            <span className="flex items-center gap-2 text-[10px] uppercase font-black text-green-500 tracking-[0.2em] mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Online
            </span>
          </div>
        </motion.div>

        {/* Main Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.2 }}
          whileHover={{ scale: 1.005 }}
          className="md:col-span-7 glass-card rounded-[3rem] p-12 min-h-[450px] flex flex-col justify-end"
        >
          <div className="w-12 h-[2px] bg-thxbai-accent mb-8" />
          <h3 className="text-5xl font-bold leading-[1.1] mb-8 tracking-tight">
            I don't know <br /> 
            <span className="text-thxbai-muted/40 italic">i just..</span> <br /> 
            work here.
          </h3>
          <p className="text-thxbai-muted text-xl max-w-sm font-medium leading-relaxed">
            There's supposed to be a cool text here, but I'm not that creative just yet.
          </p>
        </motion.div>

        {/* Social & Meta */}
        <div className="md:col-span-5 grid grid-rows-2 gap-5">
          {/* Discord Card - Now fetching total member count */}
          <motion.a 
            href={DISCORD_INVITE_LINK} 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, backgroundColor: "rgba(99, 102, 241, 0.15)" }}
            className="glass-card rounded-[2.5rem] p-8 flex items-center justify-between group transition-all duration-300"
          >
            <div>
               <span className="text-xs font-bold text-thxbai-accent uppercase tracking-[0.2em] block mb-1">Join Community</span>
               <span className="text-2xl font-bold italic block">Discord</span>
               <span className="text-[10px] text-thxbai-muted font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                 <span className="w-1 h-1 bg-thxbai-accent rounded-full" />
                 {totalMembers} Total Members
               </span>
            </div>
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <span className="text-xl">↗</span>
            </div>
          </motion.a>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-b-4 border-b-thxbai-accent/30"
          >
            <h4 className="text-xl font-bold italic">Latest Project</h4>
            <div className="flex justify-between items-end">
                <p className="text-sm text-thxbai-muted font-medium uppercase tracking-widest">kthxbai site</p>
                <span className="text-[10px] text-thxbai-accent font-bold px-2 py-1 bg-thxbai-accent/10 rounded">v1.0.4</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}