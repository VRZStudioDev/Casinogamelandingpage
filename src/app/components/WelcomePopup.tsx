import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, ArrowRight, Star, Sparkles, Trophy, ChevronDown, Check, Volume2 } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useIsMobile } from './ui/use-mobile';
import modalImage from '../assets/img-modal.png';
import modalVideo from '../assets/video-modal.mp4';

const VISITED_KEY = 'casino_visited';

// Generate a celebration sound using Web Audio API
const playCelebrationSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.5);
    });
    // Final shimmer
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmer.type = 'triangle';
    shimmer.frequency.value = 1318.51; // E6
    shimmerGain.gain.setValueAtTime(0.1, ctx.currentTime + 0.5);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    shimmer.start(ctx.currentTime + 0.5);
    shimmer.stop(ctx.currentTime + 1.2);
  } catch {}
};

// Confetti particle component
const ConfettiParticle: React.FC<{ delay: number; color: string }> = ({ delay, color }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-sm"
    style={{ backgroundColor: color, left: `${Math.random() * 100}%`, top: '50%' }}
    initial={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
    animate={{
      opacity: [1, 1, 0],
      y: [0, -120 - Math.random() * 80, 60 + Math.random() * 40],
      x: [0, (Math.random() - 0.5) * 200],
      rotate: [0, Math.random() * 720],
      scale: [1, 1.2, 0.5],
    }}
    transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
  />
);

export const WelcomePopup: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'gn', label: 'Guaraní', flag: '🇵🇾' },
  ];

  const currentLang = languages.find(l => l.code === language);

  useEffect(() => {
    try {
      const visited = localStorage.getItem(VISITED_KEY);
      if (!visited) {
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(VISITED_KEY, '1');
    } catch {}
  };

  const handleClaim = useCallback(() => {
    setClaimed(true);
    playCelebrationSound();
    // Auto-close after showing success
    setTimeout(() => {
      handleClose();
      window.open('https://casinoamambay.online/bonus', '_blank', 'noopener,noreferrer');
    }, 3500);
  }, []);

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
    else handleClaim();
  };

  // Mobile multi-step content
  const mobileSteps = [
    {
      icon: <Gift className="w-8 h-8 text-red-400" />,
      title: t('popupStep1Title'),
      desc: t('popupStep1Desc'),
    },
    {
      icon: <Trophy className="w-8 h-8 text-amber-400" />,
      title: t('popupStep2Title'),
      desc: t('popupStep2Desc'),
    },
    {
      icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
      title: t('popupStep3Title'),
      desc: t('popupStep3Desc'),
    },
  ];

  // Confetti colors
  const confettiColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];

  // Success/Claimed screen
  const ClaimedScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-center py-12 sm:py-16 px-6 sm:px-10 text-center overflow-hidden"
    >
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiColors.flatMap((color, ci) =>
          [...Array(4)].map((_, pi) => (
            <ConfettiParticle key={`${ci}-${pi}`} delay={pi * 0.05 + ci * 0.02} color={color} />
          ))
        )}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent" />

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30"
      >
        <Check className="w-10 h-10 text-white" strokeWidth={3} />
      </motion.div>

      {/* Pulsing ring */}
      <motion.div
        className="absolute w-20 h-20 rounded-full border-2 border-emerald-400/40"
        style={{ top: 'calc(50% - 76px)', left: 'calc(50% - 40px)' }}
        animate={{ scale: [1, 1.8, 2.2], opacity: [0.6, 0.2, 0] }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
      >
        {t('popupClaimedTitle')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="text-sm text-gray-400 leading-relaxed max-w-xs"
      >
        {t('popupClaimedDesc')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex items-center gap-2 text-xs text-emerald-400/70"
      >
        <Volume2 className="w-3.5 h-3.5" />
        <span>{t('popupRedirecting')}</span>
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-[#0c1020] border border-white/[0.08] shadow-2xl shadow-red-900/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: Language selector + Close */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              {!claimed && (
                <button
                  ref={langBtnRef}
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                >
                  <span className="text-sm">{currentLang?.flag}</span>
                  <span className="text-xs text-gray-300 font-medium hidden sm:inline">{currentLang?.label}</span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${showLangMenu ? 'rotate-180' : ''}`} />
                </button>
              )}
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${claimed ? 'via-emerald-500/50' : 'via-red-500/50'} to-transparent`} />

            {claimed ? (
              <ClaimedScreen />
            ) : isMobile ? (
              /* ─── MOBILE: Multi-step modal with image ─── */
              <div className="flex flex-col">
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={modalImage}
                    alt="Casino Amambay"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1020] via-[#0c1020]/40 to-transparent" />
                  {/* Step indicator on image */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === step ? 'w-6 bg-red-500' : 'w-1.5 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step content */}
                <div className="px-6 pt-4 pb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-4">
                        {mobileSteps[step].icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {mobileSteps[step].title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-6">
                        {mobileSteps[step].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    {step > 0 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex-1 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-gray-300 hover:bg-white/[0.08] transition-colors"
                      >
                        {t('popupBack')}
                      </button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className={`${step > 0 ? 'flex-1' : 'w-full'} py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-sm font-bold text-white transition-all flex items-center justify-center gap-2`}
                    >
                      {step < 2 ? (
                        <>
                          {t('popupNext')}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Gift className="w-4 h-4" />
                          {t('popupClaim')}
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Skip */}
                  <button
                    onClick={handleClose}
                    className="w-full mt-3 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    {t('popupSkip')}
                  </button>
                </div>
              </div>
            ) : (
              /* ─── DESKTOP: Autoplay video modal ─── */
              <div className="flex flex-col">
                {/* Video */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <video
                    ref={videoRef}
                    src={modalVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1020] via-transparent to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="px-8 pb-8 -mt-16 relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-amber-400/80 font-medium">500,000+ {t('popupPlayers')}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {t('popupDesktopTitle')}
                  </h2>
                  <p className="text-sm text-gray-400 mb-6 max-w-md">
                    {t('popupDesktopDesc')}
                  </p>

                  {/* Benefits row */}
                  <div className="flex gap-3 mb-6">
                    {[
                      { icon: <Gift className="w-4 h-4 text-red-400" />, text: t('popupBenefit1') },
                      { icon: <Trophy className="w-4 h-4 text-amber-400" />, text: t('popupBenefit2') },
                      { icon: <Sparkles className="w-4 h-4 text-emerald-400" />, text: t('popupBenefit3') },
                    ].map((b, i) => (
                      <div key={i} className="flex-1 glass-card rounded-xl p-3 flex items-center gap-2">
                        {b.icon}
                        <span className="text-xs text-gray-300 font-medium">{b.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClaim}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-sm font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
                    >
                      <Gift className="w-4 h-4" />
                      {t('popupClaim')}
                    </motion.button>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-gray-400 hover:bg-white/[0.08] transition-colors"
                    >
                      {t('popupLater')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${claimed ? 'via-emerald-500/30' : 'via-red-500/30'} to-transparent`} />
          </motion.div>

          {/* Language dropdown - rendered outside modal to avoid overflow clipping */}
          <AnimatePresence>
            {showLangMenu && !claimed && langBtnRef.current && (() => {
              const rect = langBtnRef.current!.getBoundingClientRect();
              return (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="fixed bg-[#0d111f]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl shadow-black/40 min-w-[150px] z-[110]"
                  style={{ top: rect.bottom + 8, right: window.innerWidth - rect.right }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                      className={`w-full px-4 py-2.5 flex items-center gap-2.5 hover:bg-white/[0.06] transition-all duration-200 text-sm ${
                        language === lang.code ? 'bg-red-600/10 text-red-400' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-xs font-medium">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
