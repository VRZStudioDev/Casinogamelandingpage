import React, { lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';

// Lazy-load below-the-fold components – they are code-split into separate chunks
// and only fetched/parsed once the browser is idle or the user scrolls near them.
const TrustBadges = lazy(() => import('./components/TrustBadges').then(m => ({ default: m.TrustBadges })));
const FeaturedGames = lazy(() => import('./components/FeaturedGames').then(m => ({ default: m.FeaturedGames })));
const WelcomeBonus = lazy(() => import('./components/WelcomeBonus').then(m => ({ default: m.WelcomeBonus })));
const TestimonialsGallery = lazy(() => import('./components/TestimonialsGallery').then(m => ({ default: m.TestimonialsGallery })));
const PaymentMethods = lazy(() => import('./components/PaymentMethods').then(m => ({ default: m.PaymentMethods })));
const GameplayPreview = lazy(() => import('./components/GameplayPreview').then(m => ({ default: m.GameplayPreview })));
const FinalCTA = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Location = lazy(() => import('./components/Location').then(m => ({ default: m.Location })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const WelcomePopup = lazy(() => import('./components/WelcomePopup').then(m => ({ default: m.WelcomePopup })));

// Minimal placeholder shown while lazy chunks load
const SectionFallback = () => (
  <div className="min-h-[200px]" aria-hidden="true" />
);

export default function App() {
  return (
    <LanguageProvider>
        <div className="min-h-screen bg-[#0a0814] text-white">
        <Suspense fallback={null}>
          <WelcomePopup />
        </Suspense>
        <Header />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionFallback />}>
            <TrustBadges />
            <FeaturedGames />
            <WelcomeBonus />
            <TestimonialsGallery />
            <PaymentMethods />
            <GameplayPreview />
            <FinalCTA />
            <Location />
          </Suspense>
        </main>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </LanguageProvider>
  );
}
