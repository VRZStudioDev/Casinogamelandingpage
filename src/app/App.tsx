import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { FeaturedGames } from './components/FeaturedGames';
import { WelcomeBonus } from './components/WelcomeBonus';
import { TestimonialsGallery } from './components/TestimonialsGallery';
import { PaymentMethods } from './components/PaymentMethods';
import { GameplayPreview } from './components/GameplayPreview';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Location } from './components/Location';
import { WelcomePopup } from './components/WelcomePopup';

export default function App() {
  return (
    <LanguageProvider>
        <div className="min-h-screen bg-[#080c18] text-white">
        <WelcomePopup />
        <Header />
        <main>
          <HeroSection />
          <TrustBadges />
          <FeaturedGames />
          <WelcomeBonus />
          <TestimonialsGallery />
          <PaymentMethods />
          <GameplayPreview />
          <FinalCTA />
          <Location />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
