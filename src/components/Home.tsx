/* RIYAN HEALTH LANDING 5/src/components/Home.tsx */
import { Hero } from './Hero';
import { StickyVideo } from './StickyVideo';
import { ContentSection } from './ContentSection';
import { LiveStats } from './LiveStats';
import { PartnerLogos } from './PartnerLogos';
import { WaitlistCTA } from './WaitlistCTA';

export function Home() {
  return (
    <>
      <Hero />

      <ContentSection
        heading="FROM ANXIETY TO CONTROL"
        subheading="OUR ECOSYSTEM"
        paragraph="A complete platform: connecting you to your family and care team, where healthcare is proactive, data is unified, treatment is integrated, and you are empowered with control."
        darkBg={false}
      />

      <StickyVideo />

      <WaitlistCTA />

      <ContentSection
        heading="OUR MISSION"
        paragraph="We are a Ghanaian-led global health company on a mission to make proactive, data-driven care accessible to all. We believe managing your health is about securing your legacy and being present for the ones you love."
        darkBg={true}
        preHeadingContent={<LiveStats />}
      />

      {/* Our Partners Section */}
      <section className="relative px-7 py-16 md:py-24" style={{ backgroundColor: 'var(--riyan-bg-dark)' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="mb-8 text-center uppercase tracking-wide"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 700,
              color: 'var(--riyan-primary-accent)',
              letterSpacing: '0.15em',
            }}
          >
            OUR PARTNERS
          </h2>
          <PartnerLogos />
        </div>
      </section>

      <ContentSection
        heading="BUILT FOR GHANA, FOR THE WORLD"
        subheading="ENGINEERED FOR IMPACT"
        paragraph="Starting in Ghana, we're creating a blueprint for proactive healthcare that can scale globally. Our technology bridges the gap between cutting-edge health monitoring and accessible, human-centered care—empowering individuals and communities to take control of their health journey."
        darkBg={false}
      />
    </>
  );
}