import React from 'react';
import { Github, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { Project, TechStack } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleAskAI = () => {
    const event = new CustomEvent('open-ai-chat', {
      detail: { message: `Can you explain the technical details of the "${project.title}" project? What challenges did you face?` }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full relative">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${
            project.category === 'Data Science' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' :
            project.category === 'Software Engineering' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' :
            'bg-purple-500/20 border-purple-500/50 text-purple-300'
          }`}>
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
            {project.title}
            </h3>
        </div>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-md bg-slate-700/50 text-slate-300 font-mono border border-slate-700/50">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-4">
            {project.repoUrl && (
                <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                >
                <Github size={16} />
                <span>Source</span>
                </a>
            )}
            {project.demoUrl && (
                <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                <ExternalLink size={16} />
                <span>Live Demo</span>
                </a>
            )}
            {!project.repoUrl && !project.demoUrl && (
                <span className="flex items-center space-x-1.5 text-sm text-slate-500 cursor-not-allowed">
                <Code2 size={16} />
                <span>Private</span>
                </span>
            )}
          </div>

          <button 
             onClick={handleAskAI}
             className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/30 px-2 py-1 rounded-md transition-all border border-indigo-500/20 hover:border-indigo-500/50"
             title="Ask AI about this project"
          >
              <Sparkles size={12} />
              <span>Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;