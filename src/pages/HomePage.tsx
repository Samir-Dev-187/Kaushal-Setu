import React from 'react';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { NavigationBar } from '../components/layout/NavigationBar';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { QuickServices } from '../components/home/QuickServices';
import { LabourMarketGlance } from '../components/home/LabourMarketGlance';
import { MaharashtraSkillMap } from '../components/home/MaharashtraSkillMap';
import { WhyKaushalSetu } from '../components/home/WhyKaushalSetu';
import { HowItWorks } from '../components/home/HowItWorks';
import { FourStakeholders } from '../components/home/FourStakeholders';
import { WhyDifferent } from '../components/home/WhyDifferent';
import { IceToEvCaseStudy } from '../components/home/IceToEvCaseStudy';
import { RelatedInitiatives } from '../components/home/RelatedInitiatives';
import { LatestUpdates } from '../components/home/LatestUpdates';
import { ExpectedImpact } from '../components/home/ExpectedImpact';
import { TrustTransparency } from '../components/home/TrustTransparency';
import { CallToAction } from '../components/home/CallToAction';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <GovernmentHeader />
      <BrandHeader />
      <NavigationBar />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Carousel (10+ slides with 5s horizontal slide) */}
        <HeroCarousel />

        {/* 2. Quick Services */}
        <QuickServices />

        {/* 3. Labour Market at a Glance */}
        <LabourMarketGlance />

        {/* 4. Maharashtra Skill Intelligence Map */}
        <MaharashtraSkillMap />

        {/* 5. Why Kaushal Setu */}
        <WhyKaushalSetu />

        {/* 6. How Kaushal Setu Works */}
        <HowItWorks />

        {/* 7. Four Stakeholders */}
        <FourStakeholders />

        {/* 8. Why It Is Different */}
        <WhyDifferent />

        {/* 9. ICE to EV Case Study */}
        <IceToEvCaseStudy />

        {/* 10. Related Skill Initiatives */}
        <RelatedInitiatives />

        {/* 11. Latest Updates / Bulletins */}
        <LatestUpdates />

        {/* 12. Expected Impact */}
        <ExpectedImpact />

        {/* 13. Trust & Transparency */}
        <TrustTransparency />

        {/* 14. Call to Action */}
        <CallToAction />
      </main>

      <GovernmentFooter />
    </div>
  );
};
