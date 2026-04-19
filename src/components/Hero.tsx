import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { downloadResume } from "@/lib/resumeDownload";
import { motion } from "framer-motion";
import { useIntroOptional } from "@/contexts/IntroContext";

/**
 * Same viewport as LandingPlexusCanvas: fixed canvas is the bg for this entire section.
 * Nothing reveals until particles converge → canvas hands off to idle plexus → introComplete flips
 * and this card (name + role + bio + CTAs) animates in as one hero entry — not a separate “intro screen”.
 */
const shell = {
  hidden: { opacity: 0, scale: 0.94, y: 36 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.068,
      delayChildren: 0.14,
    },
  },
};

const row = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

const lettersContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.036,
      delayChildren: 0,
    },
  },
};

const letterItem = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const NAME = "Vishwas Tiwari";

const Hero = () => {
  const { introComplete } = useIntroOptional();

  return (
    <section
      id="hero"
      className="relative z-[2] min-h-[100svh] w-full flex flex-col justify-center px-4 sm:px-6 pt-28 pb-24 md:pb-28 pointer-events-none"
    >
      <div className="relative mx-auto w-full max-w-4xl lg:max-w-5xl">
        <motion.div
          variants={shell}
          initial="hidden"
          animate={introComplete ? "visible" : "hidden"}
          className="pointer-events-auto card-hover px-6 py-10 sm:px-10 md:px-12 md:py-12"
        >
          <motion.h1
            variants={lettersContainer}
            className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-left leading-[1.05] [text-shadow:0_2px_40px_rgba(0,0,0,0.65)] flex flex-wrap"
          >
            {NAME.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                variants={letterItem}
                className={
                  char === " "
                    ? "inline-block w-3 sm:w-4"
                    : "text-gradient inline-block"
                }
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={row}
            className="text-xl md:text-2xl text-primary font-semibold font-display mb-5 text-left [text-shadow:0_1px_24px_rgba(0,0,0,0.5)]"
          >
            <i>AI Engineer & Developer</i>
          </motion.p>
          <motion.p variants={row} className="text-muted-foreground mb-8 text-left max-w-2xl leading-relaxed">
            Hii, I'm an enthusiastic developer specializing in AI and software engineering. I love building intelligent
            solutions that make a difference and am always eager to learn, innovate, and collaborate to solve real-world
            challenges.
          </motion.p>

          <motion.div variants={row} className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" className="group font-label" onClick={() => downloadResume()}>
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group font-label border-white/20 bg-white/[0.04] hover:bg-white/[0.08]"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
              <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </motion.div>
          <motion.div variants={row} className="flex gap-4 mb-2">
            <a
              href="https://github.com/Vishwas1345"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-primary transition hover:border-primary/35 hover:bg-primary/12 hover:scale-105 hover:shadow-[0_0_24px_hsl(var(--glow)/0.25)]"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vishwas-tiwari-74893a300"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-primary transition hover:border-primary/35 hover:bg-primary/12 hover:scale-105 hover:shadow-[0_0_24px_hsl(var(--glow)/0.25)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div variants={row} className="mx-auto mt-8 hidden md:flex justify-center pt-2">
            <button
              type="button"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-muted-foreground transition-colors hover:text-primary bg-black/35 backdrop-blur-md border border-white/10"
              aria-label="Scroll to about"
            >
              <span className="text-[10px] font-label uppercase tracking-[0.2em]">Explore</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
