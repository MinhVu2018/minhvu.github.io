import React from 'react';
import { Terminal, Circle } from 'lucide-react';

const CodeWindow: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 font-mono text-sm group hover:border-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1">
      {/* Window Header */}
      <div className="bg-[#252526] px-4 py-3 flex items-center justify-between border-b border-[#333]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-slate-500 text-xs flex items-center gap-2">
          <Terminal size={12} />
          <span>alex_profile.py</span>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Code Content */}
      <div className="p-6 overflow-x-auto">
        <div className="leading-relaxed">
          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">1</span>
            <span className="text-[#c586c0]">class</span> <span className="text-[#4ec9b0] ml-2">AlexChen</span><span className="text-[#d4d4d4]">(</span><span className="text-[#4ec9b0]">DataScientist</span><span className="text-[#d4d4d4]">,</span> <span className="text-[#4ec9b0] ml-1">Engineer</span><span className="text-[#d4d4d4]">):</span>
          </div>
          
          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">2</span>
            <span className="ml-4 text-[#569cd6]">def</span> <span className="text-[#dcdcaa] ml-2">__init__</span><span className="text-[#d4d4d4]">(</span><span className="text-[#9cdcfe]">self</span><span className="text-[#d4d4d4]">):</span>
          </div>
          
          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">3</span>
            <span className="ml-8 text-[#9cdcfe]">self</span><span className="text-[#d4d4d4]">.name</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178] ml-2">"Alex Chen"</span>
          </div>

          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">4</span>
            <span className="ml-8 text-[#9cdcfe]">self</span><span className="text-[#d4d4d4]">.skills</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#da70d6]">[</span>
          </div>

          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">5</span>
            <span className="ml-12 text-[#ce9178]">"Python"</span><span className="text-[#d4d4d4]">,</span> <span className="text-[#ce9178] ml-2">"React"</span><span className="text-[#d4d4d4]">,</span> <span className="text-[#ce9178] ml-2">"PyTorch"</span><span className="text-[#d4d4d4]">,</span>
          </div>

          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">6</span>
            <span className="ml-12 text-[#ce9178]">"AWS"</span><span className="text-[#d4d4d4]">,</span> <span className="text-[#ce9178] ml-2">"Gemini API"</span>
          </div>

          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">7</span>
            <span className="ml-8 text-[#da70d6]">]</span>
          </div>
          
          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">8</span>
            <span className="text-slate-500 italic ml-4"># Focusing on high-impact AI systems</span>
          </div>

          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">9</span>
            <span className="ml-4 text-[#569cd6]">def</span> <span className="text-[#dcdcaa] ml-2">get_mission</span><span className="text-[#d4d4d4]">(</span><span className="text-[#9cdcfe]">self</span><span className="text-[#d4d4d4]">):</span>
          </div>

          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4">10</span>
            <span className="ml-8 text-[#c586c0]">return</span> <span className="text-[#ce9178] ml-2">"Bridge data & deployment"</span>
          </div>
        </div>
        
        {/* Terminal Output Simulation */}
        <div className="mt-6 pt-4 border-t border-[#333]">
           <div className="flex items-center text-[#d4d4d4] gap-2">
             <span className="text-emerald-500">➜</span>
             <span>python alex_profile.py</span>
           </div>
           <div className="text-slate-400 mt-1 animate-pulse">
             Running diagnostic... Systems Optimal.
           </div>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;