import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "Vehicles", path: "/vehicles" },
  { label: "Technology", path: "/technology" },
  { label: "Sustainability", path: "/about" },
];

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Careers", path: "/" },
  { label: "Press", path: "/" },
  { label: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "/", label: "Facebook" },
  { icon: Twitter, href: "/", label: "Twitter" },
  { icon: Instagram, href: "/", label: "Instagram" },
  { icon: Linkedin, href: "/", label: "LinkedIn" },
  { icon: Youtube, href: "/", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-border-dark">
      <div className="content-max-width pt-20 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="font-heading font-bold text-2xl text-white tracking-tight">
                TRANS<span className="text-brand">BIZ</span>
              </span>
              <span className="block text-[10px] text-txt-muted font-body mt-0.5">
                Kenya Limited
              </span>
            </Link>
            <p className="mt-4 text-sm text-txt-secondary leading-relaxed">
              Driving Africa's electric future with sustainable, innovative mobility solutions.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-txt-muted hover:text-brand transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-txt-primary mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-txt-secondary hover:text-txt-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-txt-primary mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-txt-secondary hover:text-txt-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-txt-primary mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-txt-secondary">
                <Mail size={16} className="text-brand mt-0.5 shrink-0" />
                <span>Info@transbiz.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-txt-secondary">
                <Phone size={16} className="text-brand mt-0.5 shrink-0" />
                <span>+254 113 778 888</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-txt-secondary">
                <Phone size={16} className="text-brand mt-0.5 shrink-0" />
                <span>+254 768 770 000</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-txt-secondary">
                <MapPin size={16} className="text-brand mt-0.5 shrink-0" />
                <span>Ngong Rd, Nairobi, Next to Rubis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-border-dark">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="font-heading font-semibold text-lg text-txt-primary">
                Stay in the loop
              </h4>
              <p className="text-sm text-txt-secondary mt-1">
                Get exclusive EV tips, special offers, and the latest news delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-[280px] max-w-full px-4 py-3 bg-white border border-border-light rounded-xl text-sm text-txt-dark placeholder:text-txt-dark-muted focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand-soft transition-all"
              />
              <button className="px-6 py-3 bg-brand text-[#050505] text-sm font-semibold rounded-full hover:bg-brand-hover transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-muted">
            &copy; 2026 Transbiz Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-txt-muted hover:text-txt-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-txt-muted hover:text-txt-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
