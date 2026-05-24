import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
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
      className="relative min-h-[40vh] bg-bg-primary flex items-center justify-center pt-[72px]"
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero-car.jpg"
          alt="Contact Transbiz"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[rgba(5,5,5,0.7)]" />
      </div>
      <div className="relative z-10 content-max-width w-full text-center py-20">
        <span className="animate-in inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brand mb-4 opacity-0">
          GET IN TOUCH
        </span>
        <h1 className="animate-in font-heading font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-white opacity-0">
          Contact Transbiz
        </h1>
        <p className="animate-in mt-6 text-lg text-txt-secondary max-w-[600px] mx-auto leading-relaxed opacity-0">
          Ready to join the electric revolution? Have questions? We&apos;d love to hear from you.
        </p>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const infoCards = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "Info@transbiz.com",
      sub: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+254 747 468 481",
      sub: "Mon-Fri, 8am to 6pm EAT",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "Manga House, Right Wing",
      sub: "9 Kiambere Rd, Nairobi, Kenya",
    },
    {
      icon: Clock,
      title: "Working Hours",
      detail: "Mon - Sat: 8am - 8pm",
      sub: "Sunday: 10am - 4pm",
    },
  ];

  return (
    <section className="bg-bg-secondary section-padding">
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16">
          {/* Left - Form */}
          <ScrollReveal>
            <div>
              <h3 className="font-heading font-semibold text-xl text-txt-dark mb-8">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-txt-dark mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-txt-dark placeholder:text-txt-dark-muted focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand-soft transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-txt-dark mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-txt-dark placeholder:text-txt-dark-muted focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand-soft transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-txt-dark mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-txt-dark placeholder:text-txt-dark-muted focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand-soft transition-all"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-txt-dark mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-txt-dark placeholder:text-txt-dark-muted focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand-soft transition-all"
                      placeholder="General Inquiry"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-txt-dark mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-txt-dark placeholder:text-txt-dark-muted focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand-soft transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand text-[#050505] font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Right - Info */}
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="font-heading font-semibold text-xl text-txt-dark mb-8">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infoCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white border border-border-light rounded-2xl p-6"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-soft flex items-center justify-center">
                        <Icon size={22} className="text-brand" />
                      </div>
                      <h4 className="font-heading font-semibold text-base text-txt-dark mt-3">
                        {card.title}
                      </h4>
                      <p className="text-sm font-semibold text-txt-dark mt-1">
                        {card.detail}
                      </p>
                      <p className="text-xs text-txt-dark-muted mt-0.5">{card.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Map — Manga House, 9 Kiambere Rd, Nairobi */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-border-light shadow-sm">
                <div className="px-0 py-0">
                  <h4 className="font-heading font-semibold text-sm text-txt-dark px-4 pt-4 pb-2">Our Location</h4>
                </div>
                <iframe
                  title="Transbiz — Manga House, Nairobi"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.820291742!2d36.82193!3d-1.29773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d74d1a5555%3A0x5e29e7db7b8b0ded!2sManga%20House!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                  width="100%"
                  height="360"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <main>
      <HeroSection />
      <ContactFormSection />
    </main>
  );
}
