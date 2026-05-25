import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Clock, Calendar, Tag, ChevronRight } from "lucide-react";
import { articles } from "@/data/features";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);

  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (!article) {
      navigate("/technology", { replace: true });
      return;
    }

    const el = articleRef.current;
    if (!el) return;

    // Smooth entry animation for content
    gsap.fromTo(
      el.querySelectorAll(".animate-fade-in"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, [id, article, navigate]);

  if (!article) return null;

  // Filter out the current article to show recommendations
  const relatedArticles = articles
    .filter((a) => a.id !== id)
    .slice(0, 3);

  return (
    <main ref={articleRef} className="bg-bg-secondary min-h-screen pt-[88px] pb-20">
      {/* Article Hero */}
      <section className="relative h-[40vh] md:h-[50vh] bg-bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-black/50 to-black/30" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="content-max-width w-full pb-10">
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 text-white/80 hover:text-brand transition-colors text-sm mb-6"
            >
              <ArrowLeft size={16} />
              Back to Technology
            </Link>

            <div className="max-w-[800px]">
              <span className="inline-block px-3 py-1 bg-brand text-bg-primary text-xs font-semibold rounded-md mb-4 uppercase tracking-wider">
                {article.category}
              </span>
              <h1 className="font-heading font-bold text-[clamp(28px,4vw,48px)] leading-[1.15] text-white tracking-[-0.02em]">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-brand" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-brand" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="content-max-width mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Body */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-10 border border-border-light shadow-[0_8px_30px_rgba(0,0,0,0.02)] animate-fade-in">
            <div className="prose max-w-none text-txt-dark-secondary leading-[1.8] space-y-6">
              {article.content.map((p, index) => (
                <p key={index} className="text-base md:text-lg">
                  {p}
                </p>
              ))}
            </div>

            <div className="border-t border-border-light mt-10 pt-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-txt-dark-muted" />
                <span className="text-xs font-semibold text-txt-dark-muted uppercase">
                  {article.category}
                </span>
              </div>

              <div className="flex gap-3">
                {/* Custom sharing or visual separator */}
                <span className="text-xs text-txt-dark-muted">Transbiz Editorial Team</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-fade-in">
            {/* Related Articles Widget */}
            <div className="bg-white rounded-2xl p-6 border border-border-light shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <h3 className="font-heading font-bold text-lg text-txt-dark mb-4 pb-2 border-b border-border-light">
                More Articles
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/technology/${rel.id}`}
                    className="block group"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-bg-primary">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-brand uppercase tracking-wider">
                          {rel.category}
                        </span>
                        <h4 className="font-heading font-semibold text-sm text-txt-dark mt-1 line-clamp-2 group-hover:text-brand transition-colors">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Premium CTA Widget */}
            <div className="bg-bg-primary border border-border-dark rounded-2xl p-6 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-2xl" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                READY TO SWITCH?
              </span>
              <h3 className="font-heading font-bold text-xl mt-2 leading-snug">
                Join the Electric Revolution Today
              </h3>
              <p className="text-sm text-txt-secondary mt-3 leading-relaxed">
                Explore our commercial EV models and get a customized leasing plan for your business.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/vehicles"
                  className="w-full py-3 bg-brand hover:bg-brand/90 text-bg-primary text-center font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-1 group"
                >
                  Browse Fleet
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-white/20 hover:border-white/40 text-center font-semibold rounded-xl text-sm transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
