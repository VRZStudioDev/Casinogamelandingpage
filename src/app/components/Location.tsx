import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-20 bg-[#080c18]">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-medium text-red-400 tracking-wide uppercase">
              {t('locationBadge')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {t('locationTitle')}
          </h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            {t('locationSubtitle')}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14092.089983945843!2d-55.736093955543346!3d-22.52737915801533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94626f234e2af567%3A0x722786cd08a67a48!2sAmambay%20Hotel%20Casino!5e0!3m2!1spt-BR!2sbr!4v1771431789386!5m2!1spt-BR!2sbr"
              className="w-full h-[280px] sm:h-[340px] lg:h-full lg:min-h-[360px]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              title={t('locationMapTitle')}
            />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Address Card */}
            <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 hover:border-white/[0.1] transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{t('locationAddress')}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Amambay Hotel Casino<br />
                    Pedro Juan Caballero, Amambay<br />
                    Paraguay
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 hover:border-white/[0.1] transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{t('locationHours')}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t('locationOpen247')}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t('locationOpenNow')}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 hover:border-white/[0.1] transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{t('locationContact')}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t('locationContactDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <motion.a
              href="https://www.google.com/maps/place/Amambay+Hotel+Casino/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-red-900/20"
            >
              <ExternalLink className="w-4 h-4" />
              {t('locationDirections')}
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
    </section>
  );
};