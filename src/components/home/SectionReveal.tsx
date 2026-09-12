import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "fade";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

export function SectionReveal({ children, className = "", delay = 0, variant = "up" }: SectionRevealProps) {
  const reduce = useReducedMotion();
  const canObserve = typeof window === "undefined" || "IntersectionObserver" in window;
  const animate = !reduce && canObserve;
  const offset = variant === "left" ? { x: -24, y: 0 } : variant === "right" ? { x: 24, y: 0 } : variant === "fade" ? { x: 0, y: 0 } : { x: 0, y: 24 };

  return <motion.div className={className} initial={animate ? { opacity: 0, ...offset } : false} whileInView={animate ? { opacity: 1, x: 0, y: 0 } : undefined} viewport={{ once: true, margin: "-72px" }} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay }}>{children}</motion.div>;
}
