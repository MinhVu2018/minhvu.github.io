import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageStream } from '../services/geminiService';

const SUGGESTIONS = [
  "Summarize Alex's experience",
  "What is the best ML project?",
  "Does Alex know React?",
  "How to contact?"
];

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: "Hi! I'm Alex's AI Assistant. I can analyze my projects or answer questions about my background." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Listen for custom events to open chat from other components
  useEffect(() => {
    const handleOpenChat = (e: CustomEvent) => {
      setIsOpen(true);
      
      // Handle "Recruiter Mode" or generic triggers
      if (e.detail?.initialBotMessage) {
         // Reset chat with a specific prompt
         setMessages([{ id: Date.now().toString(), role: 'model', text: e.detail.initialBotMessage }]);
      } else if (e.detail?.message) {
        // Just send a message as the user
        processMessage(e.detail.message);
      }
    };
    
    window.addEventListener('open-ai-chat' as any, handleOpenChat);
    return () => window.removeEventListener('open-ai-chat' as any, handleOpenChat);
  }, []);

  const processMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const botMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', isStreaming: true }]);

    try {
      const stream = sendMessageStream(userMsg.text);
      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: fullText } 
              : msg
          )
        );
      }
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Error connecting to AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    processMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[350px] sm:w-[400px] max-h-[600px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900 p-4 flex justify-between items-center border-b border-indigo-500/20">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-500 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Neural Assistant</h3>
                <p className="text-xs text-indigo-300">Powered by Gemini 3</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-500/10' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  }`}
                >
                  {/* Basic Markdown Rendering for lists and bold text */}
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text.split('\n').map((line, i) => (
                        <div key={i} className={`${line.startsWith('- ') ? 'ml-2' : ''} ${line.includes('Match Score') ? 'font-bold text-emerald-400' : ''}`}>
                            {line}
                        </div>
                    ))}
                  </div>
                  {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle"></span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && !isLoading && (
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {SUGGESTIONS.map(s => (
                <button 
                  key={s}
                  onClick={() => processMessage(s)}
                  className="whitespace-nowrap px-3 py-1.5 bg-slate-800 hover:bg-indigo-900/30 border border-slate-700 hover:border-indigo-500/50 rounded-full text-xs text-indigo-300 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-slate-800/50 border-t border-slate-700">
            <div className="flex items-center space-x-2 bg-slate-900 rounded-full border border-slate-700 px-4 py-2 focus-within:border-indigo-500 transition-all focus-within:shadow-lg focus-within:shadow-indigo-500/10">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask AI anything..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder-slate-500"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className={`p-1.5 rounded-full transition-all ${
                  inputValue.trim() ? 'text-indigo-400 hover:bg-indigo-900/30' : 'text-slate-600'
                }`}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center group border border-indigo-400/30"
      >
        {/* Ping Animation for attention */}
        {!isOpen && (
           <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-slate-900"></span>
          </span>
        )}
        
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700">
            Ask AI Assistant
          </span>
        )}
      </button>
    </div>
  );
};

export default AIChat;