import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  duration?: number;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  stagger = 0.08,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xOffset = direction === "left" ? -40 : direction === "right" ? 40 : 0;
    const yOffset = direction === "up" ? 40 : 0;

    const items = el.children.length > 1 ? Array.from(el.children) : [el];

    gsap.set(items, { x: xOffset, y: yOffset, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger: el.children.length > 1 ? stagger : 0,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, direction, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
