import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Zap, Leaf, Battery, VolumeX, Wrench, Car, Bus, ArrowRight, ChevronDown, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ScrollReveal from "@/components/shared/ScrollReveal";
import VehicleCard from "@/components/shared/VehicleCard";
import FilterTabs from "@/components/shared/FilterTabs";
import Marquee from "@/components/shared/Marquee";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SavingsCalculator from "@/components/shared/SavingsCalculator";
import { vehicles, categories } from "@/data/vehicles";
import { testimonials } from "@/data/testimonials";
import { features, faqItems } from "@/data/features";
import video1 from "@/assets/video-1.mp4";
import video2 from "@/assets/video-2.mp4";

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [Zap, Leaf, Battery, VolumeX, Wrench, Car, Bus];

// ─── Hero Data ───────────────────────────────────────────────────────────────

const heroSlides = [
  {
    video: video1,
    label: "ZERO EMISSIONS · FULL POWER",
    title: "The Future of",
    titleAccent: "African Mobility",
    subtitle:
      "Transbiz is rewriting the rules of transport. From Nairobi's streets to the open savannah — our electric fleet delivers whisper-quiet power, zero emissions, and Kenyan pride in every kilometre.",
    cta: { label: "Explore Our Fleet", path: "/vehicles" },
    ctaSecondary: { label: "Our Story", path: "/about" },
    stat: { value: "620", unit: "km", label: "Max Range" },
  },
  {
    video: video2,
    label: "SMART · SILENT · SUSTAINABLE",
    title: "Drive Clean,",
    titleAccent: "Drive Kenya",
    subtitle:
      "Every Transbiz vehicle is engineered for African roads — built for resilience, designed for elegance. Cut your fuel bill to zero. Breathe cleaner air. Lead the electric revolution.",
    cta: { label: "Get In Touch", path: "/contact" },
    ctaSecondary: { label: "Our Technology", path: "/technology" },
    stat: { value: "0", unit: "g", label: "CO₂ Emissions" },
  },
];

const heroStats = [
  { target: 500, prefix: "", suffix: "+", label: "EVs Deployed" },
  { target: 47,  prefix: "", suffix: "",  label: "Counties Covered" },
  { target: 98,  prefix: "", suffix: "%", label: "Client Satisfaction" },
  { target: 12,  prefix: "", suffix: "M+",label: "Clean Kilometres" },
];

// ─── Animated counting number — counts from 0 to target every CYCLE_MS ────────

const COUNT_DURATION = 1400; // ms for one count-up
const COUNT_CYCLE    = 5000; // ms between restarts

