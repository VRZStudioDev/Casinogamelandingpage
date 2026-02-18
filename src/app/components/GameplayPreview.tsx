import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

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

    // Animate reels
    const spinDuration = 2000;
    const interval = setInterval(() => {
      setReels(symbols.sort(() => Math.random() - 0.5).slice(0, 3));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      
      // 30% chance to win
      const isWin = Math.random() < 0.3;
      
      if (isWin) {
        const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        setReels([winningSymbol, winningSymbol, winningSymbol]);
        const winAmount = bet * (Math.floor(Math.random() * 10) + 5);
        setBalance(prev => prev + winAmount);
        setShowWin(true);
        setTimeout(() => setShowWin(false), 3000);
      } else {
        setReels(symbols.sort(() => Math.random() - 0.5).slice(0, 3));
      }
      
      setIsSpinning(false);
    }, spinDuration);
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-[#1a0a2e] to-[#0A0F1F] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#FF006E]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#C51162]/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-3 sm:px-4 max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent px-4"
        >
          {t('gameplayPreview')}
        </motion.h2>

        {/* Slot Machine Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="bg-gradient-to-br from-[#2a1a4e] to-[#1a0a2e] border-4 border-[#FF006E] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl shadow-[#FF006E]/30">
            {/* Top Display */}
            <div className="bg-black/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-[#FF006E]/30">
              <div className="flex justify-between items-center text-[#FF006E]">
                <div>
                  <p className="text-xs sm:text-sm opacity-70">{t('balance')}</p>
                  <motion.p
                    className="text-xl sm:text-2xl font-bold"
                    animate={{
                      scale: balance !== 1000 ? [1, 1.2, 1] : 1,
                    }}
                  >
                    ${balance}
                  </motion.p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-70">{t('bet')}</p>
                  <p className="text-xl sm:text-2xl font-bold">${bet}</p>
                </div>
              </div>
            </div>

            {/* Reels */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              {reels.map((symbol, index) => (
                <motion.div
                  key={index}
                  className="w-20 h-28 sm:w-24 sm:h-32 bg-gradient-to-b from-white/20 to-white/5 border-2 border-[#FF006E]/50 rounded-xl flex items-center justify-center text-5xl sm:text-6xl relative overflow-hidden"
                  animate={{
                    y: isSpinning ? [0, -500] : 0,
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: isSpinning ? Infinity : 0,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  {symbol}
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="space-y-3 sm:space-y-4">
              {/* Bet Adjustment */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setBet(Math.max(1, bet - 5))}
                  disabled={isSpinning}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-lg font-bold text-white border border-white/20 transition-all text-sm sm:text-base"
                >
                  -
                </button>
                <span className="text-white font-semibold min-w-[60px] sm:min-w-[80px] text-center text-sm sm:text-base">
                  ${bet}
                </span>
                <button
                  onClick={() => setBet(Math.min(100, bet + 5))}
                  disabled={isSpinning}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-lg font-bold text-white border border-white/20 transition-all text-sm sm:text-base"
                >
                  +
                </button>
              </div>

              {/* Spin Button */}
              <motion.button
                onClick={spin}
                disabled={isSpinning || balance < bet}
                whileHover={{ scale: isSpinning ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 sm:py-6 bg-gradient-to-r from-[#FF006E] to-[#C51162] rounded-xl text-xl sm:text-2xl font-bold text-white shadow-xl shadow-[#FF006E]/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: isSpinning ? ['-200%', '200%'] : '-200%',
                  }}
                  transition={{
                    duration: 1,
                    repeat: isSpinning ? Infinity : 0,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10">
                  {isSpinning ? '🎰 SPINNING...' : `${t('spin')} 🎰`}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Big Win Celebration */}
      <AnimatePresence>
        {showWin && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4"
          >
            <motion.div
              className="text-6xl sm:text-9xl font-bold bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 0.5,
                repeat: 5,
              }}
            >
              {t('bigWin')}
            </motion.div>

            {/* Confetti */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                style={{
                  background: ['#FF006E', '#FF4081', '#F50057', '#C51162', '#FF1744'][i % 5],
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 1000,
                }}
                transition={{
                  duration: 2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};