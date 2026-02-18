import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CreditCard, Zap } from 'lucide-react';

export const PaymentMethods: React.FC = () => {
  const { t } = useLanguage();

  const paymentMethods = [
    { name: 'Visa', emoji: '💳', instant: true },
    { name: 'Mastercard', emoji: '💳', instant: true },
    { name: 'PayPal', emoji: '🅿️', instant: true },
    { name: 'Bitcoin', emoji: '₿', instant: true },
    { name: 'Ethereum', emoji: 'Ξ', instant: true },
    { name: 'Pix', emoji: '🇧🇷', instant: true },
    { name: 'Bank Transfer', emoji: '🏦', instant: false },
    { name: 'Apple Pay', emoji: '🍎', instant: true },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#0A0F1F] border-y border-[#FF006E]/20">
      <div className="w-full px-3 sm:px-4 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent px-4"
        >
          {t('paymentMethods')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base"
        >
          Secure & Fast Transactions
        </motion.p>

        {/* Scrolling Payment Icons */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#0A0F1F] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#0A0F1F] to-transparent z-10" />

          <motion.div
            className="flex gap-4 sm:gap-8 py-6 sm:py-8"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...paymentMethods, ...paymentMethods].map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
                className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 sm:gap-3 relative group cursor-pointer"
                style={{ filter: 'grayscale(100%)' }}
              >
                {/* Icon */}
                <div className="text-3xl sm:text-5xl">{method.emoji}</div>
                
                {/* Name */}
                <p className="text-xs sm:text-sm font-semibold text-white text-center px-2">
                  {method.name}
                </p>

                {/* Instant Badge */}
                {method.instant && (
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-0.5 sm:gap-1 shadow-lg">
                    <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    <span className="text-[10px] sm:text-xs font-bold text-white hidden sm:inline">Fast</span>
                  </div>
                )}

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: '🔒', title: 'Secure Payments', desc: 'SSL Encrypted Transactions' },
            { icon: '⚡', title: 'Instant Withdrawals', desc: 'Get your winnings fast' },
            { icon: '💯', title: 'No Hidden Fees', desc: 'Transparent pricing' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 text-center"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{feature.icon}</div>
              <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};