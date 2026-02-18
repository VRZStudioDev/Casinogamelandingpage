import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [jackpot, setJackpot] = useState(1234567);

  // Animate jackpot counter
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot(prev => prev + Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Floating elements data
  const floatingElements = [
    { emoji: '🎰', delay: 0, duration: 20 },
    { emoji: '🎲', delay: 2, duration: 18 },
    { emoji: '🃏', delay: 4, duration: 22 },
    { emoji: '💎', delay: 1, duration: 19 },
    { emoji: '🎯', delay: 3, duration: 21 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 px-3 sm:px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] via-[#1a0a2e] to-[#0A0F1F]">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 0, 110, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(197, 17, 98, 0.2) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 hidden sm:block">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF006E] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating Elements - Reduced on mobile */}
      {floatingElements.slice(0, 3).map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl sm:text-6xl opacity-10 sm:opacity-20 hidden sm:block"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          }}
          animate={{
            y: -200,
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'linear',
          }}
        >
          {element.emoji}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline */}
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-2"
            style={{
              textShadow: '0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.3)',
            }}
          >
            <span className="bg-gradient-to-r from-[#FF006E] via-[#FF4081] to-[#FF006E] bg-clip-text text-transparent inline-block">
              {t('heroHeadline')}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
          >
            {t('heroSubheadline')}
          </motion.p>

          {/* Jackpot Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block bg-gradient-to-r from-[#FF006E]/20 to-[#FF4081]/20 backdrop-blur-sm border border-[#FF006E]/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12 w-full max-w-sm sm:max-w-none mx-4"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF006E] animate-pulse" />
              <p className="text-xs sm:text-sm uppercase tracking-wider text-[#FF4081]">{t('currentJackpot')}</p>
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF006E] animate-pulse" />
            </div>
            <motion.div
              className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              ${jackpot.toLocaleString()}
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-[#FF006E] to-[#C51162] rounded-full text-lg sm:text-2xl font-bold text-white shadow-2xl shadow-[#FF006E]/50 overflow-hidden group w-full max-w-xs sm:max-w-none sm:w-auto mx-4"
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
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 0, 110, 0.5)',
                  '0 0 40px rgba(255, 0, 110, 0.8)',
                  '0 0 20px rgba(255, 0, 110, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="relative z-10">{t('playNow')}</span>
          </motion.button>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <div className="w-6 h-10 border-2 border-[#FF006E] rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-[#FF006E] rounded-full mt-2"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};