function CountingNumber({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const [flash, setFlash]     = useState(false);
  const rafRef  = useRef<number | null>(null);

  const startCount = useCallback(() => {
    setDisplay(0);
    setFlash(false);
    const startTime = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / COUNT_DURATION, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setFlash(true);
        setTimeout(() => setFlash(false), 380);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    startCount();
    const interval = setInterval(startCount, COUNT_CYCLE);
    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startCount]);

  return (
    <span
      className={`font-heading font-black text-xl md:text-2xl tracking-tight tabular-nums transition-colors duration-300 ${
        flash ? "text-brand" : "text-white"
      }`}
    >
      {prefix}{display}{suffix}
    </span>
  );
}

const SLIDE_DURATION = 9000;

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((activeSlide + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [activeSlide]);

  // Animate progress bar
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${SLIDE_DURATION}ms linear`;
        bar.style.width = "100%";
      });
    });
  }, [activeSlide]);

  // Play current video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeSlide) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeSlide]);

  // Animate content in on slide change
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".slide-anim"),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" }
    );
  }, [activeSlide]);

  const goToSlide = (idx: number) => {
    if (isTransitioning || idx === activeSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(idx);
      setIsTransitioning(false);
    }, 300);
  };

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative h-screen min-h-[680px] bg-[#050505] overflow-hidden flex flex-col">

      {/* ── Video Backgrounds ── */}
      {heroSlides.map((s, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={s.video}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* ── Cinematic gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[rgba(5,5,5,0.45)] to-[rgba(5,5,5,0.2)] z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,5,5,0.7)] via-[rgba(5,5,5,0.2)] to-transparent z-10" />

      {/* ── Slide counter + dots — top right ── */}
      <div className="absolute top-28 right-6 md:right-12 z-30 flex flex-col items-end gap-1">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/35 uppercase">Scene</span>
        <div className="flex items-baseline gap-1">
          <span className="text-[42px] font-heading font-black text-white/90 leading-none tabular-nums">
            {String(activeSlide + 1).padStart(2, "0")}
          </span>
          <span className="text-sm text-white/25 font-medium">
            / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-1.5 mt-1">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-500 ${
                i === activeSlide
                  ? "w-6 h-1.5 bg-brand shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col justify-end flex-1 content-max-width w-full pb-36 md:pb-44"
      >
        {/* Label pill */}
        <div className="slide-anim mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/12 bg-white/5 backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-[0.18em] text-white/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_6px_rgba(34,197,94,0.7)] animate-pulse" />
            {slide.label}
          </span>
        </div>

        {/* Headline */}
        <h1 className="slide-anim font-heading font-black text-[clamp(40px,6.5vw,88px)] leading-[0.97] text-white max-w-[820px] tracking-tight">
          {slide.title}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #4ade80 55%, #86efac 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {slide.titleAccent}
          </span>
        </h1>

        {/* Body + CTAs + stat card */}
        <div className="slide-anim mt-7 grid grid-cols-1 lg:grid-cols-[1fr_148px] gap-8 lg:gap-12 items-end max-w-[860px]">
          <div>
            <p className="text-sm md:text-[15px] text-white/60 leading-[1.85] max-w-[530px]">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                to={slide.cta.path}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-[#050505] text-sm font-extrabold rounded-full hover:bg-[#4ade80] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_28px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.55)]"
              >
                {slide.cta.label}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={slide.ctaSecondary.path}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/18 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold rounded-full hover:bg-white/12 hover:-translate-y-0.5 transition-all duration-300"
              >
                {slide.ctaSecondary.label}
              </Link>
            </div>
          </div>

          {/* Big stat card */}
          <div className="hidden lg:flex flex-col items-center justify-center w-[148px] h-[148px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shrink-0 gap-1">
            <span className="font-heading font-black text-[46px] leading-none text-white">
              {slide.stat.value}
              <span className="text-brand text-2xl">{slide.stat.unit}</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 text-center">
              {slide.stat.label}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Progress line */}
        <div className="h-[2px] bg-white/8">
          <div
            ref={progressRef}
            className="h-full bg-brand"
            style={{ width: "0%" }}
          />
        </div>
        {/* Stats */}
        <div className="bg-[rgba(5,5,5,0.78)] backdrop-blur-md">
          <div className="content-max-width w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
              {heroStats.map((s, i) => (
                <div key={i} className="flex flex-col items-center py-4 md:py-5 gap-0.5">
                  <CountingNumber
                    target={s.target}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                  <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-28 right-6 md:right-12 z-30 hidden md:flex flex-col items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/28">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/0 via-white/25 to-white/0" />
        <ChevronDown size={13} className="text-white/28 animate-bounce" />
      </div>
    </section>
  );
}

// ─── Why Choose Us ─────────────────────────────────────────────────────────────

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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          {/* Interactive Calculator Column */}
          <div className="lg:col-span-7 w-full">
            <ScrollReveal>
              <SavingsCalculator />
            </ScrollReveal>
          </div>

          {/* Premium Features Column */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal stagger={0.06}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f, i) => {
                  const Icon = featureIcons[i];
                  const isLast = i === features.length - 1;
                  return (
                    <div
                      key={i}
                      className={`group p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                        isLast ? "sm:col-span-2" : ""
                      }`}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-px bg-gradient-to-r from-brand/0 via-brand/10 to-brand/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-brand/20 group-hover:bg-brand/5">
                          <Icon size={20} className="text-brand transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-heading font-semibold text-sm text-txt-primary mt-4 group-hover:text-brand transition-colors duration-300">
                          {f.title}
                        </h3>
                        <p className="text-xs text-txt-secondary mt-1.5 leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
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
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ),
      7000
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handlePrev = () => {
    resetTimeout();
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    resetTimeout();
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleSelectAvatar = (idx: number) => {
    resetTimeout();
    setActiveIndex(idx);
  };

  return (
    <section className="bg-bg-primary section-padding relative overflow-hidden border-t border-white/[0.03]">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="content-max-width relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left panel: Info & Interactive Avatar Hub */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brand mb-4">
                CUSTOMER STORIES
              </span>
              <h2 className="font-heading font-bold text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-txt-primary mb-6">
                What Our Drivers Say About Us
              </h2>
            </div>
            <p className="text-txt-secondary text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Discover how our electric fleet is transforming daily commutes and operations across Kenya, providing silent comfort, zero emissions, and exceptional fuel savings.
            </p>

            {/* Interactive avatar selectors using initials inside circles */}
            <div className="flex flex-wrap items-center gap-3.5">
              {testimonials.map((t, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectAvatar(idx)}
                    className="group relative focus:outline-none"
                    aria-label={`Select testimonial by ${t.name}`}
                  >
                    {/* Glowing active outer ring */}
                    <div
                      className={`absolute -inset-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-brand opacity-100 scale-105 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                          : "bg-transparent opacity-0 scale-90 group-hover:bg-brand/20 group-hover:opacity-60"
                      }`}
                    />
                    {/* Avatar circle */}
                    <div
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center font-heading font-black text-sm transition-all duration-300 border-2 ${
                        isActive
                          ? "bg-[#0A0A0A] border-white text-brand scale-105"
                          : "bg-white/[0.02] border-white/10 text-txt-secondary scale-95 opacity-55 group-hover:opacity-90 group-hover:border-white/20 group-hover:text-white"
                      }`}
                    >
                      {t.initial}
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 text-[10px] text-txt-muted font-mono tracking-wider">
              CLICK AVATARS TO VIEW FEEDBACK
            </div>
          </div>

          {/* Right panel: Flat, High-End Compact Card Showcase */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start w-full">
            {/* Elegant flat border container - slightly smaller cards */}
            <div className="relative bg-[#0d0d0f]/90 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden w-full max-w-[540px]">
              
              {/* Decorative quotation mark */}
              <Quote size={100} className="absolute -top-6 -right-4 text-brand/[0.03] fill-brand/[0.01] pointer-events-none" />

              {/* Slider Viewport */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {testimonials.map((t) => (
                    <div key={t.id} className="w-full shrink-0">
                      
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} className="fill-brand text-brand" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-base md:text-lg font-light italic leading-relaxed mb-8 text-white/90">
                        "{t.quote}"
                      </p>

                      {/* Author Info */}
                      <div className="flex justify-between items-center border-t border-white/5 pt-6">
                        <div>
                          <h4 className="text-white font-heading font-semibold text-sm">
                            {t.name}
                          </h4>
                          <p className="text-brand text-xs mt-0.5 font-medium">
                            {t.role}
                          </p>
                        </div>
                        <span className="text-[10px] text-txt-muted font-mono">
                          {t.date}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation controls & slide numbers */}
              <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-6">
                
                {/* Slide indicator dots */}
                <div className="flex gap-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAvatar(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        activeIndex === idx ? "bg-brand w-6" : "bg-white/10 hover:bg-white/20 w-1.5"
                      }`}
                      aria-label={`Show testimonial slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Left & Right custom buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white hover:bg-brand hover:text-[#050505] hover:border-brand transition-all duration-300 shadow-sm"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white hover:bg-brand hover:text-[#050505] hover:border-brand transition-all duration-300 shadow-sm"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Partner logo data with Clearbit domains ────────────────────────────────
const partnerRow1 = [
  { name: "Safaricom",     domain: "safaricom.co.ke"      },
  { name: "KCB Bank",      domain: "kcbgroup.com"          },
  { name: "Kenya Airways", domain: "kenya-airways.com"     },
  { name: "NCBA",          domain: "ncbagroup.com"         },
  { name: "Kenya Power",   domain: "kplc.co.ke"            },
  { name: "Equity Bank",   domain: "equitybankgroup.com"   },
  { name: "Stanbic Bank",  domain: "stanbicbank.co.ke"     },
  { name: "Absa Kenya",    domain: "absa.co.ke"            },
];

const partnerRow2 = [
  { name: "M-KOPA",        domain: "m-kopa.com"            },
  { name: "BasiGo",        domain: "basigo.africa"          },
  { name: "Naivas",        domain: "naivas.co.ke"           },
  { name: "Twiga Foods",   domain: "twiga.com"              },
  { name: "Jumia Kenya",   domain: "jumia.co.ke"            },
  { name: "Sendy",         domain: "sendy.co.ke"            },
  { name: "Kopesha",       domain: "kopesha.com"            },
  { name: "Sunculture",    domain: "sunculture.io"          },
];

function LogoCard({ name, domain }: { name: string; domain: string }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="flex-shrink-0 flex items-center justify-center gap-3 px-6 py-4 mx-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group min-w-[160px]">
      {imgOk ? (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          onError={() => setImgOk(false)}
          className="h-7 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      ) : (
        <span className="w-7 h-7 rounded-md bg-brand/10 flex items-center justify-center text-brand font-black text-sm">
          {name[0]}
        </span>
      )}
      <span className="text-sm font-bold text-gray-500 group-hover:text-gray-800 transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function InfiniteRow({
  items,
  reverse = false,
}: {
  items: { name: string; domain: string }[];
  reverse?: boolean;
}) {
  // Triple for seamless -33.333% keyframe loop
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full marquee-track">
      <div
        className={`flex w-max marquee-content ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
      >
        {tripled.map((p, i) => (
          <LogoCard key={`${p.domain}-${i}`} name={p.name} domain={p.domain} />
        ))}
      </div>
    </div>
  );
}

function TrustedBy() {
  return (
    <section className="relative bg-[#F6F7FA] overflow-hidden py-20 md:py-28">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="content-max-width text-center mb-14">
          <ScrollReveal>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
              Our Partners
            </span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-gray-900 leading-tight">
              Trusted by Africa's{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg,#22c55e 0%,#16a34a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Leading Brands
              </span>
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-[500px] mx-auto leading-relaxed">
              From Kenya's largest telecoms to pioneering fintechs — the continent's biggest names power their fleets with Transbiz.
            </p>
          </ScrollReveal>
        </div>

        {/* Dual infinite marquee rows */}
        <div className="flex flex-col gap-4">
          <InfiniteRow items={partnerRow1} />
          <InfiniteRow items={partnerRow2} reverse />
        </div>

        {/* Bottom stat strip */}
        <ScrollReveal>
          <div className="content-max-width mt-16">
            <div className="grid grid-cols-3 divide-x divide-gray-200 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {[
                { value: "50+", label: "Corporate Partners" },
                { value: "6", label: "Countries" },
                { value: "KSh 2B+", label: "Fleet Value Managed" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center py-7 px-4">
                  <span className="font-heading font-black text-2xl md:text-3xl text-gray-900">
                    {s.value}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mt-1 text-center">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
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
