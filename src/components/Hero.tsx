/* RIYAN HEALTH LANDING 5/src/components/Hero.tsx */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const CLOUDINARY_TRANSFORMATION = "c_fill,ar_16:9,g_auto,w_auto,dpr_auto,f_auto";

const heroSlides = [
  {
    type: "Patient",
    title: "Health Isn't a Solo Sport: Why Your 'Team' Is Your Greatest Strength",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763364732/Community_musings_acaqbu.jpg",
    launchingsoon: false,
  },
  {
    type: "Blog",
    title: 'Blog: Proactive Health Saves Lives, "Sick Care" vs "Health Care"',
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763364806/markus-winkler-xBiL0Hpulrk-unsplash_gdlo5n.jpg",
    launchingsoon: false,
  },
  {
    type: "News",
    title: "Healthy returns: Why Europe must treat healthcare as an investment, not a cost",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763366908/healthcare_investment_u5thpg.webp",
    launchingsoon: false,
  },
  {
    type: "Research",
    title: "Co-Founder's Publication: Electronic health record system and service delivery",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763368954/Dr_Derrick_-_research1_sukchu.png",
    launchingsoon: false,
  },  
  {
    type: "Blog",
    title: "Blog: Health Isn't a Cost. It's the Smartest Investment We Can Make.",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763364813/invest_in_health_mm4ddy.png",
    launchingsoon: false,
  },
];

function applyCloudinaryTransformation(url: string, transformation = CLOUDINARY_TRANSFORMATION) {
  try {
    // If the url already contains an upload/ segment, inject the transformation immediately after it
    const uploadToken = "/upload/";
    const idx = url.indexOf(uploadToken);
    if (idx === -1) return url; // not a Cloudinary-style URL, return original

    // Avoid double slashes and ensure we inject only once
    const before = url.slice(0, idx + uploadToken.length);
    const after = url.slice(idx + uploadToken.length);
    return `${before}${transformation}/${after}`;
  } catch (e) {
    return url;
  }
}

export function Hero() {
  const handleSlideClick = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: '/blog' }));
  };

  return (
    <section className="relative w-full pt-20 bg-black">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-full -ml-0">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              {/* Mobile: 4:5 portrait ratio, Tablet: 16:10, Desktop: 21:9 cinematic */}
              <div 
                className="relative w-full overflow-hidden cursor-pointer group"
                onClick={handleSlideClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSlideClick();
                  }
                }}
                aria-label={`Read more about ${slide.title}`}
                style={{
                  aspectRatio: '4/5',
                  maxHeight: '600px',
                }}
              >
                <style dangerouslySetInnerHTML={{__html: `
                  @media (min-width: 640px) {
                    [data-hero-slide] {
                      aspect-ratio: 16/10 !important;
                      max-height: 650px !important;
                    }
                  }
                  @media (min-width: 1024px) {
                    [data-hero-slide] {
                      aspect-ratio: 21/9 !important;
                      max-height: 700px !important;
                    }
                  }
                `}} />
                <div data-hero-slide className="relative w-full h-full">
                  {/* Background Image */}
                  <ImageWithFallback
                    src={applyCloudinaryTransformation(slide.image)}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/65 group-hover:via-black/30 group-hover:to-black/10" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end text-white p-5 sm:p-7 md:p-12">
                    <div className="max-w-[1200px] mx-auto w-full">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.5,
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {/* Subtitle */}
                        <p
                          className="mb-3 md:mb-4 uppercase tracking-widest"
                          style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "clamp(10px, 1.2vw, 14px)",
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 0.9)",
                            textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          {slide.type}
                        </p>

                        {/* Main Title */}
                        <h1
                          className="mb-6 md:mb-8"
                          style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "clamp(28px, 5vw, 60px)",
                            fontWeight: 600,
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            textShadow: "0 3px 18px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.9)",
                          }}
                        >
                          {slide.title}
                        </h1>

                        {/* Launching Soon Badge - Conditionally Rendered */}
                        {slide.launchingsoon && (
                          <div
                            className="inline-block px-4 py-2 md:px-5 md:py-3"
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: "clamp(14px, 2vw, 18px)",
                              fontWeight: 700,
                              color: "var(--riyan-text-primary)",
                              backgroundColor: "var(--riyan-secondary-accent)",
                              borderRadius: "8px",
                              letterSpacing: "0.05em",
                            }}
                          >
                            LAUNCHING SOON
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}