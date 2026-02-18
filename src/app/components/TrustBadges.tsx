import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Headphones, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TrustBadges: React.FC = () => {
  const { t } = useLanguage();

  const badges = [
    { icon: Lock, label: t('sslSecure'), desc: 'Criptografia 256-bit' },
    { icon: Shield, label: t('licensed'), desc: 'Conajzar, Paraguay' },
    { icon: Award, label: t('fairPlay'), desc: 'RNG Certificado' },
    { icon: Headphones, label: t('support247'), desc: 'WhatsApp & Chat' },
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#080c18] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/[0.03] to-transparent" />

      <div className="w-full px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card glass-card-hover rounded-xl p-4 sm:p-5 text-center transition-all duration-300 cursor-default group"
            >
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 flex items-center justify-center mb-3 group-hover:from-red-600/30 group-hover:to-red-800/20 transition-all duration-300">
                <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              </div>
              <p className="text-sm font-semibold text-white/90 mb-0.5">{badge.label}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};