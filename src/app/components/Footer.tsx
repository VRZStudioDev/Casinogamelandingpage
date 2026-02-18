import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Games', href: '#' },
    { label: 'Promotions', href: '#' },
    { label: 'VIP Program', href: '#' },
  ];

  const support = [
    { label: 'Help Center', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Responsible Gaming', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: '#1877F2' },
    { icon: Twitter, href: '#', color: '#1DA1F2' },
    { icon: Instagram, href: '#', color: '#E4405F' },
    { icon: Youtube, href: '#', color: '#FF0000' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0A0F1F] to-black border-t border-[#FF006E]/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl sm:text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            🎰
          </div>
        ))}
      </div>

      <div className="w-full px-3 sm:px-4 py-8 sm:py-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF006E] to-[#C51162] rounded-lg flex items-center justify-center shadow-lg shadow-[#FF006E]/50">
                <span className="text-xl sm:text-2xl">🎰</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent">
                  CASINO
                </h3>
                <p className="text-[10px] sm:text-xs text-[#FF4081]">AMAMBAY</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Experience the ultimate online casino gaming with top-rated games, massive jackpots, and unbeatable bonuses.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all border border-white/20"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-[#FF006E] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-[#FF006E] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Stay Updated</h4>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Subscribe to get exclusive bonuses and promotions!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF006E]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#FF006E] to-[#C51162] rounded-lg"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 opacity-50">
            {['💳', '🅿️', '₿', 'Ξ', '🇧🇷', '🏦'].map((emoji, index) => (
              <div
                key={index}
                className="w-10 h-7 sm:w-12 sm:h-8 bg-white/5 rounded flex items-center justify-center text-lg sm:text-xl"
              >
                {emoji}
              </div>
            ))}
          </div>

          {/* Copyright & Responsible Gaming */}
          <div className="text-center space-y-1.5 sm:space-y-2">
            <p className="text-xs sm:text-sm text-red-400 font-semibold">
              {t('responsibleGaming')}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {t('copyright')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-600">
              <span>License: MGA/CRP/123/2024</span>
              <span className="hidden sm:inline">•</span>
              <span>Gambling can be addictive. Play responsibly.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF006E] to-transparent opacity-50" />
    </footer>
  );
};