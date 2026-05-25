import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Vehicles from "@/pages/Vehicles";
import Technology from "@/pages/Technology";
import ArticleDetail from "@/pages/ArticleDetail";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg-primary">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/vehicles"
            element={
              <PageWrapper>
                <Vehicles />
              </PageWrapper>
            }
          />
          <Route
            path="/technology"
            element={
              <PageWrapper>
                <Technology />
              </PageWrapper>
            }
          />
          <Route
            path="/technology/:id"
            element={
              <PageWrapper>
                <ArticleDetail />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="/terms"
            element={
              <PageWrapper>
                <Terms />
              </PageWrapper>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageWrapper>
                <Privacy />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ChatWidget />
    </div>
  );
}
