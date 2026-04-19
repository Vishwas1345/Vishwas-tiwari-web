import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { downloadResume } from "@/lib/resumeDownload";
import { NeuralOrb } from "@/components/NeuralOrb";
import { motion } from "framer-motion";
import { useIntroOptional } from "@/contexts/IntroContext";

const container = {
  hidden: { opacity: 0, pointerEvents: "none" as const },
  visible: {
    opacity: 1,
    pointerEvents: "auto" as const,
    transition: { staggerChildren: 0.09, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  const { introComplete } = useIntroOptional();

  return (
    <section className="min-h-screen flex items-center relative bg-gradient overflow-hidden pt-24 pb-16 md:pt-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] h-72 w-72 rounded-full bg-primary/[0.07] blur-[100px] neural-pulse" />
        <div className="absolute bottom-1/4 right-[5%] h-96 w-96 rounded-full bg-highlight-deep/[0.09] blur-[120px] neural-pulse" style={{ animationDelay: "1.2s" }} />
      </div>

      <div className="section-container w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            variants={container}
            initial="hidden"
            animate={introComplete ? "visible" : "hidden"}
          >
            
            <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-4 text-left leading-[1.05]">
              <span className="text-gradient">Vishwas Tiwari</span>
            </motion.h1>
            <motion.p variants={item} className="text-xl md:text-2xl text-primary font-semibold font-display mb-5 text-left">
              <i>AI Engineer & Developer</i>
            </motion.p>
            <motion.p variants={item} className="text-muted-foreground mb-7 text-left max-w-2xl">
              Hii, I'm an enthusiastic developer specializing in AI and software engineering. I love building intelligent solutions that make a difference and am always eager to learn, innovate, and collaborate to solve real-world challenges. 
            </motion.p>
       
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" className="group font-label" onClick={() => downloadResume()}>
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group font-label"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
                <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </motion.div>
            <motion.div variants={item} className="flex gap-4">
              <a
                href="https://github.com/Vishwas1345"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary transition hover:border-primary/30 hover:bg-primary/10 hover:scale-105 hover:shadow-[0_0_24px_hsl(var(--glow)/0.25)]"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/vishwas-tiwari-74893a300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary transition hover:border-primary/30 hover:bg-primary/10 hover:scale-105 hover:shadow-[0_0_24px_hsl(var(--glow)/0.25)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            variants={container}
            initial="hidden"
            animate={introComplete ? "visible" : "hidden"}
          >
            <div className="glass-card w-full max-w-md lg:max-w-none py-10">
              <NeuralOrb />
              <p className="mt-8 text-center font-label text-xs text-muted-foreground tracking-[0.15em] uppercase">
                Neural canvas · motion-ready layout
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: -8 }}
          animate={
            introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }
          }
          transition={{ delay: introComplete ? 1.1 : 0, duration: 0.6 }}
        >
          <button
            type="button"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to about"
          >
            <span className="text-[10px] font-label uppercase tracking-[0.2em]">Explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
