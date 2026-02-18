import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Zap, Banknote } from 'lucide-react';

export const PaymentMethods: React.FC = () => {
  const { t } = useLanguage();

  const methods = [
    { name: 'PIX', label: 'Instantâneo' },
    { name: 'Visa', label: 'Crédito' },
    { name: 'Mastercard', label: 'Crédito' },
    { name: 'Bitcoin', label: 'Crypto' },
    { name: 'USDT', label: 'Crypto' },
    { name: 'Boleto', label: 'Bancário' },
  ];

  const features = [
    { icon: Shield, title: 'Pagamentos Seguros', desc: 'Criptografia SSL 256-bit' },
    { icon: Zap, title: 'Saques Instantâneos', desc: 'Receba seus ganhos na hora' },
    { icon: Banknote, title: 'Sem Taxas', desc: 'Depósitos e saques gratuitos' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080c18] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="w-full px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            {t('paymentMethods')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">Transações seguras e rápidas</p>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-14">
          {methods.map((method, i) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2 hover:border-white/[0.1] transition-colors duration-300 group"
            >
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors">{method.name}</span>
              <span className="text-[10px] text-gray-600">{method.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-xl p-5 sm:p-6 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};