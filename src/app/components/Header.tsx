import React from 'react';
import { Globe, Menu } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { motion } from 'motion/react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguages, setShowLanguages] = React.useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'gn', label: 'Guaraní', flag: '🇵🇾' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1F]/95 backdrop-blur-lg border-b border-[#FF006E]/30">
      <div className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF006E] to-[#C51162] rounded-lg flex items-center justify-center shadow-lg shadow-[#FF006E]/50">
            <span className="text-xl sm:text-2xl">🎰</span>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-[#FF006E] to-[#FF4081] bg-clip-text text-transparent">
              CASINO
            </h1>
            <p className="text-[10px] sm:text-xs text-[#FF4081]">AMAMBAY</p>
          </div>
        </motion.div>

        {/* Right Side - Language & CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/20"
            >
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4081]" />
              <span className="text-xs sm:text-sm">{currentLang?.flag}</span>
            </button>
            
            {showLanguages && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 right-0 bg-[#0A0F1F] border border-[#FF006E]/30 rounded-lg overflow-hidden shadow-xl min-w-[140px] sm:min-w-[150px]"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguages(false);
                    }}
                    className={`w-full px-3 sm:px-4 py-2 flex items-center gap-2 hover:bg-[#FF006E]/20 transition-colors text-sm ${
                      language === lang.code ? 'bg-[#FF006E]/10' : ''
                    }`}
                  >
                    <span className="text-base sm:text-lg">{lang.flag}</span>
                    <span className="text-xs sm:text-sm">{lang.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Play Now Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF006E] to-[#C51162] rounded-lg font-bold text-white shadow-lg shadow-[#FF006E]/50 overflow-hidden group text-xs sm:text-base"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <span className="relative z-10">{t('playNow')}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};