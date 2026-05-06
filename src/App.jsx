import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const springConfig = { type: "spring", stiffness: 400, damping: 30 };

export default function App() {
  // CONFIGURATION
  const DISCORD_INVITE_CODE = "kthxbai"; 
  const DISCORD_INVITE_LINK = `https://discord.gg/${DISCORD_INVITE_CODE}`;
  const MC_SERVER_IP = "199.115.72.77";
  const MC_SERVER_PORT = "25565";

  // --- OBJECTIVES / TASK LIST ---
  const tasks = [
    { id: "hq", name: "Set up a faction HQ", pts: 5 },
    { id: "tame", name: "Tame 3 different animals", pts: 10 },
    { id: "banner", name: "Create a team banner", pts: 10 },
    { id: "rod", name: "Get a maxed fishing rod", pts: 10 },
    { id: "bee", name: "Own a baby bee", pts: 10 },
    { id: "redstone", name: "Build redstone contraption", pts: 15 },
    { id: "heart", name: "Get a Heart of the Sea", pts: 15 },
    { id: "ender", name: "Obtain 12 Eyes of Ender", pts: 15 },
    { id: "pumpkin", name: "Pumpkin house w/ cake floor", pts: 20 },
    { id: "breath", name: "Obtain 16 Dragon’s Breath", pts: 20 },
    { id: "farm", name: "Build automatic farm", pts: 25 },
    { id: "map", name: "Map out a 3×3 area", pts: 25 },
    { id: "creeper", name: "Obtain a Creeper Head", pts: 25 },
    { id: "egg", name: "Obtain a Sniffer Egg", pts: 30 },
    { id: "horse", name: "Obtain a Skeleton Horse", pts: 40 },
    { id: "apple", name: "Enchanted Golden Apple", pts: 50 },
    { id: "mace", name: "Obtain a Mace", pts: 60 },
    { id: "armor", name: "Full Netherite Armor Set", pts: 80 },
    { id: "beacons", name: "Build 4 maxed beacons", pts: 100 },
    { id: "axolotl", name: "Obtain a Blue Axolotl", pts: 250 },
  ];

  // --- MANUAL FACTIONS & COMPLETED TASKS DATA ---
  // Simply add the task "id" to the completed array, and the site will calculate the scores automatically!
  const factionsData = [
    { 
      name: "meow", 
      members: "ultragaminggamer", 
      completed: ["hq"]
    },
    { 
      name: "boo", 
      members: "xniqt", 
      completed: ["hq", "farm", "redstone"]
    },
    { 
      name: "Solarflare", 
      members: "ChaoticRylee", 
      completed: ["hq"]
    },
    { 
      name: "melon", 
      members: "Thunderstorm24, Fet0921",
      completed: ["hq", "bee", "pumpkin", "horse", "farm", "banner"] 
    },
    { 
      name: "Transgender", 
      members: "WuvX", 
      completed: ["hq"] 
    },
  ];

  // Helper function to calculate points dynamically
  const calculateScore = (completedIds) => {
    return completedIds.reduce((total, taskId) => {
      const task = tasks.find((t) => t.id === taskId);
      return total + (task ? task.pts : 0);
    }, 0);
  };

  // Automatically generate the sorted leaderboard based on actual task completions
  const leaderboard = factionsData
    .map((faction) => ({
      ...faction,
      score: calculateScore(faction.completed),
    }))
    .sort((a, b) => b.score - a.score);

  const [totalMembers, setTotalMembers] = useState(0);
  const [mcPlayers, setMcPlayers] = useState({ online: 0, max: 0 });
  const [selectedFaction, setSelectedFaction] = useState(leaderboard[0]?.name || "");

  useEffect(() => {
    fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`)
      .then((res) => res.json())
      .then((data) => setTotalMembers(data.approximate_member_count || 0))
      .catch((err) => console.error("Error Discord:", err));

    fetch(`https://mcapi.us/server/status?ip=${MC_SERVER_IP}&port=${MC_SERVER_PORT}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setMcPlayers({ online: data.players.now, max: data.players.max });
      })
      .catch((err) => console.error("Error MC:", err));
  }, []);

  // Find the currently active faction for the task progress viewer
  const activeFactionDetails = leaderboard.find((f) => f.name === selectedFaction);

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
        <motion.div whileHover={{ scale: 1.01 }} transition={springConfig} className="md:col-span-4 glass-card rounded-[2.5rem] p-10 flex flex-col justify-center min-h-[200px]">
          <h1 className="text-6xl font-black tracking-tighter italic mb-3">kthxbai</h1>
          <p className="text-thxbai-muted text-xs font-bold tracking-[0.3em] uppercase opacity-60">Est. 2026 // i hate it here</p>
        </motion.div>

        {/* MC Status */}
        <motion.div whileHover={{ scale: 1.01 }} transition={springConfig} className="md:col-span-8 glass-card rounded-[2.5rem] p-10 flex items-center justify-between overflow-hidden">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-thxbai-accent uppercase">Femboy SMP</h2>
            <p className="text-thxbai-muted text-lg font-medium italic">Factions & Tasks.</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-5xl font-black tracking-tighter italic">{mcPlayers.online}<span className="text-sm text-thxbai-muted font-normal not-italic ml-1">/{mcPlayers.max || 50}</span></span>
            <span className="flex items-center gap-2 text-[10px] uppercase font-black text-green-500 tracking-[0.2em] mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Active
            </span>
          </div>
        </motion.div>

        {/* LEADERBOARD CARD */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-10 border-t-4 border-t-yellow-500/20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tight">Leaderboard</h3>
              <p className="text-thxbai-muted text-xs font-bold mt-1 uppercase tracking-widest opacity-60">Top 5 Factions</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest">Live Standings</div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {leaderboard.map((faction, idx) => (
              <div key={idx} className={`flex justify-between items-center p-6 rounded-[2rem] border transition-all ${idx === 0 ? 'bg-yellow-500/5 border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.05)]' : 'bg-white/[0.02] border-white/5'}`}>
                <div className="flex items-center gap-6">
                  <span className={`text-2xl font-black italic w-8 ${idx === 0 ? 'text-yellow-500' : 'text-thxbai-muted/40'}`}>#{idx + 1}</span>
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-white">{faction.name}</h4>
                    <p className="text-[10px] text-thxbai-muted font-bold uppercase tracking-widest mt-1">{faction.members}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-black italic block ${idx === 0 ? 'text-yellow-500' : 'text-white'}`}>{faction.score}</span>
                  <span className="text-[9px] font-black text-thxbai-muted uppercase tracking-[0.2em]">Points</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* NEW SECTION: FACTION COMPLETED TASKS TRACKER */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-10 border-l-4 border-l-emerald-500/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tight">Faction Progress</h3>
              <p className="text-thxbai-muted text-xs font-bold mt-1 uppercase tracking-widest opacity-60">Track completed objectives</p>
            </div>
            
            {/* Interactive Faction Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {leaderboard.map((faction) => (
                <button
                  key={faction.name}
                  onClick={() => setSelectedFaction(faction.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedFaction === faction.name
                      ? "bg-thxbai-accent text-white shadow-lg"
                      : "bg-white/[0.03] border border-white/5 text-thxbai-muted hover:bg-white/[0.08]"
                  }`}
                >
                  {faction.name}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Display */}
          {activeFactionDetails && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-thxbai-muted uppercase tracking-widest">
                  Completed {activeFactionDetails.completed.length} of {tasks.length} Tasks
                </span>
                <span className="text-sm font-black italic text-emerald-400">
                  {Math.round((activeFactionDetails.completed.length / tasks.length) * 100)}% Complete
                </span>
              </div>
              
              {/* Grid showing checked off tasks for the selected faction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {tasks.map((task) => {
                  const isCompleted = activeFactionDetails.completed.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${
                        isCompleted
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                          : "bg-white/[0.01] border-white/5 text-thxbai-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${isCompleted ? "text-emerald-400" : "text-white/10"}`}>
                          {isCompleted ? "✓" : "○"}
                        </span>
                        <span className="text-xs font-medium tracking-tight">{task.name}</span>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-1 rounded ${
                        isCompleted ? "bg-emerald-500/10" : "bg-white/[0.02]"
                      }`}>
                        {task.pts} PTS
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Event Bio */}
        <motion.div className="md:col-span-7 glass-card rounded-[3rem] p-12 min-h-[450px] flex flex-col justify-between border-l-4 border-l-thxbai-accent">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-thxbai-accent/20 text-thxbai-accent text-[10px] font-black uppercase tracking-widest">Ongoing Event</span>
              <span className="text-thxbai-muted text-[10px] font-bold uppercase tracking-widest">Ends July 19</span>
            </div>
            <h3 className="text-5xl font-black leading-[1.1] mb-6 tracking-tighter italic text-white uppercase">Faction <br /> Dominance.</h3>
            <p className="text-thxbai-muted text-lg max-w-md font-medium leading-relaxed mb-8">Gather your crew (max 4), build your base, and prepare for battle. Complete challenges to win Discord Nitro.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
            <div><span className="block text-[10px] font-black text-thxbai-accent uppercase mb-1">Power System</span><p className="text-sm text-thxbai-muted">+20/member, -10/death</p></div>
            <div><span className="block text-[10px] font-black text-thxbai-accent uppercase mb-1">Reward</span><p className="text-sm text-thxbai-muted italic font-bold text-white uppercase tracking-widest">Discord Nitro</p></div>
          </div>
        </motion.div>

        {/* Objectives */}
        <motion.div className="md:col-span-5 glass-card rounded-[3rem] p-8 flex flex-col h-[450px]">
          <h4 className="text-xl font-black italic uppercase tracking-tight mb-6 px-2">Objectives</h4>
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

        {/* Discord Link */}
        <motion.a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer" className="md:col-span-12 glass-card rounded-[2.5rem] p-10 flex items-center justify-between group transition-all duration-300">
          <div>
             <span className="text-xs font-bold text-thxbai-accent uppercase tracking-[0.2em] block mb-1">Join Community</span>
             <span className="text-3xl font-black italic block">Discord Server</span>
             <span className="text-xs text-thxbai-muted font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5 opacity-60">
               <span className="w-1.5 h-1.5 bg-thxbai-accent rounded-full" /> {totalMembers} Members in the void
             </span>
          </div>
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">→</div>
        </motion.a>

      </div>
    </div>
  );
}