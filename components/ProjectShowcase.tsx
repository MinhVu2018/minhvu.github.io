import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Smartphone, Layers, BrainCircuit, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectShowcaseProps {
  projects: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const progressInterval = useRef<number | null>(null);
  const SLIDE_DURATION = 6000; 
  const REFRESH_RATE = 50; 

  const project = projects[currentIndex];

  // Auto-advance logic
  useEffect(() => {
    if (isPaused) return;

    progressInterval.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / REFRESH_RATE));
      });
    }, REFRESH_RATE);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPaused, projects.length]);

  // Reset progress when index changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const changeSlide = (newIndex: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex(newIndex);
    setProgress(0);
    setTimeout(() => setAnimating(false), 500);
  };

  const handleNext = () => {
    changeSlide((currentIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    changeSlide((currentIndex - 1 + projects.length) % projects.length);
  };

  return (
    <div 
      className="w-full max-w-7xl mx-auto py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 
         Main Card Container 
         Fixed Height on Desktop (h-[600px]) ensures scalability regardless of text length.
         On mobile, it adapts naturally.
      */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden grid lg:grid-cols-12 h-auto lg:h-[600px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-indigo-500/30">
        
        {/* LEFT COLUMN: IMAGE & NAV (Takes 7 cols on desktop) */}
        <div className="lg:col-span-7 relative bg-slate-100 dark:bg-slate-950 h-[400px] lg:h-full group overflow-hidden">
            
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 transition-transform duration-700 ease-in-out transform scale-100 group-hover:scale-105">
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Navigation Overlay Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg"
                    aria-label="Previous"
                >
                    <ChevronLeft size={28} />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg"
                    aria-label="Next"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            {/* Progress Bar (Bottom of Image) */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-700/50">
                <div 
                    className="h-full bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

             {/* Category Badge (Top Left) */}
            <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-lg text-xs font-mono font-bold text-white flex items-center gap-2 shadow-lg">
                    {project.category === 'Data Science' ? <BrainCircuit size={14} className="text-emerald-400" /> : 
                    project.category === 'Mobile Engineering' ? <Smartphone size={14} className="text-cyan-400" /> : 
                    <Layers size={14} className="text-purple-400" />}
                    {project.category}
                </span>
            </div>

            {/* Image Counter (Bottom Right) */}
            <div className="absolute bottom-6 right-6">
                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono text-white/80">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: TEXT CONTENT (Takes 5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col h-full relative bg-white dark:bg-slate-900">
            
            {/* Header Area */}
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-4 overflow-x-auto no-scrollbar">
                    {project.tech.map(t => (
                        <span key={t} className="shrink-0 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                            {t}
                        </span>
                    ))}
                </div>
                
                <h3 key={`title-${currentIndex}`} className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-2 animate-fade-in-up">
                    {project.title}
                </h3>
            </div>

            {/* Scrollable Description Area 
                This is the key for scalability. 
                flex-1 makes it take remaining space. 
                overflow-y-auto enables scrolling for long text without growing the card.
            */}
            <div className="flex-1 overflow-y-auto px-8 custom-scrollbar">
                <div key={`desc-${currentIndex}`} className="animate-fade-in-up">
                    <p className="text-lg font-medium text-indigo-600 dark:text-amber-500 mb-4">
                        {project.description}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base border-l-2 border-slate-200 dark:border-slate-700 pl-4 mb-6">
                        {project.longDescription}
                    </p>
                </div>
            </div>

            {/* Footer / Actions Area */}
            <div className="p-8 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 mt-auto">
                <div className="flex gap-4">
                     {project.repoUrl && (
                        <a 
                            href={project.repoUrl}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                        >
                            <Github size={18} />
                            <span>Code</span>
                        </a>
                     )}
                     {project.demoUrl ? (
                        <a 
                            href={project.demoUrl}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 dark:bg-amber-600 text-white font-bold text-sm hover:bg-indigo-700 dark:hover:bg-amber-700 transition-colors shadow-lg shadow-indigo-500/20 dark:shadow-amber-500/20"
                        >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                        </a>
                     ) : (
                         <button disabled className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 text-sm cursor-not-allowed opacity-50">
                             <Maximize2 size={18} />
                             <span>Internal Tool</span>
                         </button>
                     )}
                </div>
            </div>

        </div>
      </div>
      
      {/* Mobile Pagination Dots (Hidden on Desktop) */}
      <div className="flex justify-center gap-2 mt-6 lg:hidden">
            {projects.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => changeSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-slate-700'}`}
                />
            ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;