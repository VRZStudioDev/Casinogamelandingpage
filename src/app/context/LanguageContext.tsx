import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'pt' | 'es' | 'fr' | 'gn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    playNow: 'PLAY NOW',
    
    // Hero
    heroHeadline: 'WIN BIG AT CASINO AMAMBAY',
    heroSubheadline: 'Experience the thrill of winning with our premium casino games',
    currentJackpot: 'Current Jackpot',
    
    // Trust Badges
    sslSecure: 'SSL Secure',
    licensed: 'Licensed & Regulated',
    fairPlay: 'Fair Play Certified',
    support247: '24/7 Support',
    
    // Featured Games
    featuredGames: 'FEATURED GAMES',
    playingNow: 'playing now',
    play: 'PLAY',
    
    // Welcome Bonus
    welcomeBonus: '100% WELCOME BONUS',
    upTo: 'UP TO $1,000',
    freeSpins: '+ 200 FREE SPINS',
    firstDeposit: 'First Deposit: 100% Match',
    freeSpinsOn: 'Free Spins: 200 on selected slots',
    offerEnds: 'Offer Ends In:',
    claimBonus: 'CLAIM BONUS NOW',
    limitedOffer: 'Limited spots available',
    playersJoined: 'players joined today',
    
    // Testimonials
    winners: 'RECENT WINNERS',
    won: 'Won',
    ago: 'ago',
    verified: 'Verified Winner',
    
    // Payment Methods
    paymentMethods: 'PAYMENT METHODS',
    instantWithdrawal: 'Instant Withdrawal',
    
    // Gameplay Preview
    gameplayPreview: 'EXPERIENCE THE THRILL',
    balance: 'Balance',
    bet: 'Bet',
    spin: 'SPIN',
    bigWin: 'BIG WIN!',
    
    // Final CTA
    readyToWin: 'READY TO WIN BIG?',
    claimBonusNow: 'CLAIM YOUR BONUS',
    joinPlayers: 'Join 500,000+ happy players',
    winningEvery: 'Players winning every 2 minutes',
    
    // Footer
    responsibleGaming: 'Play Responsibly | 18+',
    copyright: '2026 Casino Amambay. All rights reserved.',
    
    // Misc
    hours: 'hours',
    minutes: 'mins',
    hoursAgo: 'hours ago',
    minutesAgo: 'minutes ago',
  },
  pt: {
    // Header
    playNow: 'JOGUE AGORA',
    
    // Hero
    heroHeadline: 'GANHE GRANDE NO CASINO AMAMBAY',
    heroSubheadline: 'Experimente a emoção de ganhar com nossos jogos de cassino premium',
    currentJackpot: 'Jackpot Atual',
    
    // Trust Badges
    sslSecure: 'SSL Seguro',
    licensed: 'Licenciado e Regulamentado',
    fairPlay: 'Jogo Justo Certificado',
    support247: 'Suporte 24/7',
    
    // Featured Games
    featuredGames: 'JOGOS EM DESTAQUE',
    playingNow: 'jogando agora',
    play: 'JOGAR',
    
    // Welcome Bonus
    welcomeBonus: '100% BÔNUS DE BOAS-VINDAS',
    upTo: 'ATÉ R$ 5.000',
    freeSpins: '+ 200 RODADAS GRÁTIS',
    firstDeposit: 'Primeiro Depósito: 100% de Bônus',
    freeSpinsOn: 'Rodadas Grátis: 200 em slots selecionados',
    offerEnds: 'Oferta Termina Em:',
    claimBonus: 'REIVINDICAR BÔNUS',
    limitedOffer: 'Vagas limitadas disponíveis',
    playersJoined: 'jogadores entraram hoje',
    
    // Testimonials
    winners: 'VENCEDORES RECENTES',
    won: 'Ganhou',
    ago: 'atrás',
    verified: 'Vencedor Verificado',
    
    // Payment Methods
    paymentMethods: 'MÉTODOS DE PAGAMENTO',
    instantWithdrawal: 'Saque Instantâneo',
    
    // Gameplay Preview
    gameplayPreview: 'EXPERIMENTE A EMOÇÃO',
    balance: 'Saldo',
    bet: 'Aposta',
    spin: 'GIRAR',
    bigWin: 'GRANDE VITÓRIA!',
    
    // Final CTA
    readyToWin: 'PRONTO PARA GANHAR GRANDE?',
    claimBonusNow: 'REIVINDIQUE SEU BÔNUS',
    joinPlayers: 'Junte-se a mais de 500.000 jogadores felizes',
    winningEvery: 'Jogadores ganhando a cada 2 minutos',
    
    // Footer
    responsibleGaming: 'Jogue com Responsabilidade | +18',
    copyright: '2026 Casino Amambay. Todos os direitos reservados.',
    
    // Misc
    hours: 'horas',
    minutes: 'mins',
    hoursAgo: 'horas atrás',
    minutesAgo: 'minutos atrás',
  },
  es: {
    // Header
    playNow: 'JUGAR AHORA',
    
    // Hero
    heroHeadline: 'GANA EN GRANDE EN CASINO AMAMBAY',
    heroSubheadline: 'Experimenta la emoción de ganar con nuestros juegos de casino premium',
    currentJackpot: 'Bote Actual',
    
    // Trust Badges
    sslSecure: 'SSL Seguro',
    licensed: 'Licenciado y Regulado',
    fairPlay: 'Juego Limpio Certificado',
    support247: 'Soporte 24/7',
    
    // Featured Games
    featuredGames: 'JUEGOS DESTACADOS',
    playingNow: 'jugando ahora',
    play: 'JUGAR',
    
    // Welcome Bonus
    welcomeBonus: '100% BONO DE BIENVENIDA',
    upTo: 'HASTA $1,000',
    freeSpins: '+ 200 GIROS GRATIS',
    firstDeposit: 'Primer Depósito: 100% de Bonificación',
    freeSpinsOn: 'Giros Gratis: 200 en slots seleccionados',
    offerEnds: 'La Oferta Termina En:',
    claimBonus: 'RECLAMAR BONO',
    limitedOffer: 'Lugares limitados disponibles',
    playersJoined: 'jugadores se unieron hoy',
    
    // Testimonials
    winners: 'GANADORES RECIENTES',
    won: 'Ganó',
    ago: 'hace',
    verified: 'Ganador Verificado',
    
    // Payment Methods
    paymentMethods: 'MÉTODOS DE PAGO',
    instantWithdrawal: 'Retiro Instantáneo',
    
    // Gameplay Preview
    gameplayPreview: 'EXPERIMENTA LA EMOCIÓN',
    balance: 'Balance',
    bet: 'Apuesta',
    spin: 'GIRAR',
    bigWin: '¡GRAN VICTORIA!',
    
    // Final CTA
    readyToWin: '¿LISTO PARA GANAR EN GRANDE?',
    claimBonusNow: 'RECLAMA TU BONO',
    joinPlayers: 'Únete a más de 500,000 jugadores felices',
    winningEvery: 'Jugadores ganando cada 2 minutos',
    
    // Footer
    responsibleGaming: 'Juega Responsablemente | +18',
    copyright: '2026 Casino Amambay. Todos los derechos reservados.',
    
    // Misc
    hours: 'horas',
    minutes: 'mins',
    hoursAgo: 'hace horas',
    minutesAgo: 'hace minutos',
  },
  fr: {
    // Header
    playNow: 'JOUER MAINTENANT',
    
    // Hero
    heroHeadline: 'GAGNEZ GROS AU CASINO AMAMBAY',
    heroSubheadline: 'Vivez le frisson de gagner avec nos jeux de casino premium',
    currentJackpot: 'Jackpot Actuel',
    
    // Trust Badges
    sslSecure: 'SSL Sécurisé',
    licensed: 'Licencié et Réglementé',
    fairPlay: 'Jeu Équitable Certifié',
    support247: 'Support 24/7',
    
    // Featured Games
    featuredGames: 'JEUX EN VEDETTE',
    playingNow: 'jouent maintenant',
    play: 'JOUER',
    
    // Welcome Bonus
    welcomeBonus: '100% BONUS DE BIENVENUE',
    upTo: 'JUSQU\'À 1 000€',
    freeSpins: '+ 200 TOURS GRATUITS',
    firstDeposit: 'Premier Dépôt: 100% de Bonus',
    freeSpinsOn: 'Tours Gratuits: 200 sur les machines à sous sélectionnées',
    offerEnds: 'L\'offre Se Termine Dans:',
    claimBonus: 'RÉCLAMER LE BONUS',
    limitedOffer: 'Places limitées disponibles',
    playersJoined: 'joueurs ont rejoint aujourd\'hui',
    
    // Testimonials
    winners: 'GAGNANTS RÉCENTS',
    won: 'A gagné',
    ago: 'il y a',
    verified: 'Gagnant Vérifié',
    
    // Payment Methods
    paymentMethods: 'MÉTHODES DE PAIEMENT',
    instantWithdrawal: 'Retrait Instantané',
    
    // Gameplay Preview
    gameplayPreview: 'VIVEZ LE FRISSON',
    balance: 'Solde',
    bet: 'Mise',
    spin: 'TOURNER',
    bigWin: 'GROS GAIN!',
    
    // Final CTA
    readyToWin: 'PRÊT À GAGNER GROS?',
    claimBonusNow: 'RÉCLAMEZ VOTRE BONUS',
    joinPlayers: 'Rejoignez plus de 500 000 joueurs heureux',
    winningEvery: 'Des joueurs gagnent toutes les 2 minutes',
    
    // Footer
    responsibleGaming: 'Jouez de Manière Responsable | +18',
    copyright: '2026 Casino Amambay. Tous droits réservés.',
    
    // Misc
    hours: 'heures',
    minutes: 'mins',
    hoursAgo: 'il y a heures',
    minutesAgo: 'il y a minutes',
  },
  gn: {
    // Header (Guarani)
    playNow: 'ÑE\'Ẽ KO\'ÃNGA',
    
    // Hero
    heroHeadline: 'EGANAta TUICHA CASINO AMAMBAY-PE',
    heroSubheadline: 'Eñandu vy\'a egana haguã ñande casino juego premium ndive',
    currentJackpot: 'Jackpot Ko\'ãgagua',
    
    // Trust Badges
    sslSecure: 'SSL Tekorosã',
    licensed: 'Licencia ha Regulado',
    fairPlay: 'Ñembosako\'i Hekopete Certificado',
    support247: 'Pytyvõ 24/7',
    
    // Featured Games
    featuredGames: 'ÑEMBOSAKO\'I IPORÃVA',
    playingNow: 'oñembosaráivo ko\'ãnga',
    play: 'ÑE\'Ẽ',
    
    // Welcome Bonus
    welcomeBonus: '100% BONO ÑEMBOJEGUAPY',
    upTo: 'OJEHÚPEVE $1,000',
    freeSpins: '+ 200 ÑEMBOJEVY REI',
    firstDeposit: 'Peteĩha Depósito: 100% Bono',
    freeSpinsOn: 'Ñembojevy Rei: 200 slots ojeporavóvape',
    offerEnds: 'Oferta Opaha:',
    claimBonus: 'EJAPOta BONO',
    limitedOffer: 'Tenda michĩmi oĩva',
    playersJoined: 'oñembosará oikéva ko árape',
    
    // Testimonials
    winners: 'OGANÁva RAMOVÉPE',
    won: 'Ogana',
    ago: 'yma',
    verified: 'Oganáva Verificado',
    
    // Payment Methods
    paymentMethods: 'ÑEHEPYME\'Ẽ RAPE',
    instantWithdrawal: 'Ñeguenohẽ Pya\'e',
    
    // Gameplay Preview
    gameplayPreview: 'EÑANDUta VY\'A',
    balance: 'Saldo',
    bet: 'Apuesta',
    spin: 'ÑEMBOJEVY',
    bigWin: 'TUICHA GANANCIA!',
    
    // Final CTA
    readyToWin: 'REIMEpa EGANA HAGUÃ TUICHA?',
    claimBonusNow: 'EJAPOta NE BONO',
    joinPlayers: 'Eikemi 500,000+ oñembosaráva vy\'áva ndive',
    winningEvery: 'Oñembosará ogana haguã 2 aravópe',
    
    // Footer
    responsibleGaming: 'Eñembosará Responsablemente | 18+',
    copyright: '2026 Casino Amambay. Opavave derecho oñongatu.',
    
    // Misc
    hours: 'aravo',
    minutes: 'mins',
    hoursAgo: 'aravo yma',
    minutesAgo: 'minuto yma',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
