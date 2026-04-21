import { Clock } from "lucide-react";
import { articles } from "@/data/features";
import SectionHeader from "@/components/shared/SectionHeader";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="relative min-h-[45vh] bg-bg-primary flex items-center justify-center pt-[72px]"
    >
      <div className="absolute inset-0">
        <img
          src="/images/tech-hero.jpg"
          alt="EV Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(5,5,5,0.6)]" />
      </div>
      <div className="relative z-10 content-max-width w-full text-center py-20">
        <span className="animate-in inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brand mb-4 opacity-0">
          INNOVATION
        </span>
        <h1 className="animate-in font-heading font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-white opacity-0">
          Technology That Powers Tomorrow
        </h1>
        <p className="animate-in mt-6 text-lg text-txt-secondary max-w-[700px] mx-auto leading-relaxed opacity-0">
          Cutting-edge engineering meets African innovation. Discover the technology driving
          our electric revolution.
        </p>
      </div>
    </section>
  );
}

function ArticlesGridSection() {
  return (
    <section className="bg-bg-secondary section-padding">
      <div className="content-max-width">
        <SectionHeader
          label="RESOURCES"
          title="EV Maintenance & How-To Guides"
          subtitle="Expert advice to help you get the most out of your electric vehicle."
          light
        />
        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-border-light hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-brand-soft text-brand text-xs font-semibold rounded-md">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-txt-dark-muted">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-base text-txt-dark mt-3 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-txt-dark-secondary mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Technology() {
  return (
    <main>
      <HeroSection />
      <ArticlesGridSection />
    </main>
  );
}
