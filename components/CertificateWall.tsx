import React, { useState } from 'react';
import { Award, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../constants';
import { Certificate } from '../types';

const CertificateWall: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {CERTIFICATES.map((cert) => (
          <button 
            key={cert.id} 
            onClick={() => setSelectedCert(cert)}
            className="group relative dark:bg-slate-800/40 bg-white/60 backdrop-blur-sm border dark:border-slate-700 border-slate-200 rounded-xl p-5 overflow-hidden transition-all duration-300 dark:hover:border-indigo-500/50 hover:border-amber-500/50 hover:shadow-lg hover:-translate-y-1 text-left w-full"
          >
            {/* Holographic Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-10"></div>
            
            <div className="flex flex-col h-full justify-between relative z-0">
               <div className="flex justify-between items-start mb-4 w-full">
                  <div className="p-2 dark:bg-slate-900 bg-slate-100 rounded-lg border dark:border-slate-700 border-slate-200 dark:text-indigo-400 text-amber-600 group-hover:text-white dark:group-hover:bg-indigo-600 group-hover:bg-amber-500 transition-colors">
                     <Award size={20} />
                  </div>
                  <span className="text-[10px] font-mono dark:text-slate-500 text-slate-500 border dark:border-slate-700 border-slate-200 px-1.5 py-0.5 rounded dark:bg-slate-900/50 bg-slate-100">
                    {cert.date}
                  </span>
               </div>
               
               <div>
                 <h4 className="dark:text-white text-slate-900 font-semibold leading-tight mb-1 dark:group-hover:text-indigo-200 group-hover:text-amber-800 transition-colors">
                   {cert.name}
                 </h4>
                 <p className="text-xs text-slate-500 flex items-center gap-1">
                   <ShieldCheck size={10} /> {cert.issuer}
                 </p>
               </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedCert(null)}>
           <div 
             className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-200"
             onClick={(e) => e.stopPropagation()} 
           >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award size={18} className="text-indigo-500" />
                    {selectedCert.name}
                 </h3>
                 <button 
                   onClick={() => setSelectedCert(null)}
                   className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                 >
                   <X size={20} />
                 </button>
              </div>

              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                 {selectedCert.imageUrl ? (
                    <img 
                      src={selectedCert.imageUrl} 
                      alt={selectedCert.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                 ) : (
                    <div className="text-center text-slate-400">
                       <Award size={48} className="mx-auto mb-2 opacity-50" />
                       <p>Certificate Image Unavailable</p>
                    </div>
                 )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
                 <div className="text-xs text-slate-500">
                    Issued by <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedCert.issuer}</span> • {selectedCert.date}
                 </div>
                 {selectedCert.credentialUrl && (
                    <a 
                      href={selectedCert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Verify Credential <ExternalLink size={12} />
                    </a>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CertificateWall;