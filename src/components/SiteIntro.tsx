import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IntroContext } from "@/contexts/IntroContext";
import { IntroNeuralStage, type IntroPhase } from "@/components/IntroNeuralStage";

/**
 * Landing sequence: scattered field → name (letter pop) → nodes snap into neural canvas → hand off to hero.
 * No video — pure SVG + motion. Hero content stays hidden until handoff (see IntroContext).
 */
export function SiteIntro({ children }: { children: React.ReactNode }) {
  const { setIntroComplete } = useContext(IntroContext);
  const [phase, setPhase] = useState<IntroPhase>("scatter");
  const [overlayDone, setOverlayDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const beginExit = useCallback(() => {
    clearTimers();
    setIntroComplete(true);
    setExiting(true);
  }, [clearTimers, setIntroComplete]);

  useEffect(() => {
    if (overlayDone) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayDone]);

  useEffect(() => {
    if (overlayDone) return;
    clearTimers();
    if (reducedMotion) {
      schedule(() => setPhase("name"), 220);
      schedule(() => setPhase("converge"), 480);
      schedule(() => setPhase("hold"), 880);
      schedule(() => beginExit(), 1180);
    } else {
      schedule(() => setPhase("name"), 1000);
      schedule(() => setPhase("converge"), 2600);
      schedule(() => setPhase("hold"), 5000);
      schedule(() => beginExit(), 5800);
    }
    return clearTimers;
  }, [overlayDone, reducedMotion, schedule, clearTimers, beginExit]);

  useEffect(() => {
    if (!exiting || overlayDone) return;
    const id = window.setTimeout(() => {
      setOverlayDone(true);
      setExiting(false);
    }, 820);
    return () => window.clearTimeout(id);
  }, [exiting, overlayDone]);

  const handleSkip = () => {
    if (overlayDone) return;
    beginExit();
  };

  return (
    <>
      {children}
      {!overlayDone && (
        <motion.div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020202] text-foreground intro-grid ${exiting ? "pointer-events-none" : ""}`}
          initial={{ opacity: 1 }}
          animate={exiting ? { opacity: 0, scale: 1.02, filter: reducedMotion ? "blur(0px)" : "blur(12px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: reducedMotion ? 0.28 : 0.78, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Introduction"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-transparent to-[#020202]/95" />

          <IntroNeuralStage phase={phase} reducedMotion={reducedMotion} />

          <button
            type="button"
            onClick={handleSkip}
            className="pointer-events-auto absolute bottom-8 right-6 z-20 font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 transition-colors hover:text-primary sm:bottom-10 sm:right-10 px-3 py-2 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5"
          >
            Skip
          </button>

          <div className="pointer-events-none absolute top-6 left-6 h-14 w-14 border-l-2 border-t-2 border-primary/20 rounded-tl-xl sm:h-16 sm:w-16" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-14 w-14 border-r-2 border-b-2 border-primary/20 rounded-br-xl sm:h-16 sm:w-16" />
        </motion.div>
      )}
    </>
  );
}
