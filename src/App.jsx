import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// Import all task data lists
import { tasksVol1, tasksVol2, tasksVol3 } from "./data/tasks";

const springConfig = { type: "spring", stiffness: 400, damping: 30 };

const MinecraftHead = ({ username }) => (
  <img 
    src={`https://minotar.net/helm/${username}/32`} 
    alt={username}
    className="w-6 h-6 rounded-md shadow-md border border-white/10 select-none pointer-events-none"
    title={username}
  />
);

export default function App() {
  // CONFIGURATION
  const DISCORD_INVITE_CODE = "femboy"; 
  const DISCORD_INVITE_LINK = `https://discord.gg/${DISCORD_INVITE_CODE}`;
  const MC_SERVER_IP = "199.115.72.77";
  const MC_SERVER_PORT = "25565";

  // State configurations
  const [activeVolume, setActiveVolume] = useState(3);
  const [activeTierFilter, setActiveTierFilter] = useState("All");

  // --- FACTION DATABASE ---
  const factionsData = [
    { 
      name: "meow", 
      members: ["ultragaminggamer", "KotaGG", "krittanica", "pendulesteak"], 
      completedVol1: ["hq", "tame", "banner", "rod", "bee", "redstone", "heart", "ender", "pumpkin", "breath", "farm", "map", "creeper", "egg", "horse", "apple", "mace", "armor", "beacons", "axolotl"],
      completedVol2: ["terracotta", "froglight", "egg_cake", "templates", "pink_armor", "hive_flowers", "goat_horn", "silence", "vex_trim", "ghast_cage", "conduit", "disc_5", "sherds", "spore", "sponge", "smelter", "god_armor", "map_5x5", "mooshroom", "monument", "end_heads", "cart_hub", "totems", "emerald_pyramid", "zoo", "chunk_loader", "amethyst_roof"],
      completedVol3: [] // Ready for Volume 3 logs!
    },
    { 
      name: "boo", 
      members: ["xniqt", "ChaosTwinRylee"], 
      completedVol1: ["hq", "tame", "banner", "rod", "bee", "redstone", "heart", "ender", "farm", "map", "egg", "axolotl"],
      completedVol2: [],
      completedVol3: []
    },
    { 
      name: "melon", 
      members: ["Thunderstorm24", "Fet0921", "pantanaisu", "_______________s"],
      completedVol1: ["hq", "tame", "banner", "rod", "bee", "redstone", "heart", "ender", "pumpkin", "breath", "farm", "map", "creeper", "egg", "horse", "apple", "mace", "armor", "beacons", "axolotl"],
      completedVol2: ["terracotta", "froglight", "egg_cake", "templates", "pink_armor", "hive_flowers", "goat_horn", "silence", "vex_trim", "ghast_cage", "conduit", "disc_5", "sherds", "spore", "sponge", "smelter", "god_armor", "map_5x5", "mooshroom", "monument", "end_heads", "cart_hub", "totems", "advancement", "emerald_pyramid", "zoo", "chunk_loader", "amethyst_roof"],
      completedVol3: []
    },
  ];

  // Map volumes to tasks dynamically
const volumeTaskMap = { 1: tasksVol1, 2: tasksVol2, 3: tasksVol3 };
  const currentTasks = volumeTaskMap[activeVolume] || [];

  const calculateScore = (completedIds, taskList) => {
    return completedIds.reduce((total, taskId) => {
      const task = taskList.find((t) => t.id === taskId);
      return total + (task ? task.pts : 0);
    }, 0);
  };

  // Generate sorted leaderboard based on active volume mapping data context
  const leaderboard = factionsData
    .map((faction) => {
      const logsMap = { 1: faction.completedVol1, 2: faction.completedVol2, 3: faction.completedVol3 };
      const activeLogs = logsMap[activeVolume] || [];
      return {
        ...faction,
        score: calculateScore(activeLogs, currentTasks),
        activeLogs
      };
    })
    .sort((a, b) => b.score - a.score);

  // DYNAMIC ALL-TIME COMBINED SCORES
  const cumulativeStandings = factionsData
    .map((faction) => {
      const score1 = calculateScore(faction.completedVol1, tasksVol1);
      const score2 = calculateScore(faction.completedVol2, tasksVol2);
      const score3 = calculateScore(faction.completedVol3, tasksVol3);
      return {
        name: faction.name,
        grandTotal: score1 + score2 + score3
      };
    })
    .sort((a, b) => b.grandTotal - a.grandTotal);

  const [totalMembers, setTotalMembers] = useState(0);
  const [mcPlayers, setMcPlayers] = useState({ online: 0, max: 0 });
  const [selectedFaction, setSelectedFaction] = useState(leaderboard[0]?.name || "");

  useEffect(() => {
    fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`)
      .then((res) => res.json())
      .then((data) => setTotalMembers(data.approximate_member_count || 0))
      .catch((err) => console.error(err));

    fetch(`https://mcapi.us/server/status?ip=${MC_SERVER_IP}&port=${MC_SERVER_PORT}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setMcPlayers({ online: data.players.now, max: data.players.max });
      })
      .catch((err) => console.error(err));
  }, []);

  const activeFactionDetails = leaderboard.find((f) => f.name === selectedFaction);
  const filteredTasks = currentTasks.filter(t => activeTierFilter === "All" || t.tier === activeTierFilter);

  return (
    <div className="min-h-screen bg-thxbai-dark text-white font-sans p-4 md:p-12 relative selection:bg-transparent">
      
      {/* Glow effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-thxbai-accent/12 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Brand Header */}
        <motion.div 
          whileHover={{ scale: 1.005 }} 
          className="md:col-span-4 glass-card rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left min-h-[200px]">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter italic mb-2 text-white uppercase select-none leading-none">
            kthxbai
          </h1>
          <p className="text-thxbai-muted text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase opacity-50">
            Est. 2026 // i hate it here
          </p>
        </motion.div>

        {/* MC Status */}
        <motion.div 
        whileHover={{ scale: 1.005 }} 
        className="md:col-span-8 glass-card rounded-[2.5rem] p-6 sm:p-10 flex items-center justify-between overflow-hidden relative gap-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-thxbai-accent uppercase italic tracking-wide truncate">
            Femboy SMP
          </h2>
          <p className="text-thxbai-muted text-sm sm:text-lg font-medium italic truncate">
            Vol. {activeVolume} Active Operation.
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          {/* whitespace-nowrap locks the text and slash together onto a single line */}
          <span className="text-4xl sm:text-5xl font-black tracking-tighter italic whitespace-nowrap">
            {mcPlayers.online}
            <span className="text-xs sm:text-sm text-thxbai-muted font-normal not-italic ml-1">
              /{mcPlayers.max || 50}
            </span>
          </span>
          <span className="flex items-center gap-2 text-[10px] uppercase font-black text-green-500 tracking-[0.2em] mt-2 select-none">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Active
          </span>
        </div>
      </motion.div>

        {/* ONGOING EVENT / BIO WITH DYNAMIC TOTAL LEADERBOARD */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-12 min-h-[420px] flex flex-col justify-between border-l-4 border-l-thxbai-accent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Description info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 select-none">
                <span className="px-3 py-1 rounded-full bg-thxbai-accent/20 text-thxbai-accent text-[10px] font-black uppercase tracking-widest border border-thxbai-accent/10">Ongoing Event</span>
                <span className="text-thxbai-muted text-[10px] font-bold uppercase tracking-widest">Nitro Reward</span>
              </div>
              <h3 className="text-5xl font-black leading-[1.1] mb-6 tracking-tighter italic text-white uppercase select-none">Volume {activeVolume} <br /> Objectives.</h3>
              <p className="text-thxbai-muted text-md max-w-xl font-medium leading-relaxed mb-4">
                {activeVolume === 1 && "The original race to dominance. Complete all 20 standard Vanilla tasks."}
                {activeVolume === 2 && "The advanced phase. Tiered difficulty levels ranging from collection to complex automation finds."}
                {activeVolume === 3 && "The final frontier. End-game grinds, structural feats, and massive scale collection logistics."}
              </p>
            </div>

            {/* Right Column: Combined Season Standings */}
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 w-full">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-thxbai-accent block mb-4">Season All-Time Combined Score</span>
              <div className="space-y-3">
                {cumulativeStandings.map((team, index) => (
                  <div key={team.name} className="flex justify-between items-center bg-white/[0.02] px-4 py-2.5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black italic ${index === 0 ? "text-yellow-500" : "text-thxbai-muted/50"}`}>#{index + 1}</span>
                      <span className="text-sm font-bold text-white/90">{team.name}</span>
                    </div>
                    <span className="text-sm font-black text-thxbai-accent">{team.grandTotal} <span className="text-[9px] text-thxbai-muted font-normal tracking-wide not-italic ml-0.5">pts</span></span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 pt-6 mt-6">
            <span className="block text-[10px] font-black text-thxbai-accent uppercase mb-2 italic underline tracking-wider select-none">Admin Tip</span>
            <p className="text-[12px] text-thxbai-muted italic leading-relaxed max-w-3xl">
              As we no longer have the faction mod in place(rip in peace), please ensure you post a screenshot in this channel when a task is completed so it can be manually logged! Do also make sure that you do not group up with more than 4 people(1 leader + 3 members).
            </p>
          </div>
        </motion.div>

        {/* LEADERBOARD CARD */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-10 border-t-4 border-t-yellow-500/20 shadow-xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tight select-none">Leaderboard</h3>
              <p className="text-thxbai-muted text-xs font-bold mt-1 uppercase tracking-widest opacity-50">Vol. {activeVolume} Rankings</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 text-lg font-bold italic select-none">★</div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {leaderboard.map((faction, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-[2.5rem] border transition-all duration-300 ${idx === 0 ? 'bg-yellow-500/5 border-yellow-500/15 shadow-[0_0_40px_rgba(234,179,8,0.03)]' : 'bg-white/[0.02] border-white/5'}`}>
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <span className={`text-3xl font-black italic w-8 select-none ${idx === 0 ? 'text-yellow-500' : 'text-thxbai-muted/30'}`}>#{idx + 1}</span>
                  <div>
                    <h4 className="text-2xl font-bold tracking-tight text-white mb-3 tracking-wide">{faction.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {faction.members.map((member) => (
                        <div key={member} className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] px-3 py-1.5 rounded-xl border border-white/5 transition-colors duration-150">
                          <MinecraftHead username={member} />
                          <span className="text-[10px] text-thxbai-muted font-bold uppercase tracking-wider">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <span className={`text-4xl font-black italic block leading-none ${idx === 0 ? 'text-yellow-500' : 'text-white'}`}>{faction.score}</span>
                  <span className="text-[10px] font-black text-thxbai-muted uppercase tracking-[0.2em] mt-1.5 opacity-60">Total Points</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* POSITIONED & CENTERED VOLUME SELECTOR */}
        <div className="md:col-span-12 flex justify-center items-center">
          <div className="grid grid-cols-3 gap-2 w-full max-w-xl bg-white/[0.01] border border-white/5 p-2 rounded-[2rem] shadow-md">
            {[1, 2, 3].map((volNum) => (
              <button 
                key={volNum}
                onClick={() => {
                  setActiveVolume(volNum);
                  setActiveTierFilter("All");
                }}
                className={`w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer text-center ${
                  activeVolume === volNum ? "bg-white text-black font-black shadow-lg" : "bg-white/5 text-thxbai-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                Volume {volNum}
              </button>
            ))}
          </div>
        </div>

        {/* PROGRESS TRACKER */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-10 border-l-4 border-l-emerald-500/30">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5 mb-8">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tight select-none">Vol. {activeVolume} Progression</h3>
              <p className="text-thxbai-muted text-xs font-bold mt-1 uppercase tracking-widest opacity-50">Operational objective checklists</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {leaderboard.map((faction) => (
                <button
                  key={faction.name}
                  onClick={() => setSelectedFaction(faction.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedFaction === faction.name ? "bg-thxbai-accent text-white shadow-md shadow-thxbai-accent/20" : "bg-white/5 border border-white/5 text-thxbai-muted hover:bg-white/10"
                  }`}
                >
                  {faction.name}
                </button>
              ))}
            </div>
          </div>

          {activeVolume > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-6 bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl max-w-max">
              {["All", "Tier 1", "Tier 2", "Tier 3", "Tier 4"].map((tierName) => (
                <button
                  key={tierName}
                  onClick={() => setActiveTierFilter(tierName)}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTierFilter === tierName ? "bg-white/10 text-white" : "text-thxbai-muted/60 hover:text-white"
                  }`}
                >
                  {tierName}
                </button>
              ))}
            </div>
          )}

          {activeFactionDetails && (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <span className="text-xs font-black text-thxbai-muted uppercase tracking-widest">
                  Showing {filteredTasks.length} Objectives
                </span>
                <span className="text-sm font-black italic text-emerald-400">
                  {activeFactionDetails.activeLogs?.length} Completed
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTasks.map((task) => {
                  const isCompleted = activeFactionDetails.activeLogs?.includes(task.id);
                  return (
                    <div 
                      key={task.id} 
                      className={`relative group flex justify-between items-center p-4 rounded-2xl border transition-all duration-200 ${
                        isCompleted ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-white/[0.01] border-white/5 text-thxbai-muted/40"
                      }`}
                    >
                      {task.desc && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-56 p-3.5 bg-black/95 border border-white/10 rounded-xl text-[10px] text-white leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-2xl">
                          {task.desc}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black/95"></div>
                        </div>
                      )}

                      <div className="flex flex-col pr-4">
                        {task.tier && <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">{task.tier}</span>}
                        <span className="text-xs font-medium tracking-tight text-white/90 truncate max-w-[160px] sm:max-w-none">{task.name}</span>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-1 rounded select-none shrink-0 ${isCompleted ? "bg-emerald-500/10" : "bg-white/[0.03]"}`}>
                        {task.pts} PTS
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Discord Link */}
        <motion.a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer" className="md:col-span-12 glass-card rounded-[2.5rem] p-10 flex items-center justify-between group transition-all duration-300 hover:bg-thxbai-accent/[0.02]">
          <div>
             <span className="text-xs font-bold text-thxbai-accent uppercase tracking-[0.2em] block mb-1">Join Community</span>
             <span className="text-3xl font-black italic block uppercase tracking-wide">Discord Server</span>
             <span className="text-xs text-thxbai-muted font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5 opacity-60 select-none">
               <span className="w-1.5 h-1.5 bg-thxbai-accent rounded-full animate-pulse" /> {totalMembers} Members
             </span>
          </div>
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 text-xl font-bold">→</div>
        </motion.a>

      </div>
    </div>
  );
}