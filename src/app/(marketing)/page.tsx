import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedToolsSection } from '@/components/sections/featured-tools-section';
import { PopularCategoriesSection } from '@/components/sections/popular-categories-section';
import { RecentlyAddedSection } from '@/components/sections/recently-added-section';
import { HomeComparisonsSection } from '@/components/sections/home-comparisons-section';
import { FooterCtaSection } from '@/components/sections/footer-cta-section';
import { createDefaultMetadata } from '@/lib/seo';

export const metadata: Metadata = createDefaultMetadata();

export default function HomePage() {
  return (
    <div className="flex-1">
      <HeroSection
        badge="150+ hand-picked developer tools, updated regularly"
        title={
          <>
            Find the right{' '}
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
              developer tool
            </span>{' '}
            faster
          </>
        }
        subtitle="Free generators, converters, formatters, and testing tools — plus a curated directory of the best software for coding, APIs, JSON, CSS, and everyday dev tasks."
        suggestions={['Postman', 'Prisma', 'JSON Formatter', 'Playwright', 'Base64 Encoder']}
      />
      <FeaturedToolsSection />
      <PopularCategoriesSection />
      <RecentlyAddedSection />
      <HomeComparisonsSection />
      <FooterCtaSection />
    </div>
  );
}
