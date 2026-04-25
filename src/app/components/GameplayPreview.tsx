import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Play } from 'lucide-react';
import gameplayBg from '../assets/gameplay.jpg';

// Slot symbol SVGs — replace these files with your own artwork
import cherrySvg from '../assets/symbols/cherry.svg';
import lemonSvg from '../assets/symbols/lemon.svg';
import starSvg from '../assets/symbols/star.svg';
import diamondSvg from '../assets/symbols/diamond.svg';
import sevenSvg from '../assets/symbols/seven.svg';
import cloverSvg from '../assets/symbols/clover.svg';
import bellSvg from '../assets/symbols/bell.svg';

interface SlotSymbol {
  id: string;
  src: string;
  alt: string;
}

const SYMBOLS: SlotSymbol[] = [
  { id: 'cherry', src: cherrySvg, alt: 'Cherry' },
  { id: 'lemon', src: lemonSvg, alt: 'Lemon' },
  { id: 'star', src: starSvg, alt: 'Star' },
  { id: 'diamond', src: diamondSvg, alt: 'Diamond' },
  { id: 'seven', src: sevenSvg, alt: 'Seven' },
  { id: 'clover', src: cloverSvg, alt: 'Clover' },
  { id: 'bell', src: bellSvg, alt: 'Bell' },
];

// Shared AudioContext singleton – avoids creating a new one per sound
let _audioCtx: AudioContext | null = null;
const getAudioCtx = (): AudioContext => {
  if (!_audioCtx || _audioCtx.state === 'closed') {
    _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Force resume – handles browser autoplay policy & stale HMR contexts
  if (_audioCtx.state === 'suspended') {
    _audioCtx.resume().catch(() => {});
  }
  return _audioCtx;
};

// Warm up AudioContext on first user gesture so sounds play immediately
const warmUpAudio = () => {
  try {
    const ctx = getAudioCtx();
    // Create a silent buffer to unlock the context
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch {}
};

// Spin reel sound — rapid ticking
const playSpinSound = () => {
  try {
    const ctx = getAudioCtx();
    for (let i = 0; i < 12; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.value = 600 + Math.random() * 200;
      const t = ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    }
  } catch {}
};

// Win celebration sound — ascending fanfare
const playWinSound = () => {
  try {
    const ctx = getAudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5 E5 G5 C6 E6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.6);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.6);
    });
    // Shimmer chord
    [1046.50, 1318.51, 1567.98].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + 0.55);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc.start(ctx.currentTime + 0.55);
      osc.stop(ctx.currentTime + 1.5);
    });
  } catch {}
};

