import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Gift, TrendingUp, Users, Clock, Zap } from 'lucide-react';

export const WelcomeBonus: React.FC = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 30 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) hours = 23;
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-[#080c18] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/[0.04] rounded-full blur-[120px]" />

      <div className="w-full px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* Card background with inner border glow */}
          <div className="absolute inset-0 glass-card" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 md:p-14">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <motion.div
                className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mb-5"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400/90 tracking-wide uppercase">Oferta Limitada</span>
              </motion.div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
                {t('welcomeBonus')}
              </h2>
              <p className="text-2xl sm:text-4xl font-bold text-white/90 mb-1">{t('upTo')}</p>
              <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                {t('freeSpins')}
              </p>
            </div>

            {/* Bonus Features Grid */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="glass-card rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{t('firstDeposit')}</h3>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/20 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{t('freeSpinsOn')}</h3>
                </div>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="glass-card rounded-xl p-4 sm:p-5 mb-8 border border-red-500/10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-red-400" />
                <p className="text-red-400 font-semibold text-sm">{t('offerEnds')}</p>
              </div>
              <div className="flex justify-center gap-3">
                {[
                  { value: timeLeft.hours, label: t('hours') },
                  { value: timeLeft.minutes, label: t('minutes') },
                  { value: timeLeft.seconds, label: 's' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 sm:px-5 py-2 sm:py-3 min-w-[52px] sm:min-w-[70px]">
                      <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="https://casinoamambay.online/bonus"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block relative w-full py-4 sm:py-5 rounded-xl font-bold text-white text-lg sm:text-xl overflow-hidden group text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 gradient-animate" />
              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-white/[0.12] to-transparent opacity-60" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative z-10">{t('claimBonus')}</span>
            </motion.a>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5" />
              <span>{t('limitedOffer')} · <strong className="text-red-400">127</strong> {t('playersJoined')}</span>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};
