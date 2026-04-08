import { motion } from "framer-motion";
import { NEURAL_LINES, NEURAL_NODES, NEURAL_VIEW } from "@/lib/neuralCanvasLayout";

/** Hero neural canvas — same graph as intro convergence (8 nodes, hub, partial mesh + ray). */
export function NeuralOrb() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] select-none">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-[hsl(207,100%,70%)]/15 blur-3xl neural-pulse" />
      <motion.svg
        viewBox={`0 0 ${NEURAL_VIEW} ${NEURAL_VIEW}`}
        className="relative z-10 h-full w-full text-primary"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <defs>
          <linearGradient id="orb-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(207 100% 70%)" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="orb-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#orb-glow)" />
        {NEURAL_LINES.map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#orb-line)"
            strokeWidth={i === NEURAL_LINES.length - 1 ? 1 : 1.2}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === NEURAL_LINES.length - 1 ? 0.4 : 0.48 }}
            transition={{ duration: 0.75, delay: 0.15 + i * 0.06 }}
          />
        ))}
        {NEURAL_NODES.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="hsl(var(--primary))"
            fillOpacity={node.id === 3 ? 0.95 : 0.7}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.35 + i * 0.05 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
