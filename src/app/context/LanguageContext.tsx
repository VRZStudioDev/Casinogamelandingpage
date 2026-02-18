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
    
    // Location
    locationBadge: 'Our Location',
    locationTitle: 'VISIT US IN PERSON',
    locationSubtitle: 'Experience the luxury and excitement at Amambay Hotel Casino in Pedro Juan Caballero, Paraguay.',
    locationMapTitle: 'Amambay Hotel Casino Location',
    locationAddress: 'Address',
    locationHours: 'Opening Hours',
    locationOpen247: 'Open 24 hours a day, 7 days a week',
    locationOpenNow: 'Open Now',
    locationContact: 'Contact',
    locationContactDesc: 'Chat with us anytime via our 24/7 live support',
    locationDirections: 'Get Directions',

    // Welcome Popup
    popupStep1Title: 'Welcome Bonus',
    popupStep1Desc: 'Get a 100% match on your first deposit up to $1,000 plus 200 free spins on top games!',
    popupStep2Title: 'Massive Jackpots',
    popupStep2Desc: 'Play for life-changing prizes with our progressive jackpots updated in real time.',
    popupStep3Title: 'Instant Withdrawals',
    popupStep3Desc: 'Win and cash out instantly. Fast, secure payments with no hidden fees.',
    popupBack: 'Back',
    popupNext: 'Next',
    popupClaim: 'Claim Bonus',
    popupSkip: 'Maybe later',
    popupLater: 'Later',
    popupPlayers: 'players',
    popupDesktopTitle: 'YOUR EXCLUSIVE WELCOME BONUS',
    popupDesktopDesc: 'Join thousands of winners at Casino Amambay. Claim your 100% bonus up to $1,000 + 200 free spins now!',
    popupBenefit1: '100% Bonus',
    popupBenefit2: '200 Free Spins',
    popupBenefit3: 'Instant Payout',
    popupClaimedTitle: 'Bonus Claimed!',
    popupClaimedDesc: 'You can continue browsing calmly around here. Your bonus is ready and waiting for you!',
    popupRedirecting: 'Redirecting you...',

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
    
    // Location
    locationBadge: 'Nossa Localização',
    locationTitle: 'VISITE-NOS PESSOALMENTE',
    locationSubtitle: 'Viva o luxo e a emoção no Amambay Hotel Casino em Pedro Juan Caballero, Paraguai.',
    locationMapTitle: 'Localização do Amambay Hotel Casino',
    locationAddress: 'Endereço',
    locationHours: 'Horário de Funcionamento',
    locationOpen247: 'Aberto 24 horas por dia, 7 dias por semana',
    locationOpenNow: 'Aberto Agora',
    locationContact: 'Contato',
    locationContactDesc: 'Fale conosco a qualquer momento pelo nosso suporte 24/7',
    locationDirections: 'Como Chegar',

    // Welcome Popup
    popupStep1Title: 'Bônus de Boas-Vindas',
    popupStep1Desc: 'Ganhe 100% de bônus no primeiro depósito até R$ 5.000 + 200 rodadas grátis nos melhores jogos!',
    popupStep2Title: 'Jackpots Massivos',
    popupStep2Desc: 'Jogue por prêmios que mudam vidas com nossos jackpots progressivos atualizados em tempo real.',
    popupStep3Title: 'Saques Instantâneos',
    popupStep3Desc: 'Ganhe e saque na hora. Pagamentos rápidos e seguros sem taxas ocultas.',
    popupBack: 'Voltar',
    popupNext: 'Próximo',
    popupClaim: 'Resgatar Bônus',
    popupSkip: 'Talvez depois',
    popupLater: 'Depois',
    popupPlayers: 'jogadores',
    popupDesktopTitle: 'SEU BÔNUS EXCLUSIVO DE BOAS-VINDAS',
    popupDesktopDesc: 'Junte-se a milhares de vencedores no Casino Amambay. Resgate seu bônus de 100% até R$ 5.000 + 200 rodadas grátis!',
    popupBenefit1: '100% Bônus',
    popupBenefit2: '200 Rodadas',
    popupBenefit3: 'Saque Rápido',
    popupClaimedTitle: 'Bônus Adquirido!',
    popupClaimedDesc: 'Você pode continuar navegando tranquilamente por aqui. Seu bônus está pronto e esperando por você!',
    popupRedirecting: 'Redirecionando...',

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
    
    // Location
    locationBadge: 'Nuestra Ubicación',
    locationTitle: 'VISÍTANOS EN PERSONA',
    locationSubtitle: 'Vive el lujo y la emoción en Amambay Hotel Casino en Pedro Juan Caballero, Paraguay.',
    locationMapTitle: 'Ubicación del Amambay Hotel Casino',
    locationAddress: 'Dirección',
    locationHours: 'Horario de Atención',
    locationOpen247: 'Abierto las 24 horas, los 7 días de la semana',
    locationOpenNow: 'Abierto Ahora',
    locationContact: 'Contacto',
    locationContactDesc: 'Chatea con nosotros en cualquier momento a través de nuestro soporte 24/7',
    locationDirections: 'Cómo Llegar',

    // Welcome Popup
    popupStep1Title: 'Bono de Bienvenida',
    popupStep1Desc: '¡Obtén un 100% en tu primer depósito hasta $1,000 más 200 giros gratis en los mejores juegos!',
    popupStep2Title: 'Jackpots Masivos',
    popupStep2Desc: 'Juega por premios que cambian vidas con nuestros jackpots progresivos actualizados en tiempo real.',
    popupStep3Title: 'Retiros Instantáneos',
    popupStep3Desc: 'Gana y retira al instante. Pagos rápidos y seguros sin comisiones ocultas.',
    popupBack: 'Atrás',
    popupNext: 'Siguiente',
    popupClaim: 'Reclamar Bono',
    popupSkip: 'Quizás luego',
    popupLater: 'Luego',
    popupPlayers: 'jugadores',
    popupDesktopTitle: 'TU BONO EXCLUSIVO DE BIENVENIDA',
    popupDesktopDesc: 'Únete a miles de ganadores en Casino Amambay. ¡Reclama tu bono del 100% hasta $1,000 + 200 giros gratis!',
    popupBenefit1: '100% Bono',
    popupBenefit2: '200 Giros',
    popupBenefit3: 'Pago Rápido',
    popupClaimedTitle: '¡Bono Adquirido!',
    popupClaimedDesc: 'Puedes seguir navegando tranquilamente por aquí. ¡Tu bono está listo y esperando por ti!',
    popupRedirecting: 'Redireccionando...',

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
    
    // Location
    locationBadge: 'Notre Emplacement',
    locationTitle: 'VENEZ NOUS RENDRE VISITE',
    locationSubtitle: 'Vivez le luxe et l\'excitation au Amambay Hotel Casino à Pedro Juan Caballero, Paraguay.',
    locationMapTitle: 'Emplacement du Amambay Hotel Casino',
    locationAddress: 'Adresse',
    locationHours: 'Heures d\'Ouverture',
    locationOpen247: 'Ouvert 24 heures sur 24, 7 jours sur 7',
    locationOpenNow: 'Ouvert Maintenant',
    locationContact: 'Contact',
    locationContactDesc: 'Discutez avec nous à tout moment via notre support 24/7',
    locationDirections: 'Obtenir l\'Itinéraire',

    // Welcome Popup
    popupStep1Title: 'Bonus de Bienvenue',
    popupStep1Desc: 'Obtenez 100% sur votre premier dépôt jusqu\'à 1 000€ + 200 tours gratuits sur les meilleurs jeux!',
    popupStep2Title: 'Jackpots Massifs',
    popupStep2Desc: 'Jouez pour des prix qui changent la vie avec nos jackpots progressifs mis à jour en temps réel.',
    popupStep3Title: 'Retraits Instantanés',
    popupStep3Desc: 'Gagnez et retirez instantanément. Paiements rapides et sécurisés sans frais cachés.',
    popupBack: 'Retour',
    popupNext: 'Suivant',
    popupClaim: 'Réclamer le Bonus',
    popupSkip: 'Peut-être plus tard',
    popupLater: 'Plus tard',
    popupPlayers: 'joueurs',
    popupDesktopTitle: 'VOTRE BONUS EXCLUSIF DE BIENVENUE',
    popupDesktopDesc: 'Rejoignez des milliers de gagnants au Casino Amambay. Réclamez votre bonus de 100% jusqu\'à 1 000€ + 200 tours gratuits!',
    popupBenefit1: '100% Bonus',
    popupBenefit2: '200 Tours',
    popupBenefit3: 'Paiement Rapide',
    popupClaimedTitle: 'Bonus Acquis!',
    popupClaimedDesc: 'Vous pouvez continuer à naviguer tranquillement ici. Votre bonus est prêt et vous attend!',
    popupRedirecting: 'Redirection en cours...',

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
    
    // Location
    locationBadge: 'Ñande Rendaite',
    locationTitle: 'EJÚNA ORE RENDÁPE',
    locationSubtitle: 'Eñandu lujo ha vy\'a Amambay Hotel Casino-pe Pedro Juan Caballero, Paraguay-pe.',
    locationMapTitle: 'Amambay Hotel Casino Rendaite',
    locationAddress: 'Ñemohenda',
    locationHours: 'Aravo Ojepe\'áva',
    locationOpen247: 'Ijurujáva 24 aravo, 7 ára',
    locationOpenNow: 'Ijuruja Ko\'ãga',
    locationContact: 'Ñe\'ẽ Oreve',
    locationContactDesc: 'Eñe\'ẽ ore ndive araka\'eve ñande pytyvõ 24/7 rupive',
    locationDirections: 'Mba\'éichapa Eguahẽta',

    // Welcome Popup
    popupStep1Title: 'Bono Ñembojeguapy',
    popupStep1Desc: 'Ejapóta 100% ne peteĩha depósito $1,000 peve + 200 ñembojevy rei juego iporãvéva-pe!',
    popupStep2Title: 'Jackpot Tuichaitéva',
    popupStep2Desc: 'Eñembosará premio tuichaitéva rehe ñande jackpot progressivo actualizado tiempo real-pe.',
    popupStep3Title: 'Ñeguenohẽ Pya\'e',
    popupStep3Desc: 'Eganáta ha eguenohẽ pya\'e. Ñehepyme\'ẽ pya\'e ha tekorosã tasa kañy\'ỹre.',
    popupBack: 'Ñejevy',
    popupNext: 'Upeigui',
    popupClaim: 'Ejapóta Bono',
    popupSkip: 'Upéi noẽ',
    popupLater: 'Upéi',
    popupPlayers: 'oñembosaráva',
    popupDesktopTitle: 'NE BONO EXCLUSIVO ÑEMBOJEGUAPY',
    popupDesktopDesc: 'Eikemi ogana heta va\'ekue Casino Amambay-pe. Ejapóta ne bono 100% $1,000 peve + 200 ñembojevy rei!',
    popupBenefit1: '100% Bono',
    popupBenefit2: '200 Ñembojevy',
    popupBenefit3: 'Ñehepyme\'ẽ Pya\'e',
    popupClaimedTitle: 'Bono Ojejapóma!',
    popupClaimedDesc: 'Ikatura eike eikuaave pe\'a rupive. Ne bono oime oimema nderépe!',
    popupRedirecting: 'Oheja otáva...',

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
