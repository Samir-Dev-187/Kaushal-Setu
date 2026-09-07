import React, { useState, useMemo } from 'react';
import {
  EMPLOYER_QUESTIONS_BANK,
  INITIAL_EMPLOYER_SUGGESTIONS,
  getEmployerAdaptiveQuestions
} from '../../data/questionnairesData';
import { QuestionnaireItem, EmployerSuggestionItem } from '../../types/questionnaire';
import {
  Briefcase,
  Building,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Send,
  X,
  Vote,
  TrendingUp,
  Award
} from 'lucide-react';

interface EmployerConversationalSurveyModalProps {
  isOpen: boolean;
  onComplete: (answers: Record<string, any>, newSuggestion?: EmployerSuggestionItem) => void;
  onClose?: () => void;
  companyName?: string;
  contactName?: string;
}

export const EmployerConversationalSurveyModal: React.FC<EmployerConversationalSurveyModalProps> = ({
  isOpen,
  onComplete,
  onClose,
  companyName = 'AutoTech Dynamics & EV Systems Ltd',
  contactName = 'Talent Acquisition Head'
}) => {
  // Survey answers dictionary keyed by question ID (e.g. 'B1', 'B2', etc.)
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    try {
      const stored = localStorage.getItem('kaushal_employer_survey_answers');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      B1: 'Automotive & EV Manufacturing',
      B2: 'SME (50–500 employees)',
      B3: 'HR / Talent Acquisition Recruiter',
      B4: '51–200 candidates / year',
      B6: 2,
      B9: ['Professional communication & reporting', 'Punctuality & shift discipline'],
      B10: 'Yes, actively interested (NAPS / NEEM / Dual-System)',
      B11: [
        'EV Powertrain & Battery Management Systems (BMS)',
        'CNC 5-Axis Turning & Milling Programming'
      ],
      B14: 'Rise (+20% or more)',
      B17: 2,
      B22: '',
      B25: 5
    };
  });

  // Employer syllabus change proposals pool
  const [suggestions, setSuggestions] = useState<EmployerSuggestionItem[]>(() => {
    try {
      const stored = localStorage.getItem('kaushal_employer_suggestions');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_EMPLOYER_SUGGESTIONS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [newProposalText, setNewProposalText] = useState('');
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Compute adaptive question list dynamically (max 14 questions)
  const activeQuestions: QuestionnaireItem[] = useMemo(() => {
    return getEmployerAdaptiveQuestions(answers);
  }, [answers]);

  const currentQuestion: QuestionnaireItem =
    activeQuestions[Math.min(currentIndex, activeQuestions.length - 1)];
  const currentAnswer = answers[currentQuestion?.id];

  const handleSelectAnswer = (value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleMultiSelectToggle = (option: string, max?: number) => {
    const prevList: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
    let updated: string[];
    if (prevList.includes(option)) {
      updated = prevList.filter((item) => item !== option);
    } else {
      if (max && prevList.length >= max) {
        updated = [...prevList.slice(1), option];
      } else {
        updated = [...prevList, option];
      }
    }
    handleSelectAnswer(updated);
  };

  // Upvote / Downvote handler (capped at 1 vote per suggestion)
  const handleVoteSuggestion = (id: string, type: 'up' | 'down') => {
    setSuggestions((prev) => {
      const updated = prev.map((sug) => {
        if (sug.id !== id) return sug;
        if (sug.userVoted === type) {
          // undo vote
          return {
            ...sug,
            upvotes: type === 'up' ? sug.upvotes - 1 : sug.upvotes,
            userVoted: undefined
          };
        }
        const delta = type === 'up' ? (sug.userVoted === 'down' ? 1 : 1) : sug.userVoted === 'up' ? -1 : 0;
        return {
          ...sug,
          upvotes: sug.upvotes + delta,
          userVoted: type
        };
      });
      try {
        localStorage.setItem('kaushal_employer_suggestions', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Submit new syllabus proposal (Q22)
  const handleSubmitNewProposal = () => {
    if (!newProposalText.trim()) return;

    const newSuggestion: EmployerSuggestionItem = {
      id: `sug-${Date.now()}`,
      sector: answers['B1'] || 'Automotive & EV Manufacturing',
      text: newProposalText.trim(),
      upvotes: 1,
      submittedBy: `${companyName} (${contactName})`,
      timestamp: 'Just now',
      userVoted: 'up'
    };

    const updated = [newSuggestion, ...suggestions];
    setSuggestions(updated);
    try {
      localStorage.setItem('kaushal_employer_suggestions', JSON.stringify(updated));
    } catch {}

    handleSelectAnswer(newProposalText.trim());
    setProposalSubmitted(true);
    setNewProposalText('');
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    try {
      localStorage.setItem('kaushal_employer_survey_answers', JSON.stringify(answers));
      localStorage.setItem('kaushal_employer_survey_completed', 'true');
    } catch {}

    setIsCompleted(true);
    setTimeout(() => {
      onComplete(answers);
    }, 1800);
  };

  const progressPercent = Math.round(((currentIndex + 1) / (activeQuestions.length || 1)) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Accent Header */}
        <div className="bg-gradient-to-r from-[#0C2340] via-[#1E293B] to-[#D97706] text-white px-5 sm:px-7 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Briefcase className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
                  Part B • Industry Partner Check-In
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                  Demand Forecasting &amp; Curriculum Voting
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Skill Gap Telemetry &amp; Syllabus Voting
              </h2>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 sm:px-7 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-2 font-medium">
            <span className="font-bold text-slate-900">
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-normal">{currentQuestion?.sectionTitle}</span>
          </div>
          <span className="font-semibold text-amber-700">{progressPercent}% complete</span>
        </div>
        <div className="w-full bg-slate-200 h-1">
          <div
            className="bg-amber-600 h-1 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {isCompleted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#0C2340]">
                Industry Telemetry &amp; Votes Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you! Your hiring forecasts and curriculum upvotes have been aggregated into the
                Maharashtra State Skill Gap Analysis Engine and published to the Industry Pulse
                leaderboard.
              </p>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-900 rounded-full font-bold text-xs">
                <Vote className="w-4 h-4 text-blue-600" />
                <span>Your syllabus proposals are now open for peer industry endorsements.</span>
              </div>
              <div className="pt-2 text-xs text-slate-400">Loading Employer Dashboard...</div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Question Tag Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                  Tagged Answer Type: {currentQuestion?.tag}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  ID: {currentQuestion?.id} (of 25 Bank)
                </span>
              </div>

              {/* Conversational Friendly Intro */}
              {currentQuestion?.conversationalIntro && (
                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-100 text-xs text-amber-950 leading-relaxed flex items-start space-x-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{currentQuestion.conversationalIntro}</span>
                </div>
              )}

              {/* Question Headline */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0C2340] leading-snug">
                  {currentQuestion?.question}
                </h3>
              </div>

              {/* Answer Controls */}
              <div className="pt-2">
                {/* 1. MCQ (Single Select) */}
                {currentQuestion?.answerType === 'mcq' && currentQuestion.options && (
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = currentAnswer === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectAnswer(opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-50 border-amber-600 text-amber-950 font-bold shadow-xs ring-1 ring-amber-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-amber-600 bg-amber-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. Rating Scale 1–5 */}
                {currentQuestion?.answerType === 'rating_scale' && (
                  <div className="space-y-4 py-2">
                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                      {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected = currentAnswer === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleSelectAnswer(val)}
                            className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-amber-600 border-amber-600 text-white shadow-md font-extrabold ring-2 ring-amber-300'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300 font-bold'
                            }`}
                          >
                            <span className="text-xl sm:text-2xl">{val}</span>
                            <span
                              className={`text-[10px] mt-1 ${
                                isSelected ? 'text-amber-100' : 'text-slate-400'
                              }`}
                            >
                              Rating {val}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {currentQuestion.ratingLabels && (
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                        <span>{currentQuestion.ratingLabels.min}</span>
                        <span>{currentQuestion.ratingLabels.max}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Dropdown Select */}
                {currentQuestion?.answerType === 'dropdown' && currentQuestion.options && (
                  <div className="space-y-2">
                    <select
                      value={currentAnswer || ''}
                      onChange={(e) => handleSelectAnswer(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">-- Choose your industry sector --</option>
                      {currentQuestion.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 4. Multi-Select */}
                {currentQuestion?.answerType === 'multi_select' && currentQuestion.options && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
                      <span>Select up to {currentQuestion.maxSelections || 3} key factors:</span>
                      <span className="text-amber-700 font-bold">
                        Selected: {(Array.isArray(currentAnswer) ? currentAnswer.length : 0)} /{' '}
                        {currentQuestion.maxSelections || 3}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.options.map((opt) => {
                        const selectedList: string[] = Array.isArray(currentAnswer)
                          ? currentAnswer
                          : [];
                        const isSelected = selectedList.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              handleMultiSelectToggle(opt, currentQuestion.maxSelections)
                            }
                            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center space-x-1.5 ${
                              isSelected
                                ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-slate-50'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. Ranking List (Click to order priorities) */}
                {currentQuestion?.answerType === 'ranking' && currentQuestion.options && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-500 font-medium">
                      Top competency priorities ordered by industry preference:
                    </div>
                    <div className="space-y-2">
                      {currentQuestion.options.map((opt, idx) => (
                        <div
                          key={opt}
                          className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-700"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#0C2340] text-white flex items-center justify-center font-bold shrink-0">
                            {idx + 1}
                          </div>
                          <span className="flex-1">{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Open Text / Syllabus Proposal (Q22) */}
                {currentQuestion?.answerType === 'open_text' && (
                  <div className="space-y-3">
                    <textarea
                      rows={3}
                      value={currentAnswer || ''}
                      onChange={(e) => handleSelectAnswer(e.target.value)}
                      placeholder={currentQuestion.placeholder || 'Type your suggestion or feedback...'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400"
                    />

                    {currentQuestion.id === 'B22' && (
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                        <span className="text-xs text-amber-900 font-medium">
                          Publish as a live card for peer employers to upvote?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (currentAnswer) {
                              setNewProposalText(currentAnswer);
                              handleSubmitNewProposal();
                            }
                          }}
                          disabled={!currentAnswer}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold disabled:opacity-40 flex items-center space-x-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Submit to Vote Board</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. Voting & Upvoting running list UI (Q23) */}
                {currentQuestion?.answerType === 'upvote_suggestion' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        Live Peer Proposals ({suggestions.length} submitted):
                      </span>
                      <span>1 vote per proposal</span>
                    </div>

                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      {suggestions.map((item) => {
                        const hasUpvoted = item.userVoted === 'up';
                        return (
                          <div
                            key={item.id}
                            className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                              hasUpvoted
                                ? 'bg-amber-50/80 border-amber-300'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  {item.sector}
                                </span>
                                <span className="text-[10px] text-slate-400">• {item.timestamp}</span>
                              </div>
                              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                                {item.text}
                              </p>
                              <div className="text-[11px] text-slate-500 italic">
                                Suggested by {item.submittedBy}
                              </div>
                            </div>

                            {/* Upvote Button */}
                            <button
                              type="button"
                              onClick={() => handleVoteSuggestion(item.id, 'up')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center space-x-1.5 transition-all shrink-0 ${
                                hasUpvoted
                                  ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{item.upvotes}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 8. Yes/No with Text */}
                {(currentQuestion?.answerType === 'yes_no' ||
                  currentQuestion?.answerType === 'yes_no_text') && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {['Yes', 'No'].map((opt) => {
                        const isSelected =
                          currentAnswer === opt ||
                          (typeof currentAnswer === 'object' && currentAnswer?.decision === opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              if (currentQuestion.answerType === 'yes_no_text') {
                                handleSelectAnswer({
                                  ...(typeof currentAnswer === 'object' ? currentAnswer : {}),
                                  decision: opt
                                });
                              } else {
                                handleSelectAnswer(opt);
                              }
                            }}
                            className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                              isSelected
                                ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {currentQuestion.answerType === 'yes_no_text' &&
                      (currentAnswer?.decision === 'Yes' || currentAnswer === 'Yes') && (
                        <div className="pt-2 animate-in fade-in duration-150">
                          <input
                            type="text"
                            value={currentAnswer?.text || ''}
                            onChange={(e) =>
                              handleSelectAnswer({
                                ...(typeof currentAnswer === 'object' ? currentAnswer : {}),
                                decision: 'Yes',
                                text: e.target.value
                              })
                            }
                            placeholder={currentQuestion.placeholder || 'Specify target trade or details...'}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400"
                          />
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!isCompleted && (
          <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-7 py-3.5 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Skip Question
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-xs flex items-center space-x-2 transition-colors"
              >
                <span>
                  {currentIndex === activeQuestions.length - 1
                    ? 'Submit Telemetry & Votes'
                    : 'Save & Next'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
