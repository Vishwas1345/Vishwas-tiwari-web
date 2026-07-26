import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Brain, TrendingUp, Award, Target } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="relative section-band overflow-hidden">
      <div className="section-container">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="section-eyebrow text-left">Profile</p>
            <h2 className="section-title text-left block [&::after]:!w-full [&::after]:!max-w-[min(100%,17.5rem)]">
              About Me
            </h2>
            <p className="section-desc text-left mx-0 mt-4">
              <span className="text-primary font-semibold">AI/ML and backend</span> specialist who adapts across the stack. Building models, automating systems, and connecting technologies to solve real problems.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-stretch gap-6 lg:gap-8">
          <Reveal delay={0.05} className="h-full lg:col-span-1">
            <Card className="card-hover border-0 h-full flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6 md:p-8 text-left">
                <motion.div
                  className="relative mb-5 w-full max-w-[200px]"
                  whileHover={{ scale: 1.03, rotate: -1.5 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div className="rounded-3xl p-[2px] bg-gradient-to-br from-primary/80 to-highlight/45">
                    <div className="rounded-[1.4rem] overflow-hidden bg-card aspect-[4/5] w-full">
                      <img
                        src="/vishwas-portrait.png"
                        alt="Vishwas Tiwari — professional portrait"
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </motion.div>
                <h3 className="text-lg font-display font-bold text-foreground mb-1">Vishwas Tiwari</h3>
                <p className="font-label text-xs uppercase tracking-wider text-primary mb-4">AI Backend Engineer</p>
                <div className="flex flex-wrap justify-start gap-2">
                  {[
                    { icon: <Database className="w-4 h-4" />, cls: "bg-primary/10 text-primary" },
                    { icon: <Brain className="w-4 h-4" />, cls: "bg-highlight/12 text-highlight" },
                    { icon: <TrendingUp className="w-4 h-4" />, cls: "bg-primary/10 text-primary" },
                  ].map((chip, i) => (
                    <motion.span
                      key={i}
                      className={`rounded-xl p-2 ${chip.cls}`}
                      whileHover={{ scale: 1.2, rotate: 8, y: -2 }}
                      transition={{ type: "spring", stiffness: 320, damping: 16 }}
                    >
                      {chip.icon}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="h-full lg:col-span-2">
            <Card className="card-hover border-0 h-full flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Target className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-display font-semibold text-foreground">Personal profile</h3>
                </div>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  <span className="text-primary font-semibold">AI Backend Engineer</span> with a foundation in Data Science and Machine Learning, currently working at the intersection of both. My experience spans backend development, AI/ML system integration, and applied engineering, including training and packaging ML models, building RAG pipelines with embeddings and retrieval, and developing MCP servers for AI-powered platforms.
                </p>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  I've worked on AI-powered test reporting and management tools, an agentic security tool for AI coding assistants. My interests lie in the practical side of AI: taking models and LLM systems from experimentation to production, with an emphasis on reliability, scalability, and real-world usability.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Open for discussions on <span className="text-primary font-semibold">AI/ML engineering, backend engineering, or applied AI development</span>, where I can contribute both technical depth and hands-on system-building experience. Feel free to connect or reach out for any potential opportunities.
                </p>
                <Stagger className="grid grid-cols-2 gap-3 pt-2" interval={0.12}>
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-3 rounded-2xl bg-white/[0.03] px-3 py-3 border border-white/[0.06]"
                      whileHover={{ y: -3, borderColor: "hsl(var(--primary) / 0.3)" }}
                    >
                      <Award className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-medium font-label">Problem solver</span>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-3 rounded-2xl bg-white/[0.03] px-3 py-3 border border-white/[0.06]"
                      whileHover={{ y: -3, borderColor: "hsl(var(--primary) / 0.3)" }}
                    >
                      <Code className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-medium font-label">Tech enthusiast</span>
                    </motion.div>
                  </StaggerItem>
                </Stagger>
              </CardContent>
            </Card>
          </Reveal>

        </div>

        <Reveal delay={0.08}>
          <Card className="card-hover border-0 mt-8">
            <CardContent className="p-8 md:p-10 text-left">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">My mission</h3>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                To leverage data science and machine learning to solve real problems, drive innovation, and
                create measurable impact. I believe in continuous learning, collaborative growth, and using
                technology as a force for positive change.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
