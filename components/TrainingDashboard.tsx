import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, Zap, Server, GitBranch, Database, HardDrive, Share2 } from 'lucide-react';

const TrainingDashboard: React.FC = () => {
  const [data, setData] = useState<{ step: number; loss: number; accuracy: number }[]>([]);
  const [metrics, setMetrics] = useState({
    epoch: 1,
    batchSize: 32,
    learningRate: 0.001,
    gpuTemp: 65,
    gpuUtil: 45
  });

  // Simulation Loop
  useEffect(() => {
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      step: i * 100,
      loss: 2.5 - Math.log(i + 1) * 0.5 + Math.random() * 0.2,
      accuracy: 0.2 + Math.log(i + 1) * 0.15 + Math.random() * 0.05
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData(prev => {
        const lastStep = prev[prev.length - 1].step;
        const newStep = lastStep + 100;
        
        // Simulate converging loss and increasing accuracy
        const baseLoss = Math.max(0.1, 2.5 - Math.log((newStep / 100) + 1) * 0.6);
        const newLoss = baseLoss + (Math.random() * 0.1 - 0.05);
        
        const baseAcc = Math.min(0.98, 0.2 + Math.log((newStep / 100) + 1) * 0.2);
        const newAcc = baseAcc + (Math.random() * 0.05 - 0.025);

        const newData = [...prev, { step: newStep, loss: newLoss, accuracy: newAcc }];
        if (newData.length > 20) newData.shift(); // Keep window size fixed
        return newData;
      });

      setMetrics(prev => ({
        ...prev,
        gpuUtil: Math.min(99, Math.max(70, prev.gpuUtil + (Math.random() * 10 - 5))),
        gpuTemp: Math.min(85, Math.max(60, prev.gpuTemp + (Math.random() * 4 - 2))),
        epoch: Math.floor(Date.now() / 10000) % 100 // Mock epoch increment
      }));

    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-slate-700/60 font-sans group hover:border-indigo-500/30 transition-all duration-500">
      
      {/* Header Panel */}
      <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
          </div>
          <span className="text-slate-200 text-xs font-semibold tracking-wide uppercase">Model Training: <span className="text-indigo-400">Transformer-XL</span></span>
        </div>
        <div className="flex space-x-2 text-[10px] font-mono text-slate-500">
          <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700">v2.4.0</span>
          <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700">REGION: US-EAST</span>
        </div>
      </div>

      <div className="p-5 grid gap-6">
        
        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-4">
           <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 opacity-10"><Activity size={40} /></div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Current Loss</p>
              <p className="text-2xl font-bold text-white mt-1 font-mono">
                {data.length > 0 ? data[data.length - 1].loss.toFixed(4) : '...'}
              </p>
           </div>
           <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 opacity-10"><Zap size={40} /></div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Accuracy</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                {data.length > 0 ? (data[data.length - 1].accuracy * 100).toFixed(1) : '...'}%
              </p>
           </div>
           <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 opacity-10"><GitBranch size={40} /></div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Epoch</p>
              <p className="text-2xl font-bold text-indigo-400 mt-1 font-mono">{metrics.epoch}/100</p>
           </div>
        </div>

        {/* Main Chart Area */}
        <div className="h-48 w-full bg-slate-800/20 rounded-lg border border-slate-700/30 p-2 relative">
           <p className="absolute top-2 left-4 text-[10px] text-slate-500 font-mono z-10">LOSS_CURVE_REALTIME</p>
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}>
               <defs>
                 <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                   <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
               <XAxis dataKey="step" hide />
               <YAxis hide domain={['auto', 'auto']} />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                 itemStyle={{ color: '#818cf8' }}
                 labelStyle={{ display: 'none' }}
               />
               <Area 
                 type="monotone" 
                 dataKey="loss" 
                 stroke="#6366f1" 
                 strokeWidth={2} 
                 fillOpacity={1} 
                 fill="url(#colorLoss)" 
                 isAnimationActive={false}
               />
             </AreaChart>
           </ResponsiveContainer>
        </div>

        {/* System Status Grid */}
        <div className="grid grid-cols-2 gap-4">
           {/* GPU Status */}
           <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                 <div className="flex items-center gap-1.5">
                   <Cpu size={14} className="text-indigo-400"/>
                   <span>NVIDIA A100-SXM4</span>
                 </div>
                 <span className="font-mono text-white">{metrics.gpuTemp}°C</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                 <div 
                   className="bg-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
                   style={{ width: `${metrics.gpuUtil}%` }}
                 ></div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                 <div className="flex items-center gap-1.5">
                   <HardDrive size={14} className="text-cyan-400"/>
                   <span>VRAM Usage</span>
                 </div>
                 <span className="font-mono text-white">78.4 GB</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                 <div className="bg-cyan-500 h-full rounded-full w-[85%]"></div>
              </div>
           </div>

           {/* Deployment Pipeline Status */}
           <div className="bg-slate-900/50 rounded border border-slate-700/50 p-2 flex flex-col justify-center space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                 <Server size={10} /> <span>PIPELINE STATUS</span>
              </div>
              <div className="space-y-1.5">
                 <div className="flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400">● Data Ingestion</span>
                    <span className="text-slate-500">Done</span>
                 </div>
                 <div className="flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400">● Preprocessing</span>
                    <span className="text-slate-500">Done</span>
                 </div>
                 <div className="flex items-center justify-between text-[10px]">
                    <span className="text-yellow-400 animate-pulse">● Training</span>
                    <span className="text-slate-300">In Progress</span>
                 </div>
                 <div className="flex items-center justify-between text-[10px] opacity-50">
                    <span className="text-slate-500">○ Evaluation</span>
                    <span className="text-slate-600">Pending</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;