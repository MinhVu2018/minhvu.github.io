import React, { useState } from 'react';
import { Clock, Hash, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { BlogPost } from '../types';
import { generateContent } from '../services/geminiService';

interface BlogReaderProps {
  blogs: BlogPost[];
}

const BlogReader: React.FC<BlogReaderProps> = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost>(blogs[0]);
  const [summary, setSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Reset summary when blog changes
  React.useEffect(() => {
    setSummary(null);
  }, [selectedBlog.id]);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
        const prompt = `Summarize the following technical article in 3 concise bullet points. Focus on the problem, solution, and results:\n\nTitle: ${selectedBlog.title}\n\nContent:\n${selectedBlog.content}`;
        const result = await generateContent(prompt);
        setSummary(result);
    } catch (e) {
        setSummary("Failed to generate summary. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="w-full dark:bg-slate-900/50 bg-white border dark:border-slate-700/50 border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] shadow-2xl">
      
      {/* Content Viewer (Left) */}
      <div className="w-full md:w-2/3 dark:bg-slate-950 bg-white relative overflow-y-auto custom-scrollbar order-2 md:order-1 border-r dark:border-slate-700/50 border-slate-200">
         {selectedBlog ? (
           <div className="p-8 md:p-12 max-w-3xl mx-auto">
              <div className="mb-8 pb-8 border-b dark:border-slate-800 border-slate-100">
                 <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mb-4">
                    <span className="flex items-center gap-1"><Clock size={12}/> {selectedBlog.readTime}</span>
                    <span>•</span>
                    <span>{selectedBlog.date}</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-6 leading-tight">
                   {selectedBlog.title}
                 </h2>

                 {/* AI Summary Section */}
                 <div className="mb-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-300">
                            <Sparkles size={16} /> AI Summary
                        </h4>
                        {!summary && !isGenerating && (
                            <button 
                                onClick={handleGenerateSummary}
                                className="text-xs bg-white dark:bg-indigo-600 shadow-sm border border-indigo-200 dark:border-indigo-500 px-3 py-1 rounded-full text-indigo-600 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-500 transition-colors"
                            >
                                Generate TL;DR
                            </button>
                        )}
                     </div>
                     
                     {isGenerating && (
                         <div className="flex items-center gap-2 text-xs text-indigo-500 animate-pulse py-2">
                             <Loader2 size={14} className="animate-spin" /> Reading article...
                         </div>
                     )}

                     {summary && (
                         <div className="prose prose-sm dark:prose-invert text-slate-700 dark:text-indigo-100/90 text-sm leading-relaxed animate-in fade-in">
                             {summary.split('\n').map((line, i) => (
                                 <p key={i} className="mb-1">{line}</p>
                             ))}
                         </div>
                     )}
                     
                     {!summary && !isGenerating && (
                         <p className="text-xs text-indigo-500/70 dark:text-indigo-400/60 italic">
                             Get a quick AI-powered overview of this article.
                         </p>
                     )}
                 </div>

                 <p className="text-lg dark:text-slate-400 text-slate-600 leading-relaxed italic">
                   {selectedBlog.summary}
                 </p>
              </div>
              
              <div className="prose dark:prose-invert prose-slate prose-lg max-w-none">
                {selectedBlog.content.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('# ')) return <h1 key={idx} className="text-2xl font-bold dark:text-white text-slate-900 mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
                  if (paragraph.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold dark:text-indigo-400 text-amber-600 mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                  if (paragraph.startsWith('### ')) return <h3 key={idx} className="text-lg font-bold dark:text-white text-slate-800 mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                  if (paragraph.trim().match(/^\d\./)) return <div key={idx} className="ml-4 mb-2 dark:text-slate-300 text-slate-700 font-medium">{paragraph}</div>;
                  if (!paragraph.trim()) return <br key={idx} />;
                  return <p key={idx} className="dark:text-slate-400 text-slate-600 leading-7 mb-4">{paragraph}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t dark:border-slate-800 border-slate-100">
                 <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-3 py-1 dark:bg-indigo-900/20 bg-amber-100 dark:text-indigo-300 text-amber-800 rounded-full text-sm border dark:border-indigo-500/20 border-amber-200">
                        <Hash size={12} /> {tag}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
         ) : (
           <div className="flex items-center justify-center h-full text-slate-600">
             Select an article to read
           </div>
         )}
      </div>

      {/* Sidebar List (Right) */}
      <div className="w-full md:w-1/3 dark:bg-slate-900/80 bg-slate-50/80 backdrop-blur-md flex flex-col order-1 md:order-2">
         <div className="p-4 border-b dark:border-slate-700/50 border-slate-200 dark:bg-slate-900 bg-slate-100">
            <h3 className="text-sm font-bold dark:text-slate-400 text-slate-500 uppercase tracking-wider flex items-center gap-2">
               <BookOpen size={16} /> Library
            </h3>
         </div>
         <div className="flex-1 overflow-y-auto">
            {blogs.map((blog) => (
               <button
                 key={blog.id}
                 onClick={() => setSelectedBlog(blog)}
                 className={`w-full text-left p-5 border-b dark:border-slate-800 border-slate-200 transition-all dark:hover:bg-slate-800/50 hover:bg-white group ${selectedBlog.id === blog.id ? 'dark:bg-indigo-900/10 bg-amber-50 dark:border-l-indigo-500 border-l-amber-500 border-l-4' : 'border-l-4 border-l-transparent'}`}
               >
                 <span className="text-xs text-slate-500 font-mono mb-1 block">{blog.date}</span>
                 <h4 className={`font-semibold mb-2 transition-colors ${selectedBlog.id === blog.id ? 'dark:text-indigo-400 text-amber-700' : 'dark:text-slate-300 text-slate-700 dark:group-hover:text-white group-hover:text-slate-900'}`}>
                   {blog.title}
                 </h4>
                 <div className="flex items-center gap-2">
                   {blog.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="text-[10px] dark:bg-slate-800 bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 border dark:border-slate-700 border-slate-300">
                       #{tag}
                     </span>
                   ))}
                 </div>
               </button>
            ))}
         </div>
      </div>

    </div>
  );
};

export default BlogReader;