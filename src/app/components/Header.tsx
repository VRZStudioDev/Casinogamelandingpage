import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import logoUrl from '../assets/logos/logo-wide.png';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'gn', label: 'Guaraní', flag: '🇵🇾' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080c18]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="https://casinoamambay.online"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <img src={logoUrl} alt="Casino Amambay" className="h-8 sm:h-10 transition-transform duration-300 group-hover:scale-105" />
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            >
              <span className="text-sm">{currentLang?.flag}</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${showLanguages ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showLanguages && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full mt-2 right-0 bg-[#0d111f]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl shadow-black/40 min-w-[150px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLanguages(false); }}
                      className={`w-full px-4 py-2.5 flex items-center gap-2.5 hover:bg-white/[0.06] transition-all duration-200 text-sm ${
                        language === lang.code ? 'bg-red-600/10 text-red-400' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-xs font-medium">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <motion.a
            href="https://casinoamambay.online"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative px-5 sm:px-7 py-2 sm:py-2.5 rounded-lg font-semibold text-white text-xs sm:text-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[1px] rounded-[7px] bg-gradient-to-b from-white/[0.12] to-transparent opacity-60" />
            <span className="relative z-10 tracking-wide">{t('playNow')}</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};