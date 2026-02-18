import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Headphones, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TrustBadges: React.FC = () => {
  const { t } = useLanguage();

  const badges = [
    { icon: Lock, label: t('sslSecure'), color: '#FF006E' },
    { icon: Shield, label: t('licensed'), color: '#FF4081' },
    { icon: Award, label: t('fairPlay'), color: '#F50057' },
    { icon: Headphones, label: t('support247'), color: '#C51162' },
  ];

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-[#0A0F1F] via-[#1a1a2e] to-[#0A0F1F] border-y border-[#FF006E]/20">
      <div className="w-full px-3 sm:px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer min-w-[80px] sm:min-w-[100px]"
            >
              <div
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg group-hover:shadow-xl transition-all"
                style={{
                  boxShadow: `0 0 20px ${badge.color}40`,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 10px ${badge.color}40`,
                      `0 0 20px ${badge.color}60`,
                      `0 0 10px ${badge.color}40`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <badge.icon className="w-5 h-5 sm:w-7 sm:h-7 relative z-10" style={{ color: badge.color }} />
              </div>
              <p className="text-xs sm:text-sm text-center text-gray-300 max-w-[100px] sm:max-w-[120px]">
                {badge.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};