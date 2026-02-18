import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Gift, TrendingUp, Users, Clock } from 'lucide-react';

export const WelcomeBonus: React.FC = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 30 });
  const [recentWinners, setRecentWinners] = useState<{ name: string; amount: string }[]>([]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) hours = 23;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recent winners popup
  useEffect(() => {
    const winners = [
      { name: 'João S.', amount: '$2,450' },
      { name: 'María G.', amount: '$1,890' },
      { name: 'Carlos R.', amount: '$3,200' },
      { name: 'Ana P.', amount: '$1,500' },
      { name: 'Pedro M.', amount: '$4,100' },
    ];

    const showWinner = () => {
      const randomWinner = winners[Math.floor(Math.random() * winners.length)];
      setRecentWinners(prev => [randomWinner, ...prev.slice(0, 2)]);
    };

    const interval = setInterval(showWinner, 5000);
    showWinner();
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-[#0A0F1F] via-[#1a0a2e] to-[#0A0F1F] relative overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.2) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.1) 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      <div className="w-full px-3 sm:px-4 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FF006E]/10 to-[#C51162]/10 backdrop-blur-lg border-2 border-[#FF006E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
        >
          {/* Shine Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Gift Icon */}
          <motion.div
            className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 text-6xl sm:text-9xl opacity-20"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            🎁
          </motion.div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <motion.div
                className="inline-flex items-center gap-2 bg-[#FF006E]/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF006E]" />
                <span className="text-xs sm:text-sm font-semibold text-[#FF006E]">LIMITED TIME OFFER</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent">
                  {t('welcomeBonus')}
                </span>
              </h2>
              <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2">
                {t('upTo')}
              </p>
              <p className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FF4081] to-[#F50057] bg-clip-text text-transparent">
                {t('freeSpins')}
              </p>
            </div>

            {/* Bonus Breakdown */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-[#FF006E]/30 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF006E]" />
                  <h3 className="font-semibold text-white text-sm sm:text-base">{t('firstDeposit')}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FF006E] to-[#FF4081]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-[#FF4081]/30 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    🪙
                  </motion.div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">{t('freeSpinsOn')}</h3>
                </div>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-2 sm:h-3 bg-gradient-to-r from-[#FF4081] to-[#F50057] rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 animate-pulse" />
                <p className="text-red-400 font-semibold text-sm sm:text-base">{t('offerEnds')}</p>
              </div>
              <div className="flex justify-center gap-2 sm:gap-4">
                {[
                  { value: timeLeft.hours, label: t('hours') },
                  { value: timeLeft.minutes, label: t('minutes') },
                  { value: timeLeft.seconds, label: 's' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[70px]"
                      animate={{
                        scale: item.label === 's' && timeLeft.seconds % 2 === 0 ? 1.05 : 1,
                      }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">{item.label}</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 sm:py-6 bg-gradient-to-r from-[#FF006E] to-[#C51162] rounded-xl text-xl sm:text-2xl font-bold text-white shadow-2xl shadow-[#FF006E]/50 relative overflow-hidden group mb-4 sm:mb-6"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative z-10">{t('claimBonus')}</span>
            </motion.button>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>
                {t('limitedOffer')} - <strong className="text-[#FF006E]">127</strong> {t('playersJoined')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Winner Notifications - Hidden on small mobile */}
      <div className="fixed right-2 sm:right-4 top-20 sm:top-24 z-50 space-y-2 hidden sm:block">
        {recentWinners.slice(0, 2).map((winner, index) => (
          <motion.div
            key={`${winner.name}-${index}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-gradient-to-r from-green-900/90 to-emerald-900/90 backdrop-blur-lg border border-green-500/50 rounded-lg p-3 sm:p-4 shadow-xl max-w-[200px] sm:max-w-[250px]"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl">🎉</div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">{winner.name}</p>
                <p className="text-green-400 font-bold text-sm sm:text-base">{winner.amount}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
