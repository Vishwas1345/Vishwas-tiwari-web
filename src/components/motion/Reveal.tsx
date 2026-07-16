import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const directionVariants = (direction: RevealDirection): Variants => {
  switch (direction) {
    case "left":
      return { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0 } };
    case "scale":
      return { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } };
    default:
      return fadeUp;
  }
};

type RevealDirection = "up" | "left" | "right" | "scale";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
};

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={directionVariants(direction)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {},
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay between each StaggerItem child. */
  interval?: number;
  delay?: number;
};

/** Scroll-triggered container that reveals StaggerItem children one by one. */
export function Stagger({ children, className, interval = 0.08, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: interval, delayChildren: delay }}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={cn(className)}>
      {children}
    </motion.div>
  );
}

/**
 * Site-wide cursor spotlight for .card-hover surfaces: feeds the --mouse-x/--mouse-y
 * CSS vars that .card-hover::before reads. Mount once (in App); renders nothing.
 */
export function CardSpotlight() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.(".card-hover");
      if (el instanceof HTMLElement) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
