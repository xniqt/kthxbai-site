import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const springConfig = { type: "spring", stiffness: 400, damping: 30 };

// Helper component to fetch and display Minecraft skins
const MinecraftHead = ({ username }) => (
  <img 
    src={`https://minotar.net/helm/${username}/32`} 
    alt={username}
    className="w-6 h-6 rounded-md shadow-sm border border-white/10"
    title={username}
  />
);

export default function App() {
  // CONFIGURATION
  const DISCORD_INVITE_CODE = "femboy"; 
  const DISCORD_INVITE_LINK = `https://discord.gg/${DISCORD_INVITE_CODE}`;
  const MC_SERVER_IP = "199.115.72.77";
  const MC_SERVER_PORT = "25565";

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

  // --- VOLUME 2 TASKS (With Hover Descriptions) ---
  const tasksVol2 = [
    // Tier 1
    { id: "terracotta", name: "Glazed Terracotta Grid", pts: 15, tier: "Tier 1", desc: "Obtain all 16 colors of Glazed Terracotta and place them in a 4x4 grid." },
    { id: "froglight", name: "Froglight Display", pts: 15, tier: "Tier 1", desc: "Collect and display 1 of every Froglight color (Pearlescent, Verdant, and Ochre)." },
    { id: "egg_cake", name: "Dragon Egg Cake", pts: 15, tier: "Tier 1", desc: "Obtain and place a Cake on top of a Dragon Egg." },
    { id: "templates", name: "Smithing Templates", pts: 15, tier: "Tier 1", desc: "Place 10 different types of Smithing Templates in a chest or on item frames." },
    { id: "pink_armor", name: "Pink Leather Set", pts: 15, tier: "Tier 1", desc: "Dye a full set of Leather Armor pink and place it on an armor stand." },
    { id: "hive_flowers", name: "Hive Flower Garden", pts: 15, tier: "Tier 1", desc: "Collect 8 different types of Flowers and plant them in a 1-block radius around a Hive." },
    { id: "goat_horn", name: "Goat Horn", pts: 15, tier: "Tier 1", desc: "Obtain any variant of a Goat Horn." },
    // Tier 2
    { id: "silence", name: "'Silence' Armor Trim", pts: 35, tier: "Tier 2", desc: "Obtain the rarest trim found in Ancient Cities." },
    { id: "vex_trim", name: "Ward or Vex Trim", pts: 35, tier: "Tier 2", desc: "Obtain either the Ward or Vex Armor Trim variants." },
    { id: "ghast_cage", name: "Ghast in a Cage", pts: 35, tier: "Tier 2", desc: "Capture a Ghast in a glass cage in the Overworld." },
    { id: "conduit", name: "Activated Conduit", pts: 35, tier: "Tier 2", desc: "Place a Conduit in a water feature and have it fully activated (surrounded by Prismarine)." },
    { id: "disc_5", name: "Music Disc 5", pts: 35, tier: "Tier 2", desc: "Obtain Music Disc 5, crafted from fragments found in Ancient Cities." },
    { id: "sherds", name: "All Pottery Sherds", pts: 35, tier: "Tier 2", desc: "Obtain 1 of every unique Pottery Sherd (20 total)." },
    { id: "spore", name: "HQ Spore Blossom", pts: 35, tier: "Tier 2", desc: "Place a Spore Blossom in your Faction HQ." },
    { id: "sponge", name: "Stack of Sponges", pts: 35, tier: "Tier 2", desc: "Collect a full stack (64) of Sponge blocks." },
    // Tier 3
    { id: "smelter", name: "Super Smelter", pts: 75, tier: "Tier 3", desc: "Build a functional smelter with at least 8 Furnaces linked to hoppers." },
    { id: "god_armor", name: "Full 'God Armor'", pts: 75, tier: "Tier 3", desc: "Full Netherite set with max Level Enchants on every piece." },
    { id: "map_5x5", name: "5x5 Map Wall", pts: 75, tier: "Tier 3", desc: "Create a 5x5 Map Wall of the area surrounding your HQ." },
    { id: "mooshroom", name: "Brown Mooshroom", pts: 75, tier: "Tier 3", desc: "Breed a Brown Mooshroom (requires lightning/Channeling trident)." },
    { id: "monument", name: "Ocean Monument Clear", pts: 75, tier: "Tier 3", desc: "Clear out an entire Ocean Monument of all water." },
    { id: "end_heads", name: "5 Dragon Heads", pts: 75, tier: "Tier 3", desc: "Collect 5 Dragon Heads from End Ships." },
    { id: "cart_hub", name: "4-way Minecart Hub", pts: 75, tier: "Tier 3", desc: "Construct a hub that travels 500 blocks in each direction." },
    { id: "totems", name: "Stack of Totems", pts: 75, tier: "Tier 3", desc: "Collect a stack (64) of Totems of Undying in a single chest." },
    // Tier 4
    { id: "advancement", name: "How Did We Get Here?", pts: 150, tier: "Tier 4", desc: "Obtain the most difficult advancement in the game." },
    { id: "emerald_pyramid", name: "Emerald Pyramid", pts: 150, tier: "Tier 4", desc: "Construct a pyramid made entirely of Emerald Blocks (min 3 levels)." },
    { id: "zoo", name: "The Name-Tag Zoo", pts: 150, tier: "Tier 4", desc: "Display a Jeb_ sheep, Toast rabbit, and Dinnerbone mob." },
    { id: "chunk_loader", name: "End Perma-loader", pts: 150, tier: "Tier 4", desc: "Build a perma-loader for the End Portal to keep it chunk-loaded." },
    { id: "amethyst_roof", name: "Amethyst HQ Roof", pts: 150, tier: "Tier 4", desc: "Cover your entire HQ roof in Amethyst Clusters." },
  ];

  // --- FACTION DATA ---
  const factionsData = [
    { 
      name: "meow", 
      members: ["ultragaminggamer", "KotaGG", "raviolomood", "pendulesteak"], 
      completedVol1: ["hq", "horse", "farm", "ender", "heart", "breath", "rod", "redstone", "tame", "banner", "pumpkin", "egg", "apple", "map", "creeper", "bee", "axolotl", "armor", "beacons", "mace"],
      completedVol2: ["terracotta", "pink_armor", "hive_flowers", "emerald_pyramid", "end_heads", "zoo", "goat_horn", "amethyst_roof", "totems", "conduit", "spore", "smelter", "map_5x5", "vex_trim"
        , "egg_cake"] 
    },
    { 
      name: "boo", 
      members: ["xniqt", "ChaosTwinRylee"], 
      completedVol1: ["hq", "farm", "redstone", "egg", "heart", "banner"],
      completedVol2: ["smelter"]
    },
    { 
      name: "melon", 
      members: ["Thunderstorm24", "Fet0921", "pantanaisu", "_______________s"],
      completedVol1: ["hq", "bee", "pumpkin", "horse", "farm", "banner", "redstone", "ender", "heart", "map", "axolotl", "apple", "egg", "beacons", "rod", "mace", "creeper", "tame", "breath", "armor"],
      completedVol2: ["mooshroom", "terracotta", "smelter", "hive_flowers", "egg_cake", "zoo", "emerald_pyramid", "end_heads", "pink_armor", "sponge", "amethyst_roof", "templates", "sherds", "goat_horn", "disc_5", 
        "silence", "vex_trim", "spore", "map_5x5", "conduit", "chunk_loader"]
    },
    { 
      name: "Transgender", 
      members: ["WuvX"], 
      completedVol1: ["hq"],
      completedVol2: [] 
    },
  ];

  const calculateScore = (completedIds, taskList) => {
    return completedIds.reduce((total, taskId) => {
      const task = taskList.find((t) => t.id === taskId);
      return total + (task ? task.pts : 0);
    }, 0);
  };

  const currentTasks = activeVolume === 1 ? tasksVol1 : tasksVol2;

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
      .catch((err) => console.error(err));

    fetch(`https://mcapi.us/server/status?ip=${MC_SERVER_IP}&port=${MC_SERVER_PORT}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setMcPlayers({ online: data.players.now, max: data.players.max });
      })
      .catch((err) => console.error(err));
  }, []);

  const activeFactionDetails = leaderboard.find((f) => f.name === selectedFaction);
  const activeCompletions = activeVolume === 1 ? activeFactionDetails?.completedVol1 : activeFactionDetails?.completedVol2;

  return (
    <div className="min-h-screen bg-thxbai-dark text-white font-sans selection:bg-thxbai-accent/40 p-4 md:p-12 relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-thxbai-accent/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none brightness-100 contrast-150" 
             style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Brand Header */}
        <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-4 glass-card rounded-[2.5rem] p-10 flex flex-col justify-center min-h-[200px]">
          <h1 className="text-6xl font-black tracking-tighter italic mb-3 text-white uppercase italic">kthxbai</h1>
          <p className="text-thxbai-muted text-xs font-bold tracking-[0.3em] uppercase opacity-60">Est. 2026 // i hate it here</p>
        </motion.div>

        {/* MC Status */}
        <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-8 glass-card rounded-[2.5rem] p-10 flex items-center justify-between overflow-hidden relative">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-thxbai-accent uppercase italic">Femboy SMP</h2>
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
          <button onClick={() => setActiveVolume(1)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeVolume === 1 ? "bg-white text-black" : "bg-white/5 text-thxbai-muted hover:bg-white/10"}`}>Volume 1</button>
          <button onClick={() => setActiveVolume(2)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeVolume === 2 ? "bg-thxbai-accent text-white shadow-lg shadow-thxbai-accent/20" : "bg-white/5 text-thxbai-muted hover:bg-white/10"}`}>Volume 2</button>
        </div>

        {/* ONGOING EVENT / BIO */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-12 min-h-[420px] flex flex-col justify-between border-l-4 border-l-thxbai-accent">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-thxbai-accent/20 text-thxbai-accent text-[10px] font-black uppercase tracking-widest">Ongoing Event</span>
              <span className="text-thxbai-muted text-[10px] font-bold uppercase tracking-widest">Nitro Reward</span>
            </div>
            <h3 className="text-5xl font-black leading-[1.1] mb-6 tracking-tighter italic text-white uppercase italic">Volume {activeVolume} <br /> Objectives.</h3>
            <p className="text-thxbai-muted text-md max-w-2xl font-medium leading-relaxed mb-6">
              {activeVolume === 1 
                ? "The original race to dominance. Complete all 20 standard tasks." 
                : "The advanced phase. Tiered difficulty levels ranging from collection to extreme grinds."
              }
            </p>
          </div>
          <div className="border-t border-white/5 pt-6">
            <span className="block text-[10px] font-black text-thxbai-accent uppercase mb-2 italic underline">Admin Tip</span>
            <p className="text-[12px] text-thxbai-muted italic leading-relaxed max-w-3xl">
              As we no longer have the faction mod in place(rip in peace), please ensure you post a screenshot in the #minecraft-server channel when a task is completed so it can be manually logged! Do also make sure that you do not group up with more than 4 people(1 leader + 3 members).
            </p>
          </div>
        </motion.div>

        {/* LEADERBOARD CARD */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-10 border-t-4 border-t-yellow-500/20">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tight">Leaderboard</h3>
              <p className="text-thxbai-muted text-xs font-bold mt-1 uppercase tracking-widest opacity-60">Vol. {activeVolume} Rankings</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 text-lg font-bold italic">★</div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {leaderboard.map((faction, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-[2.5rem] border transition-all ${idx === 0 ? 'bg-yellow-500/5 border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.05)]' : 'bg-white/[0.02] border-white/5'}`}>
                <div className="flex items-center gap-8 mb-4 md:mb-0">
                  <span className={`text-3xl font-black italic w-8 ${idx === 0 ? 'text-yellow-500' : 'text-thxbai-muted/40'}`}>#{idx + 1}</span>
                  <div>
                    <h4 className="text-2xl font-bold tracking-tight text-white mb-3">{faction.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {faction.members.map((member) => (
                        <div key={member} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                          <MinecraftHead username={member} />
                          <span className="text-[10px] text-thxbai-muted font-bold uppercase tracking-wider">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end w-full md:w-auto">
                  <span className={`text-4xl font-black italic block ${idx === 0 ? 'text-yellow-500' : 'text-white'}`}>{faction.score}</span>
                  <span className="text-[10px] font-black text-thxbai-muted uppercase tracking-[0.2em] mt-1">Total Points</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PROGRESS TRACKER */}
        <motion.div className="md:col-span-12 glass-card rounded-[3rem] p-10 border-l-4 border-l-emerald-500/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h3 className="text-3xl font-black italic uppercase tracking-tight">Vol. {activeVolume} Progress</h3>
            <div className="flex flex-wrap gap-2">
              {leaderboard.map((faction) => (
                <button key={faction.name} onClick={() => setSelectedFaction(faction.name)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${selectedFaction === faction.name ? "bg-thxbai-accent text-white" : "bg-white/5 border border-white/5 text-thxbai-muted hover:bg-white/10"}`}>{faction.name}</button>
              ))}
            </div>
          </div>

          {activeFactionDetails && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black text-thxbai-muted uppercase tracking-widest">Completed {activeCompletions?.length || 0} of {currentTasks.length} Tasks</span>
                <span className="text-sm font-black italic text-emerald-400">{Math.round(((activeCompletions?.length || 0) / currentTasks.length) * 100)}% Complete</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentTasks.map((task) => {
                  const isCompleted = activeCompletions?.includes(task.id);
                  return (
                    <div 
                      key={task.id} 
                      className={`relative group flex justify-between items-center p-4 rounded-2xl border transition-all ${isCompleted ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-white/[0.01] border-white/5 text-thxbai-muted/40"}`}
                    >
                      {/* Tooltip Description on Hover */}
                      {task.desc && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl text-[10px] text-white leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-2xl">
                          {task.desc}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black/90"></div>
                        </div>
                      )}

                      <div className="flex flex-col">
                        {task.tier && <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-0.5">{task.tier}</span>}
                        <span className="text-xs font-medium tracking-tight">{task.name}</span>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-1 rounded ${isCompleted ? "bg-emerald-500/10" : "bg-white/[0.02]"}`}>{task.pts} PTS</span>
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
               <span className="w-1.5 h-1.5 bg-thxbai-accent rounded-full" /> {totalMembers} Members
             </span>
          </div>
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">→</div>
        </motion.a>

      </div>
    </div>
  );
}