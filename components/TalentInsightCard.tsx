import React, { useEffect, useState } from 'react';
import { UserCheck, Star, TrendingUp, CheckCircle, BrainCircuit, Building, Users, Award } from 'lucide-react';

const TalentInsightCard: React.FC = () => {
  const [matchScore, setMatchScore] = useState(0);

  useEffect(() => {
    // Animate the score up to 98%
    const interval = setInterval(() => {
      setMatchScore(prev => {
        if (prev >= 98) {
          clearInterval(interval);
          return 98;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 font-inter relative group hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-500 transform hover:-translate-y-1">
      
      {/* Decorative Gradient Background behind header */}
      <div className="h-24 bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="px-6 pb-6 relative">
        {/* Profile Header */}
        <div className="flex justify-between items-end -mt-12 mb-6">
          <div className="relative">
             <div className="w-24 h-24 rounded-2xl bg-slate-900 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-slate-800 to-slate-900">
                AC
             </div>
             <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Verified Expert">
               <CheckCircle size={16} fill="currentColor" className="text-white" />
             </div>
          </div>
          <div className="text-right mb-1">
             <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded mb-1 inline-block">
               Top Rated Talent
             </div>
             <div className="flex items-center justify-end gap-1 text-slate-500 text-xs">
                <Building size={12} />
                <span>Open to Relocation</span>
             </div>
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Alex Chen</h3>
          <p className="text-slate-500 font-medium">Data Scientist & Full-Stack Engineer</p>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
           <div className="flex items-center gap-2 mb-3">
              <SparklesIcon className="text-indigo-500" />
              <span className="text-sm font-bold text-slate-800">AI Talent Insight</span>
           </div>
           
           <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                 <div className="text-xs text-slate-500 uppercase font-semibold">Role Match</div>
                 <div className="text-3xl font-bold text-slate-900 leading-none">{matchScore}%</div>
              </div>
              <div className="h-12 w-px bg-slate-200 mx-4"></div>
              <div className="space-y-1 flex-1">
                 <div className="text-xs text-slate-500 uppercase font-semibold">Prediction</div>
                 <div className="text-sm font-medium text-emerald-600">High Impact / Low Risk</div>
              </div>
           </div>

           <p className="text-xs text-slate-600 leading-relaxed italic border-t border-slate-200 pt-3">
             "Candidate demonstrates rare hybrid capability in <strong className="text-indigo-600">MLOps</strong> and <strong className="text-indigo-600">Product Engineering</strong>. Projected to reduce cross-functional friction and accelerate AI delivery timelines."
           </p>
        </div>

        {/* Key Strengths Pills */}
        <div className="space-y-3">
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Competencies</h4>
           <div className="flex flex-wrap gap-2">
              <Badge icon={<BrainCircuit size={14} />} text="AI Architecture" color="bg-violet-100 text-violet-700" />
              <Badge icon={<TrendingUp size={14} />} text="Business Logic" color="bg-emerald-100 text-emerald-700" />
              <Badge icon={<Users size={14} />} text="Team Leadership" color="bg-blue-100 text-blue-700" />
              <Badge icon={<Award size={14} />} text="Top 5% Coder" color="bg-amber-100 text-amber-800" />
           </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex gap-3">
           <button className="flex-1 bg-slate-900 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
             Contact Candidate
           </button>
           <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
             <UserCheck size={16} />
             <span>Save</span>
           </button>
        </div>

      </div>
    </div>
  );
};

// Helper Components
const Badge = ({ icon, text, color }: { icon: React.ReactNode, text: string, color: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${color} transition-transform hover:scale-105 cursor-default`}>
    {icon}
    {text}
  </span>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-4 h-4 ${className}`}
  >
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6.97 11.03a5.25 5.25 0 00-3.908-3.908l-.706-.201.706-.201a5.25 5.25 0 003.908-3.908l.201-.707.201.707a5.25 5.25 0 003.908 3.908l.707.201-.707.201a5.25 5.25 0 00-3.908 3.908l-.201.707-.201-.707z" clipRule="evenodd" />
  </svg>
);

export default TalentInsightCard;