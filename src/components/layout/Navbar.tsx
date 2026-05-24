import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "OUR CARS", path: "/vehicles" },
  { label: "NEWS & ARTICLES", path: "/technology" },
  { label: "CONTACT US", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── White Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center bg-white transition-all duration-300 ${
          scrolled
            ? "shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-b border-gray-100"
            : "border-b border-gray-200"
        }`}
      >
        <div className="content-max-width w-full flex items-center justify-between">

          {/* Logo — white bg on white bar = perfect rendering */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Transbiz Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold tracking-[0.04em] transition-colors duration-200 group ${
                  isActive(link.path)
                    ? "text-brand"
                    : "text-gray-700 hover:text-brand"
                }`}
              >
                {link.label}
                {/* Animated green underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-brand rounded-full transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* WhatsApp icon */}
            <a
              href="https://wa.me/+254747468481"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-10 h-10 rounded-full border border-gray-200 items-center justify-center text-gray-500 hover:border-brand hover:text-brand hover:bg-brand/5 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9Z" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
            </a>

            {/* Phone icon */}
            <a
              href="tel:+254113778888"
              className="hidden sm:flex w-10 h-10 rounded-full border border-gray-200 items-center justify-center text-gray-500 hover:border-brand hover:text-brand hover:bg-brand/5 transition-all duration-300"
              aria-label="Call"
            >
              <Phone size={18} />
            </a>

            {/* CTA button */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-hover shadow-sm hover:shadow-lg transition-all duration-300"
            >
              GET IN TOUCH
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:text-brand transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[rgba(5,5,5,0.98)] backdrop-blur-[20px] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white hover:text-brand transition-colors"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xl font-heading font-semibold transition-colors ${
                      isActive(link.path) ? "text-brand" : "text-white hover:text-brand"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.4, delay: navLinks.length * 0.06 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-8 py-3 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-hover transition-all duration-300 mt-4"
                >
                  GET IN TOUCH
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
