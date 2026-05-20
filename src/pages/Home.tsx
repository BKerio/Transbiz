import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Zap, Leaf, Battery, VolumeX, Wrench, Car, Bus, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ScrollReveal from "@/components/shared/ScrollReveal";
import VehicleCard from "@/components/shared/VehicleCard";
import FilterTabs from "@/components/shared/FilterTabs";
import Marquee from "@/components/shared/Marquee";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { vehicles, categories } from "@/data/vehicles";
import { testimonials } from "@/data/testimonials";
import { features, faqItems } from "@/data/features";

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [Zap, Leaf, Battery, VolumeX, Wrench, Car, Bus];

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.fromTo(
      el.querySelector(".hero-image"),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    )
      .fromTo(
        el.querySelector(".hero-big-text"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=1.0"
      )
      .fromTo(
        el.querySelector(".hero-label"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        el.querySelector(".hero-title"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        el.querySelector(".hero-desc"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        el.querySelector(".hero-ctas"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-[#050505] flex flex-col justify-end pb-16 md:pb-24 lg:pb-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-car.jpg"
          alt="Electric Vehicle"
          className="w-full h-full object-cover hero-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.95)] via-[rgba(5,5,5,0.4)] to-transparent" />
      </div>

      {/* Background Big Text */}
      <div className="absolute inset-x-0 top-[22%] flex justify-center z-0 pointer-events-none px-4">
        <h2 className="hero-big-text text-[clamp(32px,7vw,110px)] font-bold text-white/5 tracking-[0.25em] w-full text-center uppercase leading-none">
          Drive to more COMFORT
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 content-max-width w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-end">
          {/* Left Column */}
          <div className="max-w-[720px]">
            <span className="hero-label inline-block text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6 opacity-0">
              WELCOME TO TRANSBIZ
            </span>
            <h1 className="hero-title font-heading font-bold text-[clamp(34px,5vw,64px)] leading-[1.1] text-white opacity-0">
              Clean Energy, Smart Drives, A Greener Tomorrow
            </h1>
          </div>
          
          {/* Right Column */}
          <div className="max-w-[500px] lg:mb-2">
            <p className="hero-desc text-sm md:text-base text-gray-300 leading-relaxed opacity-0">
              Drive the change with Transbiz - where clean energy meets smart drive technology
              for a smoother, greener tomorrow. Join us in powering the future, one ride at a time.
            </p>
            <div className="hero-ctas flex flex-wrap gap-4 mt-8 opacity-0">
              <Link
                to="/vehicles"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2a4566] text-white text-sm font-bold rounded-full hover:bg-[#1e324a] hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
              >
                GET STARTED
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3.5 border border-white/30 text-white text-sm font-bold rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const featuresData = [
    {
      num: "01",
      label: "INNOVATION",
      title: "Future Technology",
      desc: "Advanced EV platforms built for African roads with smart connectivity, digital cockpit, and cutting-edge autonomous features for a truly modern driving experience.",
      bg: "bg-[#0B1221]",
      widthClass: "w-full",
      illustration: (
        <svg className="absolute right-0 top-12 w-48 h-48 text-white opacity-[0.03]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M0,50 Q25,25 50,50 T100,50" />
          <path d="M0,60 Q25,35 50,60 T100,60" />
          <circle cx="80" cy="30" r="2" />
        </svg>
      ),
    },
    {
      num: "02",
      label: "SUSTAINABILITY",
      title: "Green Mobility",
      desc: "Zero emissions, clean energy solutions powering sustainable transportation across the continent. Join the movement for a cleaner, greener Africa.",
      bg: "bg-[#1E293B]",
      widthClass: "w-full md:w-[calc(100%-3rem)]",
      illustration: (
        <svg className="absolute right-0 top-12 w-48 h-48 text-white opacity-[0.03]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M20,80 L40,50 L60,70 L90,20" />
          <rect x="85" y="15" width="10" height="10" transform="rotate(45 90 20)" />
        </svg>
      ),
    },
    {
      num: "03",
      label: "PERFORMANCE",
      title: "Comfort Driving",
      desc: "Smart interiors, smooth performance, and whisper-quiet rides redefining luxury travel. Experience the perfect blend of comfort and power.",
      bg: "bg-[#334155]",
      widthClass: "w-full md:w-[calc(100%-6rem)]",
      illustration: (
        <svg className="absolute right-0 bottom-4 w-48 h-48 text-white opacity-[0.03]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="80" />
          <line x1="70" y1="30" x2="90" y2="50" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32 relative">
      <div className="content-max-width">
        <div className="text-center mb-16 md:mb-24">
          <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#22c55e] mb-3">
            WHY CHOOSE US
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#0B1221]">
            Driving the Future
          </h2>
        </div>

        <div className="relative pb-10">
          {featuresData.map((f, i) => (
            <div
              key={i}
              className="sticky flex justify-center w-full"
              style={{
                top: `${100 + i * 24}px`,
                zIndex: i + 1,
                marginBottom: i !== featuresData.length - 1 ? '15vh' : '0',
              }}
            >
              <div
                className={`${f.bg} ${f.widthClass} rounded-2xl md:rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[340px] transition-all duration-500`}
              >
                {/* Content */}
                <div className="relative z-10 w-full max-w-2xl">
                  <div className="flex items-center gap-2 mb-4 md:mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-[#22c55e]">
                      {f.label}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl md:text-4xl text-white mb-3 md:mb-5 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-white/70 leading-[1.8] max-w-xl">
                    {f.desc}
                  </p>
                </div>

                {/* Bottom indicators */}
                <div className="relative z-10 flex items-center gap-2 mt-10 md:mt-16">
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === i ? "w-8 bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Giant Number Background */}
                <div className="absolute right-6 bottom-4 md:right-12 md:bottom-6 pointer-events-none select-none z-10">
                  <span className="font-heading font-bold text-[70px] md:text-[100px] leading-none text-white/[0.04] tracking-tighter">
                    {f.num}
                  </span>
                </div>

                {/* Decorative SVG */}
                {f.illustration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VehicleShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return vehicles;
    return vehicles.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="bg-bg-primary section-padding">
      <div className="content-max-width">
        <SectionHeader
          label="OUR FLEET"
          title="Choose Your Perfect EV"
          subtitle="From city commuters to luxury SUVs, we have the perfect electric vehicle for every occasion and budget."
        />
        <FilterTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FeaturedFleet() {
  const bentoItems = [
    {
      title: "Energize Your Drive",
      subtitle: "Smart interiors for the modern driver",
      image: "/images/bento-driver.jpg",
      large: true,
    },
    {
      title: "Extended Range",
      subtitle: "Up to 620km on a single charge",
      image: "/images/bento-range.jpg",
    },
    {
      title: "Connected",
      subtitle: "OTA updates & smart features",
      image: "/images/bento-connected.jpg",
    },
    {
      title: "Ultra-Fast Charging",
      subtitle: "0-80% in just 30 minutes",
      image: "/images/bento-charging.jpg",
    },
    {
      title: "Silent Power",
      subtitle: "Whisper-quiet performance",
      image: "/images/bento-silent.jpg",
    },
  ];

  return (
    <section className="bg-bg-secondary section-padding">
      <div className="content-max-width">
        <SectionHeader label="OUR FEATURED FLEET" title="Experience The Future" light />

        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-4 mt-12">
            {/* Large card */}
            <div className="md:row-span-2 relative rounded-2xl overflow-hidden group">
              <img
                src={bentoItems[0].image}
                alt={bentoItems[0].title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400 min-h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading font-semibold text-xl text-white">
                  {bentoItems[0].title}
                </h3>
                <p className="text-sm text-white/70 mt-1">{bentoItems[0].subtitle}</p>
              </div>
            </div>

            {/* Other cards */}
            {bentoItems.slice(1).map((item, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden aspect-[16/10] group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-heading font-semibold text-base text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WhyGoElectric() {
  return (
    <section className="relative bg-bg-primary section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/vehicle-skyworth-k.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-[rgba(5,5,5,0.88)]" />
      </div>

      <div className="relative z-10 content-max-width">
        <SectionHeader
          label="WHY GO ELECTRIC"
          title="Elevate Your Eco-Journey"
        />
        <ScrollReveal stagger={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={i}
                  className="p-7 rounded-xl border border-border-dark bg-[rgba(255,255,255,0.03)] hover:border-white/15 transition-all duration-300"
                >
                  <Icon size={32} className="text-brand" strokeWidth={1.5} />
                  <h3 className="font-heading font-semibold text-lg text-txt-primary mt-4">
                    {f.title}
                  </h3>
                  <p className="text-sm text-txt-secondary mt-2 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CustomerStories() {
  const stories = [
    { title: "Driving Green Future", image: "/images/story-green-future.jpg" },
    { title: "Pioneer 5 Road Trip", image: "/images/story-road-trip.jpg" },
    { title: "First EV Experience", image: "/images/story-first-ev.jpg" },
    { title: "SpotMojo Challenge", image: "/images/story-challenge.jpg" },
  ];

  return (
    <section className="bg-bg-secondary section-padding">
      <div className="content-max-width">
        <SectionHeader label="OUR STORIES" title="Life at Transbiz" light />

        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {/* Large left card */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto group">
              <img
                src={stories[0].image}
                alt={stories[0].title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading font-semibold text-xl text-white">
                  {stories[0].title}
                </h3>
              </div>
            </div>

            {stories.slice(1).map((story, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden aspect-video group"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading font-semibold text-sm text-white">
                    {story.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-bg-primary section-padding">
      <div className="content-max-width">
        <SectionHeader
          label="CUSTOMER STORIES"
          title="What Our Drivers Say About Us"
        />
        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-bg-card border border-border-dark rounded-2xl p-8 hover:border-white/15 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl text-brand/30 font-heading leading-none">
                  &ldquo;
                </span>
                <p className="text-sm text-txt-secondary leading-[1.7] -mt-2">
                  {t.quote}
                </p>
                <div className="border-t border-border-dark mt-6 pt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-[#050505] font-bold text-sm">
                    {t.initial}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-white text-sm">
                      {t.name}
                    </h4>
                    <p className="text-xs text-brand">{t.role}</p>
                  </div>
                  <span className="text-xs text-txt-muted">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TrustedBy() {
  const partners = ["Kenya Power", "KCB Bank", "Safaricom", "Naivas", "Kenya Airways", "NCBA", "M-KOPA", "BasiGo"];

  return (
    <section className="bg-bg-secondary py-16">
      <div className="content-max-width text-center">
        <p className="text-base text-txt-dark-secondary mb-10">
          Trusted by leading organizations across Africa
        </p>
        <ScrollReveal>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((p) => (
              <span
                key={p}
                className="text-lg md:text-xl font-heading font-bold text-txt-dark-muted/50 hover:text-txt-dark/80 transition-all duration-300 cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="bg-bg-primary section-padding">
      <div className="content-max-width">
        <SectionHeader label="FAQ" title="Frequently Asked Questions" />
        <ScrollReveal>
          <div className="mt-12">
            <FAQAccordion items={faqItems} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Marquee />
      <WhyChooseUs />
      <VehicleShowcase />
      <FeaturedFleet />
      <WhyGoElectric />
      <CustomerStories />
      <TestimonialsSection />
      <TrustedBy />
      <FAQSection />
    </main>
  );
}
