import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./index.css"; // Ensures styles strictly load with App

export default function App() {
  const DISCORD_INVITE_CODE = "femboy";
  const DISCORD_INVITE_LINK = `https://discord.gg/${DISCORD_INVITE_CODE}`;
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`)
      .then((res) => res.json())
      .then((data) => setTotalMembers(data.approximate_member_count || 0))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-thxbai-dark text-white font-sans p-4 md:p-12 relative selection:bg-transparent flex flex-col justify-center items-center">
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-thxbai-accent/12 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Brand Header */}
        <motion.div 
          whileHover={{ scale: 1.005 }} 
          className="md:col-span-12 glass-card rounded-[2.5rem] p-8 sm:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden"
        >
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter italic text-white uppercase select-none mb-2">
            kthxbai
          </h1>
          <p className="text-thxbai-accent text-xs font-bold tracking-[0.3em] uppercase">
            Community Hub & Game Operations
          </p>
        </motion.div>

        {/* What We're Playing Card */}
        <motion.div className="md:col-span-6 glass-card rounded-[2.5rem] p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-thxbai-accent uppercase tracking-widest block mb-2">Current Vibe</span>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Active Events</h2>
            <ul className="space-y-3 text-sm text-thxbai-muted font-medium">
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> Minecraft (Casual Survival)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-femboy-blue"></span> Voice Hangouts & Movie Nights
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-thxbai-accent"></span> Weekend Party Games
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Discord Link Card */}
        <motion.a 
          href={DISCORD_INVITE_LINK} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="md:col-span-6 glass-card rounded-[2.5rem] p-8 flex flex-col justify-between group transition-all duration-300 hover:bg-thxbai-accent/[0.04]"
        >
          <div>
            <span className="text-[10px] font-black text-thxbai-accent uppercase tracking-widest block mb-2">Join Us</span>
            <h2 className="text-3xl font-black italic uppercase">Discord Server</h2>
          </div>
          <div className="flex justify-between items-center mt-8">
            <span className="text-xs text-thxbai-muted font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-thxbai-accent rounded-full animate-pulse" /> {totalMembers} Members
            </span>
            <span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all text-xl font-bold">→</span>
          </div>
        </motion.a>

        {/* Archive / Season 1 Honor Card */}
        <motion.div className="md:col-span-12 glass-card rounded-[2.5rem] p-8 border-l-4 border-l-thxbai-accent">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-black text-thxbai-muted uppercase tracking-widest block opacity-60">Hall of Fame</span>
              <h3 className="text-xl font-bold tracking-tight text-white mt-1">Season 1: Femboy SMP - Faction event concluded</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-thxbai-accent bg-thxbai-accent/10 px-4 py-2 rounded-xl">
              🏆 Champions: Faction Melon
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}