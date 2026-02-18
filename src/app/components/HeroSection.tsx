import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Star, Trophy } from 'lucide-react';

const JACKPOT_KEY = 'casino_jackpot';
const JACKPOT_TS_KEY = 'casino_jackpot_ts';
const JACKPOT_BASE = 1234567;

const getStoredJackpot = (): number => {
  try {
    const stored = localStorage.getItem(JACKPOT_KEY);
    const ts = localStorage.getItem(JACKPOT_TS_KEY);
    if (stored && ts) {
      const elapsed = Date.now() - Number(ts);
      // Simulate increments that would have happened while away (~45 per 1.8s)
      const missedTicks = Math.floor(elapsed / 1800);
      const offlineGain = missedTicks * 45;
      return Number(stored) + offlineGain;
    }
  } catch {}
  return JACKPOT_BASE;
};

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [jackpot, setJackpot] = useState(getStoredJackpot);

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot(prev => {
        const next = prev + Math.floor(Math.random() * 73 + 17);
        try {
          localStorage.setItem(JACKPOT_KEY, String(next));
          localStorage.setItem(JACKPOT_TS_KEY, String(Date.now()));
        } catch {}
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Layered Background ── */}
      <div className="absolute inset-0 bg-[#080c18]">
        {/* Mesh gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-800/[0.08] blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-500/[0.03] blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 hidden sm:block">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                background: i % 3 === 0 ? 'rgba(220,38,38,0.6)' : 'rgba(255,255,255,0.2)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60 - Math.random() * 40, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 mb-6 sm:mb-8"
        >
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs sm:text-sm font-medium text-red-300/90 tracking-wide">
            #1 Casino Online do Paraguay
          </span>
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-5 sm:mb-7 leading-[0.95] tracking-tight"
        >
          <span className="block text-white">
            {t('heroHeadline').split(' ').slice(0, 2).join(' ')}
          </span>
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
            {t('heroHeadline').split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {t('heroSubheadline')}
        </motion.p>

        {/* Jackpot Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block w-full max-w-md sm:max-w-lg mb-10 sm:mb-14"
        >
          <div className="relative glass-card rounded-2xl p-5 sm:p-8 border border-white/[0.06] overflow-hidden">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <div className="absolute inset-0 rounded-2xl shimmer-bg" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-amber-400/80 font-semibold">
                  {t('currentJackpot')}
                </p>
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>

              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-black text-glow-gold"
                style={{ color: '#FBBF24' }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                R$ {jackpot.toLocaleString('pt-BR')}
              </motion.div>

              <div className="mt-3 flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400/80 font-medium">Atualizado em tempo real</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary CTA */}
          <motion.a
            href="https://casinoamambay.online"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 rounded-xl font-bold text-white text-lg sm:text-xl overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 gradient-animate rounded-xl" />
            <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-white/[0.15] to-transparent opacity-60" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {t('playNow')}
            </span>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="https://casinoamambay.online/bonus"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 rounded-xl font-semibold text-white/90 text-lg sm:text-xl bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 cursor-pointer"
          >
            {t('claimBonus')}
          </motion.a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-14 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '500K+', label: 'Jogadores' },
            { value: 'R$2M+', label: 'Pagos hoje' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080c18] to-transparent" />
    </section>
  );
};