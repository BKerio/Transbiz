import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0.08,
      ease = "power3.out",
      start = "top 85%",
      once = true,
    } = options;

    const children = el.children.length > 0 ? Array.from(el.children) : [el];

    gsap.set(children, { y, opacity });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return ref;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollAnimationOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      ease = "power3.out",
      start = "top 85%",
      once = true,
    } = options;

    gsap.set(el, { y, opacity });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return ref;
}
