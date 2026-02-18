import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

interface Winner {
  name: string;
  location: string;
  amount: string;
  quote: string;
  timeAgo: string;
  avatar: string;
}

export const TestimonialsGallery: React.FC = () => {
  const { t } = useLanguage();

  const winners: Winner[] = [
    {
      name: 'João Silva',
      location: 'São Paulo, BR',
      amount: '$12,450',
      quote: 'Incredible experience! Won big on my first week!',
      timeAgo: '2',
      avatar: '👨',
    },
    {
      name: 'María García',
      location: 'Madrid, ES',
      amount: '$8,900',
      quote: 'Best casino I\'ve played at. Fast withdrawals!',
      timeAgo: '5',
      avatar: '👩',
    },
    {
      name: 'Pierre Dubois',
      location: 'Paris, FR',
      amount: '$15,200',
      quote: 'Amazing bonuses and great games selection!',
      timeAgo: '3',
      avatar: '👨‍💼',
    },
    {
      name: 'Ana Santos',
      location: 'Asunción, PY',
      amount: '$6,750',
      quote: 'Fair play and excellent customer support!',
      timeAgo: '7',
      avatar: '👩‍💼',
    },
    {
      name: 'Carlos Mendez',
      location: 'Buenos Aires, AR',
      amount: '$11,300',
      quote: 'Won the jackpot! Can\'t believe it!',
      timeAgo: '4',
      avatar: '👨‍🦱',
    },
    {
      name: 'Sophie Laurent',
      location: 'Lyon, FR',
      amount: '$9,500',
      quote: 'Great variety of games and secure platform!',
      timeAgo: '6',
      avatar: '👩‍🦰',
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-[#0A0F1F] to-[#1a0a2e] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl sm:text-4xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
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
            💰
          </motion.div>
        ))}
      </div>

      <div className="w-full px-3 sm:px-4 max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent px-4"
        >
          {t('winners')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-12 sm:mb-16 text-sm sm:text-base"
        >
          {t('joinPlayers')}
        </motion.p>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {winners.map((winner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-[#FF006E]/30 rounded-xl p-4 sm:p-6 relative overflow-hidden group"
            >
              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF006E]/0 via-[#FF006E]/10 to-[#FF006E]/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Avatar & Info */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="text-4xl sm:text-5xl">{winner.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm sm:text-base">{winner.name}</h3>
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">{winner.location}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 italic">"{winner.quote}"</p>

                {/* Win Amount & Time */}
                <div className="flex items-center justify-between">
                  <div className="bg-gradient-to-r from-[#FF006E] to-[#FF4081] rounded-lg px-3 sm:px-4 py-1.5 sm:py-2">
                    <p className="text-[10px] sm:text-xs text-white font-semibold">{t('won')}</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{winner.amount}</p>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {winner.timeAgo} {t('hoursAgo')}
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-green-500/20 border border-green-500/50 rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                  <p className="text-[10px] sm:text-xs text-green-400 font-semibold">{t('verified')}</p>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute bottom-0 right-0 text-5xl sm:text-6xl opacity-10 transform translate-x-4 translate-y-4">
                🏆
              </div>
            </motion.div>
          ))}
        </div>

        {/* Auto-updating Ticker */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-transparent via-[#FF006E]/10 to-transparent border-y border-[#FF006E]/20 py-3 sm:py-4 overflow-hidden">
          <motion.div
            className="flex gap-6 sm:gap-8 whitespace-nowrap"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-green-400">✓</span>
                <span className="text-gray-400">
                  Player <strong className="text-white">{winners[i % winners.length].name}</strong> won{' '}
                  <strong className="text-[#FF006E]">{winners[i % winners.length].amount}</strong>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};