import React, { useState, useRef, useEffect } from 'react';
import { MOCK_ASK_SETU_QA } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AskSetuFloatingChatProps {
  language: SupportedLang;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AskSetuFloatingChat: React.FC<AskSetuFloatingChatProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text:
        language === 'mr'
          ? 'नमस्कार! मी सेतू. महाराष्ट्रातील कोणत्याही व्होकेशनल ट्रेड, नोकरीची सत्यता किंवा पगार याबद्दल मनमोकळेपणाने विचारा.'
          : 'Namaste! I am Setu. Ask me anything about course obsolescence, real factory wages, NAPS rules, or whether a trade is actually worth your time.',
      timestamp: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // TODO: replace with API call to /api/ai/ask-setu
  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Mock AI response logic with realistic counsel
    setTimeout(() => {
      const qLower = userText.toLowerCase();
      let matchedAnswer = '';

      for (const qa of MOCK_ASK_SETU_QA) {
        if (qa.keywords.some(k => qLower.includes(k))) {
          matchedAnswer = qa.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer =
          "Good question. Always verify with current factory intake: across Nashik, Pune, and Chhatrapati Sambhajinagar MIDCs, workshops are automating repetitive mechanical lines and hiring technicians with electrical/sensor diagnostics. Check our 'Before You Enroll' section for verified employer statistics!";
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: matchedAnswer,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const cannedQuestions = [
    'Why is Fitter flagged?',
    'EV vs ICE salary reality',
    'What is NAPS stipend?',
    'How to link DigiLocker?'
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-[#0C2340] hover:bg-blue-950 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-amber-400 active:scale-95 transition-all group focus:outline-hidden focus:ring-4 focus:ring-amber-400/40"
          aria-label="Open Ask Setu Career Chat"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0C2340]"></span>
          </div>
          <span className="font-black text-xs hidden sm:inline text-amber-300">
            {t.askSetuFloating}
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-96 max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#0C2340] text-white p-4 flex items-center justify-between border-b border-blue-900">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-xs sm:text-sm text-white flex items-center space-x-1.5">
                  <span>Ask Setu</span>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-slate-300">
                  Direct, non-corporate career counsel
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-blue-900 text-amber-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-1">
                    KS
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-xl leading-relaxed text-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-900 text-white rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <span
                    className={`text-[9px] block mt-1 ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs italic pl-8">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                <span>Setu is typing honest advice...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Canned Quick Chips */}
          <div className="p-2 bg-white border-t border-slate-200 flex items-center space-x-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {cannedQuestions.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded-full border border-slate-200 transition-colors font-medium"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage(inputVal);
              }}
              placeholder="Ask anything about a trade or course..."
              className="flex-1 px-3 py-2 bg-slate-100 text-slate-900 border border-slate-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            />
            <button
              onClick={() => handleSendMessage(inputVal)}
              disabled={!inputVal.trim()}
              className="p-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
