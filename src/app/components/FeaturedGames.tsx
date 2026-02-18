import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Flame, TrendingUp } from 'lucide-react';

interface Game {
  id: number;
  name: string;
  rtp: string;
  players: string;
  gradient: string;
  emoji: string;
}

export const FeaturedGames: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  const games: Game[] = [
    {
      id: 1,
      name: 'Mega Fortune',
      rtp: '97.5%',
      players: '2.3k',
      gradient: 'from-[#FF006E] to-[#C51162]',
      emoji: '🎰',
    },
    {
      id: 2,
      name: 'Royal Roulette',
      rtp: '98.2%',
      players: '1.8k',
      gradient: 'from-[#F50057] to-[#880E4F]',
      emoji: '🎡',
    },
    {
      id: 3,
      name: 'Diamond Blackjack',
      rtp: '99.1%',
      players: '3.1k',
      gradient: 'from-[#FF4081] to-[#AD1457]',
      emoji: '🃏',
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#0A0F1F] relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#FF006E] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#C51162] rounded-full blur-3xl" />
      </div>

      <div className="w-full px-3 sm:px-4 max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent px-4"
        >
          {t('featuredGames')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredGame(game.id)}
              onHoverEnd={() => setHoveredGame(null)}
              className="relative group cursor-pointer"
            >
              <motion.div
                className={`relative h-72 sm:h-80 rounded-xl sm:rounded-2xl bg-gradient-to-br ${game.gradient} p-4 sm:p-6 flex flex-col justify-between overflow-hidden`}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: hoveredGame === game.id ? ['-200%', '200%'] : '-200%',
                  }}
                  transition={{
                    duration: 1,
                    ease: 'linear',
                  }}
                />

                {/* Game Icon */}
                <div className="relative z-10">
                  <motion.div
                    className="text-6xl sm:text-8xl mb-3 sm:mb-4"
                    animate={{
                      rotate: hoveredGame === game.id ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {game.emoji}
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{game.name}</h3>
                  
                  {/* RTP Badge */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-xs sm:text-sm font-semibold text-white bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                      {game.rtp} RTP
                    </span>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                      <span className="text-xs sm:text-sm font-semibold">
                        {game.players} {t('playingNow')}
                      </span>
                    </div>
                  </div>

                  {/* Play Button - Shows on Hover */}
                  <AnimatePresence>
                    {hoveredGame === game.id && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-3 sm:mt-4 w-full py-2 sm:py-3 bg-white text-[#FF006E] font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
                      >
                        {t('play')}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl"
                  animate={{
                    boxShadow: hoveredGame === game.id
                      ? ['0 0 20px rgba(255, 0, 110, 0.3)', '0 0 40px rgba(255, 0, 110, 0.5)', '0 0 20px rgba(255, 0, 110, 0.3)']
                      : '0 0 0px rgba(255, 0, 110, 0)',
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Auto-scrolling Carousel of Game Icons */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 sm:gap-8"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...Array(20)].map((_, i) => {
              const emojis = ['🎰', '🎲', '🃏', '🎯', '💎', '🎡', '🎪'];
              return (
                <div
                  key={i}
                  className="text-3xl sm:text-4xl opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {emojis[i % emojis.length]}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
