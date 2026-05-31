import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Brain, TrendingUp, Award, Target } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

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
                <div className="relative mb-5 w-full max-w-[200px]">
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
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-1">Vishwas Tiwari</h3>
                <p className="font-label text-xs uppercase tracking-wider text-primary mb-4">AI/ML and Backend developer</p>
                <div className="flex flex-wrap justify-start gap-2">
                  <span className="rounded-xl bg-primary/10 p-2 text-primary">
                    <Database className="w-4 h-4" />
                  </span>
                  <span className="rounded-xl bg-highlight/12 p-2 text-highlight">
                    <Brain className="w-4 h-4" />
                  </span>
                  <span className="rounded-xl bg-primary/10 p-2 text-primary">
                    <TrendingUp className="w-4 h-4" />
                  </span>
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
                  I specialize in <span className="text-primary font-semibold">AI/ML and backend</span> development, but I don't limit myself to one domain. My work spans building AI models, designing scalable backend systems, automating testing and deployment pipelines, experimenting with NLP, and integrating diverse technologies. I believe adaptability and continuous learning matter more than narrow specialization in today's fast-evolving tech landscape.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Currently pursuing a Bachelor&apos;s in Computer Applications (BCA) at Bhagwan Mahavir
                  University, I complement academic learning with hands-on projects across AI, backend engineering, QA automation, and DevOps. Always exploring, building, and turning ideas into working solutions.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] px-3 py-3 border border-white/[0.06]">
                    <Award className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium font-label">Problem solver</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] px-3 py-3 border border-white/[0.06]">
                    <Code className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium font-label">Tech enthusiast</span>
                  </div>
                </div>
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
