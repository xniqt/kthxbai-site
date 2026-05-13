import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const springConfig = { type: "spring", stiffness: 400, damping: 30 };

export default function App() {
  // CONFIGURATION
  const DISCORD_INVITE_CODE = "femboy"; 
  const DISCORD_INVITE_LINK = `https://discord.gg/${DISCORD_INVITE_CODE}`;
  const MC_SERVER_IP = "199.115.72.77";
  const MC_SERVER_PORT = "25565";

  // State to toggle between Volume 1 and Volume 2
  const [activeVolume, setActiveVolume] = useState(2);

  // --- VOLUME 1 TASKS ---
  const tasksVol1 = [
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

  // --- VOLUME 2 TASKS (Tiered) ---
  const tasksVol2 = [
    // Tier 1: Collection & Aesthetics (15 pts)
    { id: "terracotta", name: "16 Colors Glazed Terracotta Grid", pts: 15, tier: "Tier 1" },
    { id: "froglight", name: "Display all Froglight colors", pts: 15, tier: "Tier 1" },
    { id: "egg_cake", name: "Cake on top of Dragon Egg", pts: 15, tier: "Tier 1" },
    { id: "templates", name: "10 Smithing Templates", pts: 15, tier: "Tier 1" },
    { id: "pink_armor", name: "Dyed Pink Leather Armor Set", pts: 15, tier: "Tier 1" },
    { id: "hive_flowers", name: "8 Flowers around a Hive", pts: 15, tier: "Tier 1" },
    { id: "goat_horn", name: "Obtain any Goat Horn", pts: 15, tier: "Tier 1" },
    // Tier 2: Exploration & Rare Finds (35 pts)
    { id: "silence", name: "Obtain 'Silence' Armor Trim", pts: 35, tier: "Tier 2" },
    { id: "vex_trim", name: "Obtain 'Ward' or 'Vex' Trim", pts: 35, tier: "Tier 2" },
    { id: "ghast_cage", name: "Ghast in Overworld Cage", pts: 35, tier: "Tier 2" },
    { id: "conduit", name: "Fully activated Conduit", pts: 35, tier: "Tier 2" },
    { id: "disc_5", name: "Obtain Music Disc 5", pts: 35, tier: "Tier 2" },
    { id: "sherds", name: "All 20 unique Pottery Sherds", pts: 35, tier: "Tier 2" },
    { id: "spore", name: "Place Spore Blossom in HQ", pts: 35, tier: "Tier 2" },
    { id: "sponge", name: "Collect 64 Sponge blocks", pts: 35, tier: "Tier 2" },
    // Tier 3: Technical & Hardcore (75 pts)
    { id: "smelter", name: "8-Furnace Super Smelter", pts: 75, tier: "Tier 3" },
    { id: "god_armor", name: "Full Set of 'God Armor'", pts: 75, tier: "Tier 3" },
    { id: "map_5x5", name: "5x5 Map Wall of HQ area", pts: 75, tier: "Tier 3" },
    { id: "mooshroom", name: "Breed a Brown Mooshroom", pts: 75, tier: "Tier 3" },
    { id: "monument", name: "Drain an Ocean Monument", pts: 75, tier: "Tier 3" },
    { id: "end_heads", name: "5 Dragon Heads from Ships", pts: 75, tier: "Tier 3" },
    { id: "cart_hub", name: "500-block 4-way Minecart Hub", pts: 75, tier: "Tier 3" },
    { id: "totems", name: "64 Totems of Undying", pts: 75, tier: "Tier 3" },
    // Tier 4: The "Tie-Breakers" (150 pts)
    { id: "advancement", name: "'How Did We Get Here?'", pts: 150, tier: "Tier 4" },
    { id: "emerald_pyramid", name: "3-level Emerald Block Pyramid", pts: 150, tier: "Tier 4" },
    { id: "zoo", name: "Jeb, Toast, & Dinnerbone Zoo", pts: 150, tier: "Tier 4" },
    { id: "chunk_loader", name: "End Portal Perma-loader", pts: 150, tier: "Tier 4" },
    { id: "amethyst_roof", name: "Full Amethyst Cluster Roof", pts: 150, tier: "Tier 4" },
  ];

  // --- FACTION DATA ---
  const factionsData = [
    { 
      name: "meow", 
      members: "ultragaminggamer, KotaGG, raviolomood, pendulesteak", 
      completedVol1: ["hq", "horse", "farm", "ender", "heart", "breath", "rod", "redstone", "tame", "banner", "pumpkin", "egg", "apple", "map", "creeper", "bee", "axolotl", "armor", "beacons", "mace"],
      completedVol2: [] 
    },
    { 
      name: "boo", 
      members: "ChaoticRylee", 
      completedVol1: ["hq", "farm", "redstone", "egg", "heart", "banner"],
      completedVol2: []
    },
    { 
      name: "melon", 
      members: "Thunderstorm24, Fet0921, pantanaisu, _______________s",
      completedVol1: ["hq", "bee", "pumpkin", "horse", "farm", "banner", "redstone", "ender", "heart", "map", "axolotl", "apple", "egg", "beacons", "rod", "mace", "creeper", "tame", "breath", "armor"],
      completedVol2: []
    },
    { 
      name: "Transgender", 
      members: "WuvX", 
      completedVol1: ["hq"],
      completedVol2: [] 
    },
  ];

  // Helper function to calculate points dynamically
  const calculateScore = (completedIds, taskList) => {
    return completedIds.reduce((total, taskId) => {
      const task = taskList.find((t) => t.id === taskId);
      return total + (task ? task.pts : 0);
    }, 0);
  };

  const currentTasks = activeVolume === 1 ? tasksVol1 : tasksVol2;

  // Generate sorted leaderboard based on active volume
  const leaderboard = factionsData
    .map((faction) => ({
      ...faction,
      score: calculateScore(activeVolume === 1 ? faction.completedVol1 : faction.completedVol2, currentTasks),
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

  const activeFactionDetails = leaderboard.find((f) => f.name === selectedFaction);
  const activeCompletions = activeVolume === 1 ? activeFactionDetails?.completedVol1 : activeFactionDetails?.completedVol2;

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
          <h1 className="text-6xl font-black tracking-tighter italic mb-3 text-white uppercase italic">kthxbai</h1>
          <p className="text-thxbai-muted text-xs font-bold tracking-[0.3em] uppercase opacity-60">Est. 2026 // i hate it here</p>
        </motion.div>

        {/* MC Status */}
        <motion.div whileHover={{ scale: 1.01 }} transition={springConfig} className="md:col-span-8 glass-card rounded-[2.5rem] p-10 flex items-center justify-between overflow-hidden relative">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-thxbai-accent uppercase italic">The Project</h2>
            <p className="text-thxbai-muted text-lg font-medium italic">Vol. {activeVolume} Active.</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-5xl font-black tracking-tighter italic">{mcPlayers.online}<span className="text-sm text-thxbai-muted font-normal not-italic ml-1">/{mcPlayers.max || 50}</span></span>
            <span className="flex items-center gap-2 text-[10px] uppercase font-black text-green-500 tracking-[0.2em] mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Active
            </span>
          </div>
        </motion.div>

        {/* VOLUME SELECTOR */}
        <div className="md:col-span-12 flex gap-3 mb-2">
          <button 
            onClick={() => setActiveVolume(1)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeVolume === 1 ? "bg-white text-black" : "bg-white/5 text-thxbai-muted hover:bg-white/10"
            }`}
          >
            Volume 1
          </button>
          <button 
            onClick={() => setActiveVolume(2)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeVolume === 2 ? "bg-thxbai-accent text-white shadow-lg shadow-thxbai-accent/20" : "bg-white/5 text-thxbai-muted hover:bg-white/10"
            }`}
          >
            Volume 2
          </button>
        </div>

        {/* Event Bio */}
        <motion.div className="md:col-span-7 glass-card rounded-[3rem] p-12 min-h-[420px] flex flex-col justify-between border-l-4 border-l-thxbai-accent">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-thxbai-accent/20 text-thxbai-accent text-[10px] font-black uppercase tracking-widest">Ongoing Event</span>
              <span className="text-thxbai-muted text-[10px] font-bold uppercase tracking-widest">Nitro Reward</span>
            </div>
            <h3 className="text-5xl font-black leading-[1.1] mb-6 tracking-tighter italic text-white uppercase italic">Volume {activeVolume} <br /> Objectives.</h3>
            <p className="text-thxbai-muted text-md max-w-md font-medium leading-relaxed mb-6">
              {activeVolume === 1 
                ? "The original race to dominance. Complete all 20 standard tasks." 
                : "The advanced phase. Tiered difficulty levels ranging from collection to extreme grinds."
              }
            </p>
          </div>
          <div className="border-t border-white/5 pt-6">
            <span className="block text-[10px] font-black text-thxbai-accent uppercase mb-2 italic underline">Admin Tip</span>
            <p className="text-[11px] text-thxbai-muted italic">Display items in Item Frames at HQ. Verified completions will be marked with signs to prevent item sharing.</p>
          </div>
        </motion.div>

        {/* LEADERBOARD CARD */}
        <motion.div className="md:col-span-5 glass-card rounded-[3rem] p-8 border-t-4 border-t-yellow-500/20 flex flex-col justify-between min-h-[420px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tight">Leaderboard</h3>
              <p className="text-thxbai-muted text-[10px] font-bold mt-0.5 uppercase tracking-widest opacity-60">Vol. {activeVolume} Rankings</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 text-sm font-bold italic">★</div>
          </div>
          
          <div className="space-y-2.5 overflow-y-auto pr-1 custom-scrollbar max-h-[300px]">
            {leaderboard.map((faction, idx) => (
              <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${idx === 0 ? 'bg-yellow-500/5 border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.03)]' : 'bg-white/[0.01] border-white/5'}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-black italic w-6 ${idx === 0 ? 'text-yellow-500' : 'text-thxbai-muted/30'}`}>#{idx + 1}</span>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight text-white">{faction.name}</h4>
                    <p className="text-[9px] text-thxbai-muted font-bold uppercase tracking-widest opacity-70 truncate max-w-[120px]">{faction.members}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-black italic block ${idx === 0 ? 'text-yellow-500' : 'text-white'}`}>{faction.score}</span>
                  <span className="text-[8px] font-black text-thxbai-muted uppercase tracking-[0.2em]">Pts</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FACTION COMPLETED TASKS TRACKER */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-10 border-l-4 border-l-emerald-500/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tight">Vol. {activeVolume} Progress</h3>
              <p className="text-thxbai-muted text-xs font-bold mt-1 uppercase tracking-widest opacity-60">Track faction completions</p>
            </div>
            
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

          {activeFactionDetails && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-thxbai-muted uppercase tracking-widest">
                  Completed {activeCompletions?.length || 0} of {currentTasks.length} Tasks
                </span>
                <span className="text-sm font-black italic text-emerald-400">
                  {Math.round(((activeCompletions?.length || 0) / currentTasks.length) * 100)}% Complete
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentTasks.map((task) => {
                  const isCompleted = activeCompletions?.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${
                        isCompleted
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                          : "bg-white/[0.01] border-white/5 text-thxbai-muted/40"
                      }`}
                    >
                      <div className="flex flex-col">
                        {task.tier && (
                          <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-0.5">{task.tier}</span>
                        )}
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

        {/* Discord Link */}
        <motion.a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer" className="md:col-span-12 glass-card rounded-[2.5rem] p-10 flex items-center justify-between group transition-all duration-300">
          <div>
             <span className="text-xs font-bold text-thxbai-accent uppercase tracking-[0.2em] block mb-1">Join Community</span>
             <span className="text-3xl font-black italic block uppercase">Discord Server</span>
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