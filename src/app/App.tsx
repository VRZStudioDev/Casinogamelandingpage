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

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0A0F1F] text-white">
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
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
