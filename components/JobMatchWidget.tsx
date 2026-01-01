import React from 'react';
import { Briefcase, Sparkles, MessageSquare } from 'lucide-react';

const JobMatchWidget: React.FC = () => {
  
  const handleTriggerChat = () => {
    // Dispatch event to open AI Chat with recruiter context
    const event = new CustomEvent('open-ai-chat', {
        detail: { 
            initialBotMessage: "Hello! I'm ready to analyze a Job Description. Please paste the JD below, and I'll evaluate how well my skills match the role!"
        }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="w-full max-w-4xl mx-auto dark:bg-slate-900/80 bg-white/80 backdrop-blur-md border dark:border-indigo-500/30 border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative group">
       <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
       
       <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wide mb-4 border border-indigo-200 dark:border-indigo-500/30">
                <Briefcase size={14} /> Recruiter Tool
             </div>
             <h2 className="text-3xl font-bold dark:text-white text-slate-900 mb-2">Hiring? Don't Guess.</h2>
             <p className="text-lg dark:text-slate-400 text-slate-600">
                Let my AI assistant analyze your Job Description instantly. It will give you a fair compatibility score, list strengths, and highlight potential gaps.
             </p>
          </div>

          <button 
             onClick={handleTriggerChat}
             className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3 shrink-0"
          >
             <Sparkles size={20} className="text-yellow-300" />
             <span>Check Candidate Fit</span>
             <MessageSquare size={18} className="opacity-70" />
          </button>
       </div>
    </div>
  );
};

export default JobMatchWidget;