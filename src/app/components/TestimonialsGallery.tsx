import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Trophy } from 'lucide-react';

interface Winner {
  name: string;
  location: string;
  amount: string;
  quote: string;
  timeAgo: string;
  initials: string;
  color: string;
}

export const TestimonialsGallery: React.FC = () => {
  const { t } = useLanguage();

  const winners: Winner[] = [
    { name: 'João S.', location: 'São Paulo, BR', amount: 'R$ 12.450', quote: 'Experiência incrível! Ganhei muito na minha primeira semana!', timeAgo: '2', initials: 'JS', color: 'from-red-500 to-rose-600' },
    { name: 'María G.', location: 'Asunción, PY', amount: 'R$ 8.900', quote: 'Melhor casino que já joguei. Saques rápidos!', timeAgo: '5', initials: 'MG', color: 'from-amber-500 to-orange-600' },
    { name: 'Pedro R.', location: 'Ciudad del Este, PY', amount: 'R$ 15.200', quote: 'Bônus incríveis e ótima seleção de jogos!', timeAgo: '3', initials: 'PR', color: 'from-emerald-500 to-green-600' },
    { name: 'Ana P.', location: 'Encarnación, PY', amount: 'R$ 6.750', quote: 'Jogo justo e excelente suporte ao cliente!', timeAgo: '7', initials: 'AP', color: 'from-blue-500 to-indigo-600' },
    { name: 'Carlos M.', location: 'Buenos Aires, AR', amount: 'R$ 11.300', quote: 'Ganhei o jackpot! Não acredito!', timeAgo: '4', initials: 'CM', color: 'from-purple-500 to-violet-600' },
    { name: 'Lucia F.', location: 'São Paulo, BR', amount: 'R$ 9.500', quote: 'Grande variedade de jogos e plataforma segura!', timeAgo: '6', initials: 'LF', color: 'from-pink-500 to-rose-600' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080c18] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="w-full px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/15 rounded-full px-4 py-1.5 mb-5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400/90 tracking-wide uppercase">Ganhadores Recentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            {t('winners')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            {t('joinPlayers')}
          </p>
        </motion.div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {winners.map((winner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-xl p-4 sm:p-5 relative group hover:border-white/[0.1] transition-colors duration-300"
            >
              {/* Verified badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-green-400 font-medium">{t('verified')}</span>
              </div>

              {/* Avatar & Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${winner.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{winner.initials}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{winner.name}</h3>
                  <p className="text-xs text-gray-500">{winner.location}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-400 text-xs leading-relaxed mb-3">"{winner.quote}"</p>

              {/* Amount & Time */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                <div>
                  <p className="text-[10px] text-gray-500 mb-0.5">{t('won')}</p>
                  <p className="text-lg font-bold text-glow-red text-red-400">{winner.amount}</p>
                </div>
                <span className="text-[11px] text-gray-600">{winner.timeAgo}h atrás</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live ticker */}
        <div className="mt-10 sm:mt-14 relative overflow-hidden rounded-xl glass-card py-3">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d1117] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d1117] to-transparent z-10" />
          <motion.div
            className="flex gap-8 whitespace-nowrap px-4"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...winners, ...winners].map((w, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-gray-500">
                  <strong className="text-white">{w.name}</strong> ganhou{' '}
                  <strong className="text-red-400">{w.amount}</strong>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};