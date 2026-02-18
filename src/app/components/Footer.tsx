import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: 'Sobre', href: 'https://casinoamambay.online' },
    { label: 'Jogos', href: 'https://casinoamambay.online/game/casino' },
    { label: 'Promoções', href: 'https://casinoamambay.online/bonus' },
    { label: 'VIP', href: 'https://casinoamambay.online/bonus' },
  ];

  const support = [
    { label: 'Central de Ajuda', href: 'https://tawk.to/chat/60550cf6067c2605c0ba5f17/1f163l9hp' },
    { label: 'Termos de Uso', href: 'https://casinoamambay.online' },
    { label: 'Privacidade', href: 'https://casinoamambay.online' },
    { label: 'Jogo Responsável', href: 'https://casinoamambay.online' },
  ];

  const socials = [
    { icon: Facebook, href: 'https://www.facebook.com/AmambayOnlineOFC/' },
    { icon: Instagram, href: 'https://www.instagram.com/amambayonlineofc/' },
    { icon: MessageCircle, href: 'https://tawk.to/chat/60550cf6067c2605c0ba5f17/1f163l9hp' },
  ];

  return (
    <footer className="bg-[#060a14] border-t border-white/[0.04] relative">
      <div className="w-full px-4 sm:px-6 py-10 sm:py-14 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-sm font-extrabold text-white">A</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">AMAMBAY</h3>
                <p className="text-[10px] text-gray-600 tracking-widest">CASINO ONLINE</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              O melhor casino online com jogos de qualidade, jackpots massivos e bônus imbatíveis.
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:border-white/[0.1] transition-colors"
                >
                  <s.icon className="w-3.5 h-3.5 text-gray-500" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-xs tracking-wide uppercase mb-3">Links</h4>
            <ul className="space-y-1.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white text-xs tracking-wide uppercase mb-3">Suporte</h4>
            <ul className="space-y-1.5">
              {support.map((link, i) => (
                <li key={i}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-xs tracking-wide uppercase mb-3">Newsletter</h4>
            <p className="text-xs text-gray-600 mb-3">Receba bônus e promoções exclusivas!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-red-500/30 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] sm:text-xs text-red-500/60 font-medium">
              {t('responsibleGaming')}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-700">
              {t('copyright')}
            </p>
            <p className="text-[10px] text-gray-800">
              Licença: Conajzar, Paraguay · Apenas maiores de 18 anos
            </p>
          </div>
        </div>
      </div>
     

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
    </footer>
  );
};