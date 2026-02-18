import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Play } from 'lucide-react';

// Spin reel sound — rapid ticking
const playSpinSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
  const [reels, setReels] = useState(['🍒', '🍋', '⭐']);

  const symbols = ['🍒', '🍋', '⭐', '💎', '7️⃣', '🍀', '🔔'];

  const spin = () => {
    if (isSpinning || balance < bet) return;
    setIsSpinning(true);
    setBalance(balance - bet);
    setShowWin(false);
    playSpinSound();

    const interval = setInterval(() => {
      setReels(symbols.sort(() => Math.random() - 0.5).slice(0, 3));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const isWin = Math.random() < 0.3;
      if (isWin) {
        const w = symbols[Math.floor(Math.random() * symbols.length)];
        setReels([w, w, w]);
        const winAmount = bet * (Math.floor(Math.random() * 10) + 5);
        setBalance(prev => prev + winAmount);
        setShowWin(true);
        playWinSound();
        setTimeout(() => setShowWin(false), 3000);
      } else {
        setReels(symbols.sort(() => Math.random() - 0.5).slice(0, 3));
      }
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#080c18] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-red-600/[0.03] rounded-full blur-[100px]" />

      <div className="w-full px-4 sm:px-6 max-w-lg mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            {t('gameplayPreview')}
          </h2>
          <p className="text-gray-500 text-sm">Teste sua sorte agora mesmo</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-red-500/10">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-6 sm:mb-8 glass-card rounded-xl p-3 sm:p-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{t('balance')}</p>
                <motion.p
                  className="text-xl sm:text-2xl font-bold text-white tabular-nums"
                  animate={{ scale: balance !== 1000 ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  R$ {balance}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{t('bet')}</p>
                <p className="text-xl sm:text-2xl font-bold text-red-400 tabular-nums">R$ {bet}</p>
              </div>
            </div>

            {/* Reels */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {reels.map((symbol, i) => (
                <div
                  key={i}
                  className="w-[85px] h-[100px] sm:w-[100px] sm:h-[120px] glass-card rounded-xl flex items-center justify-center text-4xl sm:text-5xl border border-white/[0.08] relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#0d1117]/80 to-transparent z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#0d1117]/80 to-transparent z-10" />
                  <motion.span
                    animate={{ y: isSpinning ? [0, -20, 0] : 0 }}
                    transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
                  >
                    {symbol}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setBet(Math.max(1, bet - 5))}
                  disabled={isSpinning}
                  className="w-10 h-10 glass-card rounded-lg font-bold text-white disabled:opacity-30 hover:border-white/[0.15] transition-colors text-sm"
                >
                  −
                </button>
                <span className="text-white font-semibold min-w-[70px] text-center text-sm tabular-nums">
                  R$ {bet}
                </span>
                <button
                  onClick={() => setBet(Math.min(100, bet + 5))}
                  disabled={isSpinning}
                  className="w-10 h-10 glass-card rounded-lg font-bold text-white disabled:opacity-30 hover:border-white/[0.15] transition-colors text-sm"
                >
                  +
                </button>
              </div>

              <motion.button
                onClick={spin}
                disabled={isSpinning || balance < bet}
                whileHover={{ scale: isSpinning ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 sm:py-5 rounded-xl font-bold text-white text-lg overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
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
            <div className="text-5xl sm:text-8xl font-extrabold text-glow-red bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">
              {t('bigWin')}
            </div>
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#DC2626', '#FBBF24', '#EF4444', '#F59E0B'][i % 4],
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