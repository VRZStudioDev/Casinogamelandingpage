import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Flame, TrendingUp, Play } from 'lucide-react';

interface Game {
  id: number;
  name: string;
  provider: string;
  rtp: string;
  players: string;
  image: string;
  hot?: boolean;
}

export const FeaturedGames: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  const games: Game[] = [
    { id: 1, name: 'Fortune Tiger', provider: 'PG Soft', rtp: '96.8%', players: '2.3k', image: 'https://casinoamambay.online/uploads/jogos/Fortune%20tiger.png', hot: true },
    { id: 2, name: 'Gates of Olympus', provider: 'Pragmatic', rtp: '96.5%', players: '1.8k', image: 'https://casinoamambay.online/uploads/jogos/gates%20of%20olympus_1.png' },
    { id: 3, name: 'Sweet Bonanza', provider: 'Pragmatic', rtp: '96.5%', players: '3.1k', image: 'https://casinoamambay.online/uploads/jogos/sweet%20bonanza_1.png', hot: true },
    { id: 4, name: 'Fortune Rabbit', provider: 'PG Soft', rtp: '96.7%', players: '1.5k', image: 'https://casinoamambay.online/uploads/jogos/Fortune%20Rabbit.png' },
    { id: 5, name: 'Aviator', provider: 'Spribe', rtp: '97.0%', players: '4.2k', image: 'https://casinoamambay.online/uploads/jogos/aviator_1.png', hot: true },
    { id: 6, name: 'Fortune Ox', provider: 'PG Soft', rtp: '96.8%', players: '2.0k', image: 'https://casinoamambay.online/uploads/jogos/Fortune%20ox.png' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080c18] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/[0.04] rounded-full blur-[100px]" />

      <div className="w-full px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/15 mb-4">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-medium text-red-400/80 tracking-wide uppercase">Mais Jogados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t('featuredGames')}
          </h2>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {games.map((game, index) => (
            <motion.a
              key={game.id}
              href="https://casinoamambay.online"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setHoveredGame(game.id)}
              onHoverEnd={() => setHoveredGame(null)}
              className="relative group cursor-pointer"
            >
              <motion.div
                className="relative rounded-xl overflow-hidden card-shine"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {/* Image */}
                <div className="aspect-[3/4] bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={hoveredGame === game.id ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                      className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-600/40"
                    >
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </motion.div>
                  </div>

                  {/* Hot badge */}
                  {game.hot && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-red-600/90 text-[10px] font-bold text-white tracking-wider flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5" />
                      HOT
                    </div>
                  )}

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">{game.name}</h3>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-gray-400">{game.provider}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-green-400" />
                      <span className="text-[10px] text-green-400/80">{game.players}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <motion.a
            href="https://casinoamambay.online/game/casino"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 text-sm font-medium text-gray-300 hover:text-white"
          >
            Ver todos os jogos
            <span className="text-red-400">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
      
export default FeaturedGames;