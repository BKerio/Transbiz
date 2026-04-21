import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Truck, Bus, CreditCard, Wrench, Eye } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ScrollReveal from "@/components/shared/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".animate-in"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[50vh] bg-bg-primary flex items-center justify-center overflow-hidden pt-[72px]"
    >
      <div className="absolute inset-0">
        <img
          src="/images/about-hero.jpg"
          alt="EV Headlights"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(5,5,5,0.6)]" />
      </div>
      <div className="relative z-10 content-max-width w-full text-center py-20">
        <span className="animate-in inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brand mb-4 opacity-0">
          ABOUT US
        </span>
        <h1 className="animate-in font-heading font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-white opacity-0">
          MojaEV Kenya Limited
        </h1>
        <p className="animate-in mt-6 text-lg text-txt-secondary max-w-[700px] mx-auto leading-relaxed opacity-0">
          A Kenyan-registered electric mobility company driving the transition to clean,
          affordable, and scalable transportation across East Africa.
        </p>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="bg-bg-secondary section-padding">
      <div className="content-max-width">
        <ScrollReveal>
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="font-heading font-bold text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-txt-dark">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-txt-dark-secondary leading-relaxed">
              To accelerate the adoption of electric vehicles by delivering cost-efficient,
              environmentally sustainable mobility solutions tailored to African operating
              conditions. We focus on practical innovation — solutions that work on our roads,
              for our businesses, and for our people.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SolutionsSection() {
  const solutions = [
    { icon: Car, title: "Electric Taxis", desc: "Urban and peri-urban mobility solutions" },
    { icon: Truck, title: "Electric Vans", desc: "Inter-city and long-distance transport" },
    { icon: Bus, title: "Electric City Buses", desc: "Mass public transport systems" },
    { icon: CreditCard, title: "Vehicle Financing", desc: "Asset management with leading financial institutions" },
    { icon: Wrench, title: "After-Sales Support", desc: "Service, maintenance, battery management & fleet monitoring" },
  ];

  return (
    <section className="bg-bg-primary section-padding">
      <div className="content-max-width">
        <SectionHeader
          label="OUR SOLUTIONS"
          title="What We Do"
          subtitle="MojaEV provides end-to-end electric mobility solutions across commercial and public transport segments."
        />
        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-[900px] mx-auto">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="bg-bg-card border border-border-dark rounded-2xl p-8 text-center hover:border-white/15 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-soft flex items-center justify-center mx-auto">
                    <Icon size={24} className="text-brand" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-txt-primary mt-5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-txt-secondary mt-2">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-bg-secondary section-padding">
      <div className="content-max-width">
        <SectionHeader
          label="MAKING A DIFFERENCE"
          title="Driving Impact Through Innovation"
          light
        />
        <ScrollReveal>
          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <p className="text-lg text-txt-dark-secondary leading-[1.7]">
              Since its inception, MojaEV has focused on building solutions that align
              environmental sustainability with economic growth. Our flagship EV leasing
              program for the taxi industry has opened the door for drivers and fleet
              operators to transition to electric vehicles without the burden of high upfront
              costs.
            </p>
            <p className="text-lg text-txt-dark-secondary leading-[1.7]">
              Through strategic partnerships and a growing support ecosystem, we are enabling
              the expansion of electric public service vehicles (PSVs) across Kenya —
              empowering drivers, reducing operating costs, and lowering emissions at scale.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="bg-bg-secondary pb-[clamp(80px,10vw,140px)]">
      <div className="content-max-width">
        <ScrollReveal>
          <div className="max-w-[700px] mx-auto text-center">
            <Eye size={32} className="text-brand mx-auto" />
            <h2 className="font-heading font-bold text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-txt-dark mt-6">
              Our Vision
            </h2>
            <p className="mt-6 text-lg text-txt-dark-secondary leading-relaxed">
              MojaEV is committed to making electric mobility accessible, practical, and
              commercially viable for businesses and individuals alike. Beyond vehicle supply,
              we are building the foundations of a sustainable EV ecosystem — one that
              positions Kenya as a leader in electric mobility across Africa.
            </p>
            <p className="mt-6 text-base font-semibold text-txt-dark">
              The future of transport is electric. At MojaEV, we&apos;re making it happen — today.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main>
      <HeroSection />
      <MissionSection />
      <SolutionsSection />
      <ImpactSection />
      <VisionSection />
    </main>
  );
}
