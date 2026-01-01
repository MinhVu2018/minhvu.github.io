import React, { useState } from 'react';
import { Layers, Smartphone, Server, Brain, Database, Code2 } from 'lucide-react';

interface SystemLayer {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  activeColor: string; // Tailwind class for text color in active state
  borderColor: string;
  bgGradient: string;
  skills: string[];
  description: string;
}

const LAYERS: SystemLayer[] = [
  {
    id: 'mobile',
    name: 'Interface Layer',
    role: 'Frontend & Mobile',
    icon: <Smartphone size={20} />,
    activeColor: 'dark:text-cyan-400 text-blue-600',
    borderColor: 'dark:border-cyan-500/50 border-blue-500/30',
    bgGradient: 'dark:from-cyan-500/10 dark:to-blue-500/5 from-blue-100 to-cyan-50',
    skills: ['React', 'React Native', 'Swift', 'Tailwind'],
    description: 'The visual touchpoint. I build clean, minimalist interfaces that hide the complexity of the underlying AI models.'
  },
  {
    id: 'ai',
    name: 'Inference Layer',
    role: 'AI & Data Science',
    icon: <Brain size={20} />,
    activeColor: 'dark:text-indigo-400 text-amber-600',
    borderColor: 'dark:border-indigo-500/50 border-amber-500/30',
    bgGradient: 'dark:from-indigo-500/10 dark:to-violet-500/5 from-amber-100 to-orange-50',
    skills: ['PyTorch', 'Gemini API', 'LangChain', 'OpenCV'],
    description: 'The brain of the system. Designing custom RAG pipelines, fine-tuning LLMs, and optimizing computer vision models.'
  },
  {
    id: 'backend',
    name: 'Orchestration',
    role: 'Backend Engineering',
    icon: <Server size={20} />,
    activeColor: 'dark:text-purple-400 text-purple-600',
    borderColor: 'dark:border-purple-500/50 border-purple-500/30',
    bgGradient: 'dark:from-purple-500/10 dark:to-fuchsia-500/5 from-purple-100 to-fuchsia-50',
    skills: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
    description: 'High-throughput APIs ensuring that the AI models are served efficiently with low latency and high availability.'
  },
  {
    id: 'infra',
    name: 'Infrastructure',
    role: 'MLOps & Cloud',
    icon: <Database size={20} />,
    activeColor: 'dark:text-emerald-400 text-emerald-600',
    borderColor: 'dark:border-emerald-500/50 border-emerald-500/30',
    bgGradient: 'dark:from-emerald-500/10 dark:to-teal-500/5 from-emerald-100 to-teal-50',
    skills: ['AWS SageMaker', 'Docker', 'Terraform', 'CI/CD'],
    description: 'The foundation. Automated training pipelines and scalable container orchestration for production-grade reliability.'
  }
];

const NeuralArchitecture: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto font-inter perspective-1000">
      <div className="relative dark:bg-slate-900/80 bg-white/60 backdrop-blur-xl rounded-2xl border dark:border-slate-700/60 border-slate-200 p-6 md:p-8 shadow-2xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
        
        {/* Background Grid */}
        <div className="absolute inset-0 dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Header */}
        <div className="relative z-10 flex justify-between items-start mb-8 border-b dark:border-slate-800 border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <Layers className="dark:text-indigo-400 text-amber-600" size={18} />
               <h3 className="text-xs font-mono dark:text-indigo-400 text-amber-700 uppercase tracking-widest">Tech Stack Blueprint</h3>
            </div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900">Architecture Overview</h2>
            <p className="dark:text-slate-400 text-slate-500 text-sm mt-1">From Model Training to End-User Application.</p>
          </div>
          <div className="dark:bg-slate-800/50 bg-slate-100 px-3 py-1 rounded-full border dark:border-slate-700 border-slate-200">
             <span className="flex items-center gap-2 text-[10px] dark:text-emerald-400 text-emerald-700 font-mono">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                SYSTEM ONLINE
             </span>
          </div>
        </div>

        {/* Stack Visualization */}
        <div className="relative z-10 space-y-3">
          {LAYERS.map((layer, index) => {
            const isActive = activeLayer === layer.id;
            const isHovered = activeLayer !== null;
            
            return (
              <div key={layer.id} className="relative">
                {/* Connecting Lines (except for last item) */}
                {index !== LAYERS.length - 1 && (
                  <div className="absolute left-8 bottom-[-16px] h-4 w-0.5 dark:bg-slate-700/50 bg-slate-300 z-0">
                    <div className="absolute inset-0 dark:bg-indigo-500/50 bg-amber-500/50 animate-pulse-flow"></div>
                  </div>
                )}

                <div 
                  className={`
                    relative z-10 rounded-xl border p-4 cursor-pointer transition-all duration-300
                    ${isActive 
                      ? `${layer.borderColor} dark:bg-slate-800 bg-white shadow-lg scale-[1.02]` 
                      : 'dark:border-slate-800 border-slate-200 dark:bg-slate-800/40 bg-slate-50 hover:bg-white dark:hover:bg-slate-800/60 dark:hover:border-slate-600 hover:border-slate-300'}
                    ${isHovered && !isActive ? 'opacity-50 blur-[1px]' : 'opacity-100'}
                  `}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon Box */}
                    <div className={`
                      p-3 rounded-lg dark:bg-slate-900 bg-slate-100 dark:border-slate-700 border-slate-200 shrink-0 transition-colors
                      ${isActive ? layer.activeColor : 'dark:text-slate-500 text-slate-400'}
                    `}>
                      {layer.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center mb-1">
                          <h4 className={`font-bold text-sm ${isActive ? 'dark:text-white text-slate-900' : 'dark:text-slate-300 text-slate-600'}`}>
                            {layer.name}
                          </h4>
                          <span className="text-[10px] font-mono dark:text-slate-500 text-slate-400 uppercase tracking-wide">{layer.role}</span>
                       </div>
                       
                       {/* Expanded Details */}
                       <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                          <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-3 border-l-2 dark:border-slate-700 border-slate-300 pl-3">
                            {layer.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                             {layer.skills.map(skill => (
                               <span key={skill} className={`text-[10px] px-2 py-1 rounded dark:bg-slate-900 bg-slate-50 dark:border-slate-700 border-slate-200 font-mono ${layer.activeColor}`}>
                                 {skill}
                               </span>
                             ))}
                          </div>
                       </div>

                       {/* Collapsed Hints */}
                       {!isActive && (
                          <div className="flex gap-2 mt-1">
                             {layer.skills.slice(0, 3).map(skill => (
                               <span key={skill} className="text-[10px] dark:text-slate-500 text-slate-500 font-mono dark:bg-slate-900/50 bg-slate-200/50 px-1.5 py-0.5 rounded">
                                 {skill}
                               </span>
                             ))}
                             <span className="text-[10px] text-slate-400 self-center">+</span>
                          </div>
                       )}
                    </div>

                    {/* Active Indicator Arrow */}
                    <div className={`self-center transition-transform duration-300 ${isActive ? `rotate-90 ${layer.activeColor}` : 'text-slate-400'}`}>
                       <Code2 size={16} />
                    </div>
                  </div>
                  
                  {/* Background Gradient Effect */}
                  {isActive && (
                     <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${layer.bgGradient} opacity-100 pointer-events-none -z-10`}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NeuralArchitecture;