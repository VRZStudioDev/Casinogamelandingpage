import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Users, TrendingUp } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-[#0A0F1F] via-[#2a1a4e] to-[#0A0F1F] relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(197, 17, 98, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* Floating Elements - Hidden on mobile */}
      <div className="hidden sm:block">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl sm:text-4xl opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * 100 - 50],
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {['💰', '🎰', '🎲', '💎'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="w-full px-3 sm:px-4 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-6 leading-tight px-4"
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 0, 110, 0.5)',
                '0 0 40px rgba(255, 0, 110, 0.8)',
                '0 0 20px rgba(255, 0, 110, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span className="bg-gradient-to-r from-[#FF006E] via-[#FF4081] to-[#FF006E] bg-clip-text text-transparent">
              {t('readyToWin')}
            </span>
          </motion.h2>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3"
            >
              <Users className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF4081]" />
              <span className="text-white font-semibold text-sm sm:text-base">{t('joinPlayers')}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3"
            >
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF006E]" />
              <span className="text-white font-semibold text-sm sm:text-base">{t('winningEvery')}</span>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative inline-block w-full sm:w-auto px-4"
          >
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#FF006E]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full sm:w-auto px-10 sm:px-16 py-6 sm:py-8 bg-gradient-to-r from-[#FF006E] to-[#C51162] rounded-full text-2xl sm:text-3xl font-bold text-white shadow-2xl shadow-[#FF006E]/50 flex items-center justify-center gap-3 sm:gap-4 overflow-hidden group"
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
              <span className="relative z-10">{t('claimBonusNow')}</span>
              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 relative z-10" />
              </motion.div>
            </motion.button>

            {/* Arrow Pointing to Button - Hidden on mobile */}
            <motion.div
              className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl hidden sm:block"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              ⬆️
            </motion.div>
          </motion.div>

          {/* Urgency Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8 text-gray-400 text-base sm:text-lg px-4"
          >
            🔥 <span className="text-red-400 font-semibold">Limited spots available</span> - 
            <motion.span
              className="text-[#FF006E] font-bold ml-1"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              127 players joined today
            </motion.span>
          </motion.p>

          {/* Trust Indicators */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 px-4">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Licensed & Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Instant Withdrawals</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};