export const GameplayPreview: React.FC = () => {
  const { t } = useLanguage();
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [reels, setReels] = useState<SlotSymbol[]>([SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]]);

  const spin = useCallback(() => {
    if (isSpinning || balance < bet) return;
    warmUpAudio(); // unlock AudioContext on user gesture
    setIsSpinning(true);
    setBalance(b => b - bet);
    setShowWin(false);
    playSpinSound();

    // Reduced to every 150ms (from 100ms) to cut state updates during spin
    const interval = setInterval(() => {
      setReels(() => {
        const shuffled = [...SYMBOLS].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      const isWin = Math.random() < 0.3;
      if (isWin) {
        const w = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        setReels([w, w, w]);
        const winAmount = bet * (Math.floor(Math.random() * 10) + 5);
        setBalance(prev => prev + winAmount);
        setShowWin(true);
        playWinSound();
        setTimeout(() => setShowWin(false), 3000);
      } else {
        setReels([...SYMBOLS].sort(() => Math.random() - 0.5).slice(0, 3));
      }
      setIsSpinning(false);
    }, 2000);
  }, [isSpinning, balance, bet]);

  return (
    <section className="pt-20 sm:pt-28 pb-0 min-h-screen relative overflow-hidden cv-auto ">
      {/* Background image */}
      <img src={gameplayBg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover z-0" />
      {/* Dark overlay so content stays readable over the background image */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent z-[2]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px] z-[2]" />

      <div className="w-full px-4 sm:px-6 max-w-lg lg:max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 mt-2 sm:mt-4">
            {t('gameplayPreview')}
          </h2>
          <p className="text-lime-500 text-sm">Teste sua sorte agora mesmo</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Device Frame ── */}
          <div className="relative mx-auto mt-8">
            {/* Bezel / device shell */}
            <div className="bg-gradient-to-b from-[#2a2a3a] to-[#1a1a28] rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] p-[6px] sm:p-2 lg:p-3 shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.08)] border border-white/[0.08]">
              {/* Phone notch (mobile only) */}
              <div className="sm:hidden flex justify-center pt-1.5 pb-1">
                <div className="w-20 h-[5px] bg-black/60 rounded-full" />
              </div>
              {/* Desktop camera dot (desktop only) */}
              <div className="hidden sm:flex justify-center pt-1.5 pb-1">
                <div className="w-2.5 h-2.5 bg-black/50 rounded-full border border-white/[0.06]" />
              </div>

              {/* Screen area */}
              <div className="bg-[#0d0b18] rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">
          <div className="p-5 sm:p-8 lg:p-10">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-6 sm:mb-8 lg:mb-10 glass-card rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5">
              <div>
                <p className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-wider">{t('balance')}</p>
                <motion.p
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tabular-nums"
                  animate={{ scale: balance !== 1000 ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  R$ {balance}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-wider">{t('bet')}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400 tabular-nums">R$ {bet}</p>
              </div>
            </div>

            {/* Reels */}
            <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-10">
              {reels.map((symbol, i) => (
                <div
                  key={i}
                  className="w-[85px] h-[100px] sm:w-[100px] sm:h-[120px] lg:w-[140px] lg:h-[160px] bg-white rounded-xl lg:rounded-2xl flex items-center justify-center border border-white/[0.08] relative overflow-hidden p-3 sm:p-4 lg:p-5"
                >
                  <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#0d0b18]/60 to-transparent z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#0d0b18]/60 to-transparent z-10" />
                  <motion.img
                    src={symbol.src}
                    alt={symbol.alt}
                    className="w-full h-full object-contain"
                    animate={{ y: isSpinning ? [0, -20, 0] : 0 }}
                    transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
                  />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setBet(Math.max(1, bet - 5))}
                  disabled={isSpinning}
                  className="w-10 h-10 lg:w-12 lg:h-12 glass-card rounded-lg lg:rounded-xl font-bold text-white disabled:opacity-30 hover:border-white/[0.15] transition-colors text-sm lg:text-base"
                >
                  −
                </button>
                <span className="text-white font-semibold min-w-[70px] lg:min-w-[90px] text-center text-sm lg:text-base tabular-nums">
                  R$ {bet}
                </span>
                <button
                  onClick={() => setBet(Math.min(100, bet + 5))}
                  disabled={isSpinning}
                  className="w-10 h-10 lg:w-12 lg:h-12 glass-card rounded-lg lg:rounded-xl font-bold text-white disabled:opacity-30 hover:border-white/[0.15] transition-colors text-sm lg:text-base"
                >
                  +
                </button>
              </div>

              <motion.button
                onClick={spin}
                disabled={isSpinning || balance < bet}
                whileHover={{ scale: isSpinning ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 sm:py-5 lg:py-6 rounded-xl lg:rounded-2xl font-bold text-white text-lg lg:text-xl overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600" />
                <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-white/[0.12] to-transparent opacity-60" />
                {isSpinning && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSpinning ? (
                    'Girando...'
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      {t('spin')}
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
              </div>
              {/* End screen area */}
            </div>
            {/* End bezel */}

            {/* Desktop stand — tall neck so it looks like it emerges from below the viewport */}
            <div className="hidden sm:block">
              <div className="mx-auto w-16 lg:w-20 h-24 lg:h-52 bg-gradient-to-b from-[#2a2a3a] via-[#222233] to-[#1a1a28] border-x border-white/[0.05]" />
              <div className="mx-auto w-40 lg:w-52 h-2 bg-gradient-to-b from-[#2a2a3a] to-[#1a1a28] rounded-b-xl border border-t-0 border-white/[0.06]" />
            </div>

            {/* Phone home bar (mobile only) */}
            <div className="sm:hidden flex justify-center mt-1">
              <div className="w-28 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
          {/* ── End Device Frame ── */}
        </motion.div>
      </div>

      {/* Win celebration */}
      <AnimatePresence>
        {showWin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* Floating golden coins background */}
            {[...Array(18)].map((_, i) => {
              const size = 28 + Math.random() * 24; // 28–52px
              const startX = Math.random() * 100; // random horizontal %
              const delay = Math.random() * 0.6;
              const duration = 2.2 + Math.random() * 1.5;
              const drift = (Math.random() - 0.5) * 120; // horizontal sway
              return (
                <motion.div
                  key={`coin-${i}`}
                  className="absolute"
                  style={{
                    left: `${startX}%`,
                    bottom: '-10%',
                    width: size,
                    height: size,
                    filter: `drop-shadow(0 0 8px rgba(251,191,36,0.5))`,
                  }}
                  initial={{ y: 0, x: 0, opacity: 0, rotateY: 0 }}
                  animate={{
                    y: [0, -window.innerHeight * 0.5 - Math.random() * window.innerHeight * 0.5],
                    x: [0, drift],
                    opacity: [0, 1, 1, 0],
                    rotateY: [0, 360 * (1 + Math.floor(Math.random() * 2))],
                  }}
                  transition={{
                    duration,
                    delay,
                    ease: 'easeOut',
                  }}
                >
                  {/* Coin SVG */}
                  <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: 'block' }}>
                    <defs>
                      <radialGradient id={`coinGrad${i}`} cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#FDE68A" />
                        <stop offset="50%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#B45309" />
                      </radialGradient>
                    </defs>
                    <circle cx="32" cy="32" r="30" fill={`url(#coinGrad${i})`} stroke="#92400E" strokeWidth="2" />
                    <circle cx="32" cy="32" r="24" fill="none" stroke="#FDE68A" strokeWidth="1.5" opacity="0.5" />
                    <text x="32" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#92400E" opacity="0.7">$</text>
                  </svg>
                </motion.div>
              );
            })}

            <div className="text-5xl sm:text-8xl font-extrabold text-glow-green bg-gradient-to-r from-emerald-500 to-amber-400 bg-clip-text text-transparent">
              {t('bigWin')}
            </div>
            {/* Sparkle particles */}
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#059669', '#FBBF24', '#10B981', '#F59E0B'][i % 4],
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                }}
                transition={{ duration: 1.5 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};