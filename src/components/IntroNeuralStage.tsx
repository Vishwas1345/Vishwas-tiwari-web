import { motion } from "framer-motion";
import {
  NEURAL_LINES,
  NEURAL_NODES,
  NEURAL_VIEW,
  scatterForExtraParticle,
  scatterPositionForNode,
} from "@/lib/neuralCanvasLayout";

export type IntroPhase = "scatter" | "name" | "converge" | "hold";

const EXTRA_COUNT = 18;

type IntroNeuralStageProps = {
  phase: IntroPhase;
  reducedMotion: boolean;
};

export function IntroNeuralStage({ phase, reducedMotion }: IntroNeuralStageProps) {
  const showLines = phase === "converge" || phase === "hold";
  const showName = phase !== "scatter";
  const extrasVisible = phase === "scatter" || phase === "name";
  const convergeOrHold = phase === "converge" || phase === "hold";

  const name = "Vishwas Tiwari";
  const letters = name.split("");

  const lineTransition = reducedMotion
    ? { duration: 0.2 }
    : { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-4">
      {/* Name — professional pop after dots establish */}
      <div className="mb-6 min-h-[4.5rem] sm:min-h-[5.5rem] flex items-center justify-center">
        {showName && (
          <motion.h1
            className="font-display text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={false}
            aria-hidden={!showName}
          >
            <span className="inline-flex flex-wrap justify-center gap-y-1">
              {letters.map((ch, i) =>
                ch === " " ? (
                  <span key={`sp-${i}`} className="inline-block w-3 sm:w-4" />
                ) : (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="inline-block text-gradient origin-bottom"
                    initial={
                      reducedMotion
                        ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 36, rotateX: -75, filter: "blur(10px)" }
                    }
                    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            delay: 0.04 * i,
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  >
                    {ch}
                  </motion.span>
                )
              )}
            </span>
          </motion.h1>
        )}
      </div>

      <motion.p
        className="mb-8 font-label text-xs uppercase tracking-[0.28em] text-muted-foreground/90"
        initial={false}
        animate={{
          opacity: showName ? 1 : 0,
          y: showName ? 0 : 8,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.45 }}
      >
        AI Enthusiast & Developer
      </motion.p>

      <div className="relative mx-auto aspect-square w-full max-w-[min(92vw,440px)]">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/18 via-transparent to-[hsl(207,100%,70%)]/12 blur-3xl neural-pulse" />

        <svg
          viewBox={`0 0 ${NEURAL_VIEW} ${NEURAL_VIEW}`}
          className="relative z-10 h-full w-full text-primary drop-shadow-[0_0_20px_hsl(var(--glow)/0.25)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="intro-orb-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
              <stop offset="100%" stopColor="hsl(207 100% 70%)" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="intro-orb-glow" cx="50%" cy="42%" r="58%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <circle cx="200" cy="200" r="168" fill="url(#intro-orb-glow)" opacity={convergeOrHold ? 1 : 0.35} />

          {NEURAL_LINES.map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={`ln-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#intro-orb-line)"
              strokeWidth={i === NEURAL_LINES.length - 1 ? 1 : 1.25}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={
                showLines
                  ? { opacity: i === NEURAL_LINES.length - 1 ? 0.38 : 0.48 }
                  : { opacity: 0 }
              }
              transition={{ ...lineTransition, delay: reducedMotion ? 0 : 0.06 * i }}
            />
          ))}

          {NEURAL_NODES.map((node, i) => {
            const scatter = scatterPositionForNode(node.id);
            const atRest = convergeOrHold;
            return (
              <motion.circle
                key={node.id}
                r={node.r}
                fill="hsl(var(--primary))"
                fillOpacity={node.id === 3 ? 0.98 : 0.72}
                initial={false}
                animate={{
                  cx: atRest ? node.x : scatter.x,
                  cy: atRest ? node.y : scatter.y,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0.15 }
                    : {
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        mass: 0.85,
                        delay: phase === "converge" ? 0.05 * i : 0,
                      }
                }
              />
            );
          })}

          <motion.g
            style={{ transformOrigin: "200px 200px" }}
            animate={
              extrasVisible && !reducedMotion
                ? { rotate: [0, 1.8, 0, -1.4, 0] }
                : { rotate: 0 }
            }
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            {Array.from({ length: EXTRA_COUNT }, (_, i) => {
              const s = scatterForExtraParticle(i);
              return (
                <motion.circle
                  key={`ex-${i}`}
                  cx={s.x}
                  cy={s.y}
                  r={2 + (i % 4) * 0.5}
                  fill="hsl(var(--primary))"
                  fillOpacity={0.45}
                  initial={false}
                  animate={{
                    opacity: extrasVisible ? 0.55 : 0,
                    scale: extrasVisible ? 1 : 0.2,
                  }}
                  transition={{ duration: reducedMotion ? 0.15 : 0.55, ease: "easeOut" }}
                />
              );
            })}
          </motion.g>
        </svg>

        <motion.p
          className="mt-6 text-center font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.15em]"
          initial={false}
          animate={{ opacity: convergeOrHold ? 1 : 0.25, y: convergeOrHold ? 0 : 6 }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
        >
          Neural canvas · motion-ready layout
        </motion.p>
      </div>
    </div>
  );
}
