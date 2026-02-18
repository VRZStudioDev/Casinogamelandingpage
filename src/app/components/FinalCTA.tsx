import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Shield, Zap, Award } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-[#080c18] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/[0.06] rounded-full blur-[120px]" />

      <div className="w-full px-4 sm:px-6 max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-white">{t('readyToWin')?.split('?')[0]}</span>
            <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">?</span>
          </h2>

          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-10">
            Junte-se a milhares de jogadores que já estão ganhando. Seu bônus de boas-vindas está esperando.
          </p>

          {/* CTA */}
          <motion.a
            href="https://casinoamambay.online/bonus"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-bold text-white text-lg sm:text-xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 gradient-animate" />
            <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-b from-white/[0.12] to-transparent opacity-60" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative z-10">{t('claimBonusNow')}</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.span>
          </motion.a>

          {/* Urgency */}
          <p className="mt-5 text-xs sm:text-sm text-gray-600">
            <span className="text-red-400 font-medium">Vagas limitadas</span> ·{' '}
            <motion.span
              className="text-red-500 font-semibold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              127 jogadores entraram hoje
            </motion.span>
          </p>

          {/* Trust row */}
          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-5 sm:gap-8 text-xs text-gray-600">
            {[
              { icon: Shield, label: 'SSL Criptografado' },
              { icon: Award, label: 'Licenciado e Regulado' },
              { icon: Zap, label: 'Saques Instantâneos' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <item.icon className="w-3.5 h-3.5 text-green-500/70" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};