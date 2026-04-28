import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const springConfig = { type: "spring", stiffness: 400, damping: 30 };

export default function App() {
  // CONFIGURATION
  const DISCORD_INVITE_CODE = "kthxbai"; 
  const DISCORD_INVITE_LINK = `https://discord.gg/${DISCORD_INVITE_CODE}`;
  const MC_SERVER_IP = "5.39.17.26";
  const MC_SERVER_PORT = "20387";

  const [totalMembers, setTotalMembers] = useState(0);
  const [mcPlayers, setMcPlayers] = useState({ online: 0, max: 0 });

  // Discord Stats
  useEffect(() => {
    fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`)
      .then((res) => res.json())
      .then((data) => {
        setTotalMembers(data.approximate_member_count || 0);
      })
      .catch((err) => console.error("Error fetching Discord status:", err));
  }, [DISCORD_INVITE_CODE]);

  // Minecraft Stats
  useEffect(() => {
    fetch(`https://mcapi.us/server/status?ip=${MC_SERVER_IP}&port=${MC_SERVER_PORT}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMcPlayers({ online: data.players.now, max: data.players.max });
        }
      })
      .catch((err) => console.error("Error fetching MC status:", err));
  }, []);

  const tasks = [
    { name: "Set up a faction HQ", pts: 5 },
    { name: "Tame 3 different animals", pts: 10 },
    { name: "Create a team banner", pts: 10 },
    { name: "Get a maxed fishing rod", pts: 10 },
    { name: "Own a baby bee", pts: 10 },
    { name: "Build a redstone contraption", pts: 15 },
    { name: "Get a Heart of the Sea", pts: 15 },
    { name: "Obtain 12 Eyes of Ender", pts: 15 },
    { name: "Pumpkin house w/ cake floor", pts: 20 },
    { name: "Obtain 16 Dragon’s Breath", pts: 20 },
    { name: "Build automatic farm", pts: 25 },
    { name: "Map out a 3×3 area", pts: 25 },
    { name: "Obtain a Creeper Head", pts: 25 },
    { name: "Obtain a Sniffer Egg", pts: 30 },
    { name: "Obtain a Skeleton Horse", pts: 40 },
    { name: "Enchanted Golden Apple", pts: 50 },
    { name: "Obtain a Mace", pts: 60 },
    { name: "Full Netherite Armor Set", pts: 80 },
    { name: "Build 4 maxed beacons", pts: 100 },
    { name: "Obtain a Blue Axolotl", pts: 250 },
  ];

  return (
    <div className="min-h-screen bg-thxbai-dark text-white font-sans selection:bg-thxbai-accent/40 p-4 md:p-12 selection:text-white relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-thxbai-accent/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none brightness-100 contrast-150" 
             style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Brand Header */}
        <motion.div 
          whileHover={{ scale: 1.01 }} transition={springConfig}
          className="md:col-span-4 glass-card rounded-[2.5rem] p-10 flex flex-col justify-center min-h-[280px]"
        >
          <h1 className="text-6xl font-black tracking-tighter italic mb-3 text-white">kthxbai</h1>
          <p className="text-thxbai-muted text-xs font-bold tracking-[0.3em] uppercase opacity-60">
            Est. 2026 // i hate it here
          </p>
        </motion.div>

        {/* MC Server Status */}
        <motion.div 
          whileHover={{ scale: 1.01 }} transition={springConfig}
          className="md:col-span-8 glass-card rounded-[2.5rem] p-10 flex items-center justify-between overflow-hidden relative"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-thxbai-accent uppercase">The Project</h2>
            <p className="text-thxbai-muted text-lg font-medium italic">Alpha with a modern twist.</p>
          </div>
          <div className="flex flex-col items-end relative z-10">
            <span className="text-5xl font-black tracking-tighter italic">
              {mcPlayers.online}<span className="text-sm text-thxbai-muted font-normal not-italic ml-1">/{mcPlayers.max || 50}</span>
            </span>
            <span className="flex items-center gap-2 text-[10px] uppercase font-black text-green-500 tracking-[0.2em] mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Active
            </span>
          </div>
        </motion.div>

        {/* NEW SECTION: EVENT DESCRIPTION */}
        <motion.div 
          whileHover={{ scale: 1.005 }} transition={springConfig}
          className="md:col-span-7 glass-card rounded-[3rem] p-12 min-h-[450px] flex flex-col justify-between border-l-4 border-l-thxbai-accent"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-thxbai-accent/20 text-thxbai-accent text-[10px] font-black uppercase tracking-widest">Ongoing Event</span>
              <span className="text-thxbai-muted text-[10px] font-bold uppercase tracking-widest">Ends July 19</span>
            </div>
            <h3 className="text-5xl font-black leading-[1.1] mb-6 tracking-tighter italic">
              FACTION <br /> DOMINANCE.
            </h3>
            <p className="text-thxbai-muted text-lg max-w-md font-medium leading-relaxed mb-8">
              Gather your crew (max 4), build your base, and prepare for battle. Control land and complete challenges to win Discord Nitro.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
            <div>
              <span className="block text-[10px] font-black text-thxbai-accent uppercase mb-1">Power System</span>
              <p className="text-sm text-thxbai-muted">+20/member, -10/death</p>
            </div>
            <div>
              <span className="block text-[10px] font-black text-thxbai-accent uppercase mb-1">Reward</span>
              <p className="text-sm text-thxbai-muted italic font-bold text-white">Discord Nitro</p>
            </div>
          </div>
        </motion.div>

        {/* NEW SECTION: TASK LIST */}
        <motion.div 
          className="md:col-span-5 glass-card rounded-[3rem] p-8 flex flex-col h-[450px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-black italic uppercase tracking-tight">Objectives</h4>
            <span className="text-[10px] font-bold text-thxbai-muted uppercase tracking-widest">Score Points</span>
          </div>
          
          <div className="overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors group">
                  <span className="text-sm font-medium text-thxbai-muted group-hover:text-white transition-colors">{task.name}</span>
                  <span className="text-[10px] font-black text-thxbai-accent bg-thxbai-accent/10 px-2 py-1 rounded">{task.pts} PTS</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
          <motion.a 
            href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -5, backgroundColor: "rgba(99, 102, 241, 0.15)" }}
            className="glass-card rounded-[2.5rem] p-8 flex items-center justify-between group transition-all duration-300"
          >
            <div>
               <span className="text-xs font-bold text-thxbai-accent uppercase tracking-[0.2em] block mb-1">Join Community</span>
               <span className="text-2xl font-bold italic block">Discord</span>
               <span className="text-[10px] text-thxbai-muted font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                 <span className="w-1 h-1 bg-thxbai-accent rounded-full" /> {totalMembers} Total Members
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
                <span className="text-[10px] text-thxbai-accent font-bold px-2 py-1 bg-thxbai-accent/10 rounded uppercase">v1.1.0</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}