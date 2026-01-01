import React, { useEffect, useState } from 'react';
import { Terminal, Activity, BrainCircuit, Database, Server, Code } from 'lucide-react';

const SystemMonitor: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      "Initializing core systems...",
      "Loading neural weights...",
      "Connecting to data pipelines...",
      "Optimizing inference engine...",
      "System ready."
    ];
    let i = 0;
    
    // Initial sequence
    const bootInterval = setInterval(() => {
        if (i < sequence.length) {
            setLogs(prev => [...prev, sequence[i]].slice(-5));
            i++;
        } else {
            clearInterval(bootInterval);
        }
    }, 800);

    // Random events after boot
    const loopInterval = setInterval(() => {
         if (i >= sequence.length) {
            const statuses = [
                "Processing request...", 
                "Syncing with API...", 
                "Garbage collection...", 
                "Updating cache...",
                "Analyzing metrics...",
                "Heartbeat signal sent..."
            ];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
            setLogs(prev => [...prev, `[${timestamp}] ${randomStatus}`].slice(-5));
         }
    }, 2500);

    return () => {
        clearInterval(bootInterval);
        clearInterval(loopInterval);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[320px] bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 overflow-hidden flex flex-col font-mono text-xs shadow-2xl relative group hover:border-indigo-500/30 transition-colors">
      
      {/* Top Bar */}
      <div className="bg-slate-800/80 p-3 border-b border-slate-700 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-slate-400 flex items-center gap-2">
          <Activity size={14} className="text-indigo-400 animate-pulse"/>
          <span className="tracking-wider text-[10px]">LIVE_ENV_MONITOR</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 relative">
         {/* Background Grid Effect */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.5)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>

         {/* Left: Graphic Visualization */}
         <div className="flex-1 relative border border-slate-700/50 rounded-lg bg-slate-950/30 flex items-center justify-center overflow-hidden min-h-[160px]">
             
             {/* Central Hub */}
             <div className="relative z-10 p-3 rounded-full bg-indigo-500/10 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)] animate-pulse">
                <BrainCircuit size={32} className="text-indigo-400" />
             </div>

             {/* Satellite Nodes */}
             <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800 p-1.5 rounded-md border border-slate-600 shadow-lg origin-center transform -rotate-0">
                    <Database size={14} className="text-emerald-400" />
                </div>
                <div className="absolute bottom-4 left-1/4 bg-slate-800 p-1.5 rounded-md border border-slate-600 shadow-lg origin-center transform -rotate-0">
                    <Server size={14} className="text-sky-400" />
                </div>
                <div className="absolute bottom-4 right-1/4 bg-slate-800 p-1.5 rounded-md border border-slate-600 shadow-lg origin-center transform -rotate-0">
                    <Code size={14} className="text-amber-400" />
                </div>
             </div>
             
             {/* Decor Lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                 <circle cx="50%" cy="50%" r="35%" stroke="#6366f1" strokeWidth="1" fill="none" strokeDasharray="4 4" />
             </svg>
         </div>

         {/* Right: Metrics & Terminal */}
         <div className="w-full md:w-48 flex flex-col gap-3">
             {/* Metrics */}
             <div className="grid grid-cols-2 gap-2">
                 <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
                     <div className="text-[9px] text-slate-500 uppercase">Memory</div>
                     <div className="text-emerald-400 font-bold">14%</div>
                 </div>
                 <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
                     <div className="text-[9px] text-slate-500 uppercase">Uptime</div>
                     <div className="text-sky-400 font-bold">99.9%</div>
                 </div>
             </div>

             {/* Terminal */}
             <div className="flex-1 bg-black/50 rounded border border-slate-800 p-2 font-mono text-[10px] text-slate-300 overflow-hidden flex flex-col">
                <div className="flex items-center gap-1 text-slate-600 mb-1 pb-1 border-b border-slate-800/50">
                    <Terminal size={10} /> <span>/var/log/sys</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-0.5">
                    {logs.map((log, idx) => (
                        <div key={idx} className="truncate opacity-80 animate-in fade-in slide-in-from-left-1 duration-300">
                            <span className="text-indigo-500 mr-1">{'>'}</span>{log}
                        </div>
                    ))}
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default SystemMonitor;