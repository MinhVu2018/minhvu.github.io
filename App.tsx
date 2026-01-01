import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, Twitter, Download, BrainCircuit, ChevronDown, Sun, Moon, Briefcase } from 'lucide-react';
import NeuralArchitecture from './components/NeuralArchitecture';
import ProjectShowcase from './components/ProjectShowcase';
import BlogReader from './components/BlogReader';
import CertificateWall from './components/CertificateWall';
import AIChat from './components/AIChat';
import { PROJECTS, BLOGS, PORTFOLIO_OWNER } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const triggerAIChat = (message: string) => {
    const event = new CustomEvent('open-ai-chat', {
      detail: { message }
    });
    window.dispatchEvent(event);
  };

  const triggerRecruiterMode = () => {
    const event = new CustomEvent('open-ai-chat', {
        detail: { 
            initialBotMessage: "Hello! I'm ready to analyze a Job Description. Please paste the JD below, and I'll evaluate how well my skills match the role!"
        }
    });
    window.dispatchEvent(event);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`${theme}`}>
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a] overflow-x-hidden selection:bg-indigo-500/30 font-inter transition-colors duration-500">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full dark:bg-[#0f172a]/80 bg-slate-50/80 backdrop-blur-md z-40 border-b dark:border-slate-800 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="dark:bg-indigo-600 bg-amber-500 p-1.5 rounded-lg shadow-lg dark:shadow-indigo-600/30 shadow-amber-500/30">
                <BrainCircuit size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400 from-slate-700 to-slate-900 bg-clip-text text-transparent">
                minhvu.online
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Certifications', 'Insights', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="dark:text-slate-300 text-slate-600 dark:hover:text-white hover:text-amber-600 transition-colors text-sm font-medium">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden min-h-screen flex items-center">
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[800px] h-[800px] dark:bg-indigo-600/5 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] dark:bg-cyan-600/5 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          {/* Left Column: Text */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full dark:bg-slate-800/80 bg-white border dark:border-emerald-500/30 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-8 backdrop-blur-sm animate-fade-in-up">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Open for Collaboration</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight dark:text-white text-slate-900 mb-6 leading-[1.1]">
              Bridging Theory & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 from-amber-600 via-orange-600 to-amber-600">Applied Intelligence</span>
            </h1>
            
            <p className="text-xl dark:text-slate-400 text-slate-600 mb-10 max-w-lg leading-relaxed">
              I am <strong className="dark:text-slate-200 text-slate-900">{PORTFOLIO_OWNER}</strong>, a Data Scientist who codes. 
              Specializing in scalable <span className="dark:text-indigo-300 text-amber-700">Machine Learning</span> and production-grade <span className="dark:text-indigo-300 text-amber-700">AI Systems</span>.
            </p>

            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a 
                 href="#" 
                 className="flex-1 sm:flex-none px-8 py-4 dark:bg-white bg-slate-900 dark:text-slate-900 text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-100 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} className="dark:text-indigo-600 text-amber-400" />
                <span>Resume</span>
              </a>

               <button 
                onClick={triggerRecruiterMode}
                className="flex-1 sm:flex-none px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Briefcase size={20} className="text-indigo-100" />
                <span>Recruiter Check</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative animate-float">
             {/* Abstract Decor */}
             <div className="absolute -top-10 -right-10 w-40 h-40 dark:bg-indigo-500/10 bg-amber-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
             
             {/* Neural Architecture Component */}
             <div className="relative z-10 transform lg:rotate-y-[-5deg] lg:rotate-x-[2deg] transition-transform hover:transform-none duration-700 perspective-1000">
               <NeuralArchitecture />
             </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
          <ChevronDown className="dark:text-slate-400 text-slate-600" size={24} />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 dark:bg-slate-900 bg-slate-50 border-y dark:border-slate-800 border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Technical Credentials</h2>
                <p className="dark:text-slate-400 text-slate-500 text-sm">Verified expertise in Cloud Architecture and Deep Learning.</p>
              </div>
              <div className="hidden md:block h-px flex-1 dark:bg-slate-800 bg-slate-200 ml-8"></div>
           </div>
           <CertificateWall />
        </div>
      </section>

      {/* Blog Section (Split Screen) */}
      <section id="insights" className="py-24 px-4 dark:bg-[#0f172a] bg-[#f1f5f9] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-4">Research & Thoughts</h2>
            <p className="dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
              Exploring the intersection of MLOps, Mobile Engineering, and Large Language Models.
            </p>
          </div>
          
          <BlogReader blogs={BLOGS} />
        </div>
      </section>

      {/* Projects Section (Carousel) */}
      <section id="projects" className="py-24 px-4 dark:bg-slate-900/30 bg-slate-100 relative">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-slate-900 mb-6">Featured Deployments</h2>
            <div className="h-1 w-24 bg-gradient-to-r dark:from-indigo-500 dark:to-cyan-500 from-amber-500 to-orange-500 rounded-full"></div>
          </div>

          <ProjectShowcase projects={PROJECTS} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 border-t dark:border-slate-800 border-slate-200 dark:bg-[#0f172a] bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-8">Let's solve the next problem</h2>
          <p className="dark:text-slate-400 text-slate-600 text-lg mb-12">
            Open for opportunities in <strong>Machine Learning Engineering</strong>, <strong>Data Science</strong>, and <strong>AI Prototyping</strong>.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:hello@minhvu.online" className="flex items-center gap-3 px-8 py-4 dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border dark:border-slate-700 border-slate-200 rounded-xl transition-all w-full md:w-auto justify-center group">
              <Mail className="dark:text-indigo-400 text-amber-600 group-hover:dark:text-white transition-colors" />
              <span className="dark:text-slate-200 text-slate-700 font-medium">hello@minhvu.online</span>
            </a>
            
            <div className="flex gap-4">
               <a href="#" className="p-4 dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border dark:border-slate-700 border-slate-200 rounded-xl transition-all dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:border-indigo-500/50 hover:border-amber-500/50">
                 <Github size={24} />
               </a>
               <a href="#" className="p-4 dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border dark:border-slate-700 border-slate-200 rounded-xl transition-all dark:text-slate-400 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 dark:hover:border-blue-500/50 hover:border-blue-500/50">
                 <Linkedin size={24} />
               </a>
               <a href="#" className="p-4 dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border dark:border-slate-700 border-slate-200 rounded-xl transition-all dark:text-slate-400 text-slate-600 dark:hover:text-sky-400 hover:text-sky-500 dark:hover:border-sky-500/50 hover:border-sky-500/50">
                 <Twitter size={24} />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t dark:border-slate-800 border-slate-200 text-center dark:bg-[#0f172a] bg-white">
        <p className="dark:text-slate-500 text-slate-400 text-sm">
          © {new Date().getFullYear()} {PORTFOLIO_OWNER}. Data Scientist & AI Engineer.
        </p>
      </footer>

      {/* Theme Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
         <button 
           onClick={toggleTheme}
           className="p-4 rounded-full shadow-xl transition-all duration-300 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200 dark:text-yellow-400 text-slate-400 hover:scale-110"
           aria-label="Toggle Theme"
         >
           {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
         </button>
      </div>

      {/* AI Chat Widget */}
      <AIChat />
    </div>
    </div>
  );
};

export default App;