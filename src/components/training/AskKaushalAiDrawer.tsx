import React, { useState, useRef, useEffect } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AskKaushalAiDrawer: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen, chatMessages, sendChatMessage } =
    useTrainingCentre();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Which of my courses needs immediate attention?',
    'Why is Fitter marked oversupplied?',
    'What should I update first for EV alignment?',
    'What are my urgent government deadlines?'
  ];

  useEffect(() => {
    if (isAiAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiAssistantOpen]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
          className="flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0C2340] to-[#1E3A8A] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-blue-800 group"
          aria-label="Ask Kaushal AI Institutional Assistant"
        >
          <div className="p-1.5 bg-white/10 rounded-full group-hover:bg-amber-400/20 transition-colors">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide">Ask Kaushal AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      </div>

      {/* AI Assistant Drawer / Popup */}
      {isAiAssistantOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsAiAssistantOpen(false)}
          ></div>

          <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 bg-[#0C2340] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-white/10 rounded-lg border border-white/15 text-amber-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-extrabold text-sm text-white">Kaushal AI Copilot</h3>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono">
                      Institutional
                    </span>
                  </div>
                  <p className="text-[10px] text-blue-200">
                    Decision-support grounded in live Maharashtra telemetry
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAiAssistantOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-md font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* AI Explainability Trust Notice */}
            <div className="bg-blue-50 px-4 py-2 border-b border-blue-200 text-[11px] text-blue-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span>Recommendations are advisory and require human academic validation.</span>
            </div>

            {/* Messages Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-blue-800 text-white'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-amber-700" />}
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0C2340] text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200 whitespace-pre-line'
                    }`}
                  >
                    {msg.text}

                    {/* Recommendation prompts in assistant messages */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                          Suggested questions:
                        </div>
                        {msg.recommendations.map((rec, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handlePromptClick(rec)}
                            className="w-full text-left text-[11px] p-1.5 bg-white rounded border border-slate-300 hover:border-blue-600 hover:text-blue-900 font-semibold transition flex items-center justify-between group"
                          >
                            <span>{rec}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-700" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Preset Query Chips */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Prompts:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePromptClick(p)}
                    className="text-[10px] px-2 py-1 bg-white hover:bg-blue-50 hover:border-blue-400 text-slate-700 rounded-md border border-slate-200 transition text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about courses, risks, trainers, equipment..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg disabled:opacity-40 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
