import React, { useState, useMemo } from 'react';
import {
  CANDIDATE_QUESTIONS_BANK,
  getCandidateAdaptiveQuestions
} from '../../data/questionnairesData';
import { QuestionnaireItem } from '../../types/questionnaire';
import { CandidateProfile } from '../../types/candidate';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Award,
  Check,
  Compass,
  X,
  Zap,
  Target
} from 'lucide-react';

interface CandidateConversationalSurveyModalProps {
  isOpen: boolean;
  onComplete: (profileUpdates: Partial<CandidateProfile>, answers: Record<string, any>) => void;
  onClose?: () => void;
  onCancel?: () => void;
  existingProfile?: CandidateProfile;
  initialProfile?: CandidateProfile;
}

export const CandidateConversationalSurveyModal: React.FC<CandidateConversationalSurveyModalProps> = ({
  isOpen,
  onComplete,
  onClose,
  onCancel,
  existingProfile,
  initialProfile
}) => {
  const profileToUse = existingProfile || initialProfile;
  const handleModalClose = onClose || onCancel;

  // Survey answers dictionary keyed by question ID (e.g. 'A1', 'A2')
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    try {
      const stored = localStorage.getItem('kaushal_candidate_survey_answers');
      if (stored) return JSON.parse(stored);
    } catch {}
    if (profileToUse) {
      return {
        A1: profileToUse.currentStatus === 'currently-working' ? 'Working Professional' : 'Student',
        A2: profileToUse.highestQualification || 'Diploma / Polytechnic',
        A3: profileToUse.tradeOrField || 'Computer Science & IT / Software',
        A7: profileToUse.sectorsOfInterest || ['IT / Software'],
        A6: 'Get my first job'
      };
    }
    return {};
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Compute adaptive question list dynamically based on evolving answers
  const activeQuestions: QuestionnaireItem[] = useMemo(() => {
    return getCandidateAdaptiveQuestions(answers);
  }, [answers]);

  const currentQuestion: QuestionnaireItem = activeQuestions[Math.min(currentIndex, activeQuestions.length - 1)];

  // Current answer value
  const currentAnswer = answers[currentQuestion?.id];

  const handleSelectAnswer = (value: any) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [currentQuestion.id]: value
      };

      // When candidate selects their domain in A3, smartly align target sectors and roles
      if (currentQuestion.id === 'A3') {
        const valStr = String(value).toLowerCase();
        if (valStr.includes('computer') || valStr.includes('it') || valStr.includes('software')) {
          if (!updated['A7'] || (Array.isArray(updated['A7']) && updated['A7'].some((s: string) => s.includes('EV')))) {
            updated['A7'] = ['IT / Software'];
          }
          if (!updated['A8']) {
            updated['A8'] = 'Cybersecurity Analyst / Software Developer';
          }
        } else if (valStr.includes('automobile') || valStr.includes('ev')) {
          if (!updated['A7'] || (Array.isArray(updated['A7']) && updated['A7'].includes('IT / Software'))) {
            updated['A7'] = ['EV & Clean Mobility', 'Manufacturing'];
          }
        }
      }

      return updated;
    });
  };

  const handleMultiSelectToggle = (option: string, max?: number) => {
    const prevList: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
    let updated: string[];
    if (prevList.includes(option)) {
      updated = prevList.filter((item) => item !== option);
    } else {
      if (max && prevList.length >= max) {
        // Replace oldest or cap
        updated = [...prevList.slice(1), option];
      } else {
        updated = [...prevList, option];
      }
    }
    handleSelectAnswer(updated);
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
    // Save to localStorage
    try {
      localStorage.setItem('kaushal_candidate_survey_answers', JSON.stringify(answers));
    } catch {}

    const chosenTrade = answers['A3'] || existingProfile?.tradeOrField || '';
    const chosenRole = answers['A8'] || '';
    const isTechDomain =
      chosenTrade.toLowerCase().includes('computer') ||
      chosenTrade.toLowerCase().includes('it') ||
      chosenTrade.toLowerCase().includes('software') ||
      chosenTrade.toLowerCase().includes('cyber') ||
      chosenRole.toLowerCase().includes('cyber') ||
      chosenRole.toLowerCase().includes('software') ||
      (Array.isArray(answers['A7']) && answers['A7'].some((s: string) => s.includes('IT') || s.includes('Software')));

    let finalSectors = Array.isArray(answers['A7']) && answers['A7'].length > 0 ? answers['A7'] : [];
    if (isTechDomain) {
      finalSectors = Array.from(
        new Set([
          ...finalSectors.filter((s: string) => !s.includes('EV') && !s.includes('Mobility')),
          'IT / Software',
          'Cybersecurity & Cloud'
        ])
      );
    } else if (finalSectors.length === 0) {
      finalSectors = ['Automobile & EV'];
    }

    let finalTrade = chosenTrade || (isTechDomain ? 'Computer Science & Cybersecurity Operations' : 'Automobile & EV / Mechanical');
    if (chosenRole) {
      finalTrade = `${chosenRole} (${chosenTrade || 'IT & Software'})`;
    }

    // Map region from A5 if object
    let finalDistrict = existingProfile?.district || 'Pune';
    if (answers['A5']) {
      const regStr = typeof answers['A5'] === 'object' ? answers['A5'].region || '' : String(answers['A5']);
      if (regStr.toLowerCase().includes('pune')) finalDistrict = 'Pune';
      else if (regStr.toLowerCase().includes('nashik')) finalDistrict = 'Nashik';
      else if (regStr.toLowerCase().includes('mumbai') || regStr.toLowerCase().includes('mmr')) finalDistrict = 'Mumbai';
      else if (regStr.toLowerCase().includes('nagpur')) finalDistrict = 'Nagpur';
      else if (regStr.toLowerCase().includes('aurangabad') || regStr.toLowerCase().includes('chhatrapati sambhajinagar')) finalDistrict = 'Chhatrapati Sambhajinagar';
    }

    // Map answers into CandidateProfile updates
    const profileUpdates: Partial<CandidateProfile> = {
      onboardingCompleted: true,
      points: (existingProfile?.points || 100) + 50, // Award +50 XP
      district: finalDistrict,
      sectorsOfInterest: finalSectors,
      tradeOrField: finalTrade,
      currentStatus: answers['A1'] === 'Working Professional' ? 'currently-working' : 'studying',
      aim:
        answers['A6'] === 'Switch careers'
          ? 'switch-career'
          : answers['A6'] === 'Upskill in current job'
          ? 'new-skill'
          : 'job-urgent',
      highestQualification:
        answers['A2'] === 'Diploma / Polytechnic'
          ? 'Polytechnic Diploma'
          : answers['A2'] === 'ITI / Vocational Trade'
          ? 'ITI certificate'
          : answers['A2'] === 'Undergraduate (B.E / B.Sc / B.Com / B.A)'
          ? 'B.E / B.Tech Engineering'
          : existingProfile?.highestQualification || '12th'
    };

    if (isTechDomain) {
      profileUpdates.domainAssessment = {
        domainName: 'Computer Science, IT & Cyber Security Operations',
        assessedScore: 74,
        overallLevel: 'Practitioner',
        industryMatchPercent: 91,
        lastAssessedDate: new Date().toISOString().split('T')[0],
        skills: [
          {
            skillName: 'Network Security & Protocol Analysis (Wireshark/TCP)',
            candidateLevel: 3,
            industryDemandedLevel: 5,
            gap: 2,
            districtDeficitPercent: 78,
            recommendedAction: 'Complete Virtual Lab Sandbox Module: Network Intrusion & Packet Forensics'
          },
          {
            skillName: 'Linux Shell Scripting & Server Hardening',
            candidateLevel: 3,
            industryDemandedLevel: 4,
            gap: 1,
            districtDeficitPercent: 68,
            recommendedAction: 'Take 2-Week Micro-Certification: Enterprise Linux Security & Bash'
          },
          {
            skillName: 'SIEM Incident Detection & Log Analysis (Splunk/ELK)',
            candidateLevel: 2,
            industryDemandedLevel: 4,
            gap: 2,
            districtDeficitPercent: 84,
            recommendedAction: 'Enroll in SOC Operator Simulation at Govt ITI / CDAC'
          },
          {
            skillName: 'Python Automation & REST API Security',
            candidateLevel: 4,
            industryDemandedLevel: 4,
            gap: 0,
            districtDeficitPercent: 38,
            recommendedAction: 'Proficiency matched! Verified for NAPS Tech Apprenticeships.'
          }
        ]
      };
      profileUpdates.savedCourseIds = ['c-cloud-cyber', 'c-cyber-defense-analyst', 'c-fullstack-cloud-dev'];
    }

    setIsCompleted(true);
    setTimeout(() => {
      onComplete(profileUpdates, answers);
    }, 1800);
  };

  const progressPercent = Math.round(((currentIndex + 1) / (activeQuestions.length || 1)) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Accent Header */}
        <div className="bg-gradient-to-r from-[#0C2340] via-[#1E3A8A] to-[#0284C7] text-white px-5 sm:px-7 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                  Part A • Candidate Onboarding Check-In
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                  Max 15 Adaptive Questions
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Skill &amp; Career Aim Personalization
              </h2>
            </div>
          </div>
          {handleModalClose && (
            <button
              onClick={handleModalClose}
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
            <span className="font-bold text-blue-900">
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-normal">
              {currentQuestion?.sectionTitle}
            </span>
          </div>
          <span className="font-semibold text-blue-700">{progressPercent}% complete</span>
        </div>
        <div className="w-full bg-slate-200 h-1">
          <div
            className="bg-blue-600 h-1 transition-all duration-300 ease-out"
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
                Profile Personalization Complete!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your responses have generated your personalized Skill Passport vector and calibrated
                course recommendations with live Maharashtra industrial hiring demand.
              </p>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-full font-bold text-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>+50 Onboarding XP added to your Community Leaderboard!</span>
              </div>
              <div className="pt-2 text-xs text-slate-400">Loading your tailored candidate dashboard...</div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Question Tag Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200/80">
                  Tagged Answer Type: {currentQuestion?.tag}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  ID: {currentQuestion?.id} (of 25 Bank)
                </span>
              </div>

              {/* Conversational Friendly Intro */}
              {currentQuestion?.conversationalIntro && (
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed flex items-start space-x-2.5">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{currentQuestion.conversationalIntro}</span>
                </div>
              )}

              {/* Question Headline */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0C2340] leading-snug">
                  {currentQuestion?.question}
                </h3>
                {currentQuestion?.helperText && (
                  <p className="text-xs text-slate-500 mt-1">{currentQuestion.helperText}</p>
                )}
              </div>

              {/* Answer Controls based on answerType */}
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
                              ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-xs ring-1 ring-blue-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
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
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md font-extrabold ring-2 ring-blue-300'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 font-bold'
                            }`}
                          >
                            <span className="text-xl sm:text-2xl">{val}</span>
                            <span
                              className={`text-[10px] mt-1 ${
                                isSelected ? 'text-blue-100' : 'text-slate-400'
                              }`}
                            >
                              Level {val}
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

                {/* 3. Multi-Select Tag List */}
                {currentQuestion?.answerType === 'multi_select' && currentQuestion.options && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
                      <span>
                        Choose up to {currentQuestion.maxSelections || 3} options:
                      </span>
                      <span className="text-blue-700 font-bold">
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
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50'
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

                {/* 4. Dropdown Select */}
                {currentQuestion?.answerType === 'dropdown' && currentQuestion.options && (
                  <div className="space-y-2">
                    <select
                      value={currentAnswer || ''}
                      onChange={(e) => handleSelectAnswer(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Choose your domain / trade --</option>
                      {currentQuestion.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 5. Open Text */}
                {currentQuestion?.answerType === 'open_text' && (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={currentAnswer || ''}
                      onChange={(e) => handleSelectAnswer(e.target.value)}
                      placeholder={currentQuestion.placeholder || 'Type your answer here...'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                    <div className="text-[11px] text-slate-400 text-right">
                      Feeds into candidate demand telemetry
                    </div>
                  </div>
                )}

                {/* 6. Location + Relocation Toggle */}
                {currentQuestion?.answerType === 'location_relocation' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Current Base Region / District:
                      </label>
                      <select
                        value={currentAnswer?.region || currentQuestion.options?.[0]}
                        onChange={(e) =>
                          handleSelectAnswer({
                            ...(currentAnswer || {}),
                            region: e.target.value
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      >
                        {currentQuestion.options?.map((reg) => (
                          <option key={reg} value={reg}>
                            {reg}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Open to relocating within Maharashtra?
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Increases interview offers by up to 3.4x in EV / MIDC hubs
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectAnswer({ ...(currentAnswer || {}), relocate: true })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                            currentAnswer?.relocate !== false
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectAnswer({ ...(currentAnswer || {}), relocate: false })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                            currentAnswer?.relocate === false
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. Yes/No and Yes/No with text */}
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
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
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
                            placeholder={currentQuestion.placeholder || 'Specify details...'}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
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
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs flex items-center space-x-2 transition-colors"
              >
                <span>
                  {currentIndex === activeQuestions.length - 1
                    ? 'Complete Check-In'
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
