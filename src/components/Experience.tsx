import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Users, Target } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

type ExperienceEntry = {
  position: string;
  company: string;
  period: string;
  location: string;
  status: string;
  description: string;
  responsibilities: string[];
  companyInfo: {
    industry: string;
    size: string;
    focus: string;
    description: string;
    website: string;
  };
  logoSrc?: string;
  logoAlt?: string;
};

const Experience = () => {
  const experienceData: ExperienceEntry[] = [
    {
      position: "AI/ML & Backend Engineer",
      company: "TestDino",
      period: "Aug 2025 - Present",
      location: "On-site",
      status: "Active",
      description:
        "Building and shipping production software for TestDino, a cloud companion for the Playwright testing framework. Specializing in AI-powered QA tooling, MCP server infrastructure, and backend engineering. Focused on turning emerging AI capabilities into reliable, practical features that deliver real-world value for development teams.",
      responsibilities: [
        "Built the MCP server that lets AI clients (Claude, Cursor) securely query test report data, now used by most of the TestDino users, and shipped 5+ integrations including Slack, GitHub, Jira, Linear, and Claude Web to streamline QA workflows",
        "Drove backend improvements across infrastructure migration, monolith-to-microservice extraction, horizontal scaling, and CI/CD optimization, resolving 100+ Jira tickets and merging 250+ PRs",
        "Built an ML text classifier that sorts raw Playwright error logs into 5+ failure categories to speed up debugging, plus an AI-driven blog publishing pipeline that automated content workflows",
      ],
      companyInfo: {
        industry: "AI-powered QA & Testing",
        size: "Startup",
        focus: "AI automation for software testing",
        description:
          "TestDino is an AI-driven software test reporting and automation platform that helps development teams improve software quality through intelligent test analysis and automation.",
        website: "https://testdino.com",
      },
      logoSrc: "/Resume/download (1).png",
      logoAlt: "TestDino logo",
    },
    {
      position: "AI Engineer",
      company: "DotSquare AI",
      period: "May 2024 - July 2025",
      location: "Remote",
      status: "Completed",
      description:
        "AI Engineer focused on enterprise AI engineering, working across 4+ AI projects integrating LLM-powered applications using Hugging Face models and external APIs. Built production conversational AI systems and designed intelligent automation workflows for real-world business processes.",
      responsibilities: [
        "Worked across 4+ AI projects, integrating LLM-powered applications using Hugging Face models and external APIs",
        "Developed conversational AI chatbots for pharmacy brands, enabling customer interactions through context-aware, LLM-generated responses",
        "Designed n8n automation workflows integrating LLMs to automate manual, repetitive business processes",
      ],
      companyInfo: {
        industry: "Enterprise AI engineering",
        size: "Startup",
        focus: "LLM-powered product development",
        description:
          "DotSquare AI specializes in enterprise AI engineering, building LLM-powered applications and intelligent automation solutions for businesses across industries.",
        website: "https://dotsquareai.com",
      },
      logoSrc: "/images/logo.svg",
      logoAlt: "DotSquare AI logo",
    },
  ];

  return (
    <section id="experience" className="relative section-band overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow text-left">Work</p>
          <h2 className="section-title text-left block">Professional experience</h2>
          <p className="section-desc text-left mx-0 mb-14">
            Real roles, real datasets, and shipping value with teams.
          </p>
        </Reveal>

        <div className="mt-4 max-w-4xl mx-auto">
          <div className="relative md:timeline-rail md:pl-10 md:ml-4">
            {experienceData.map((item, index) => (
              <Reveal key={index} delay={0.08}>
                <div className="mb-12 relative group">
                  {/* Mobile: centered timeline */}
                  <div className="md:hidden flex flex-col items-center">
      
                    {index < experienceData.length - 1 && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-highlight/35" />
                    )}
                  </div>

                  {/* Desktop: left-aligned timeline */}
                     

                  <Card className="card-hover border-0">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div className="flex gap-4 min-w-0">
                          <motion.div
                            className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                            whileHover={{ scale: 1.1, rotate: 3 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                          >
                            <img
                              src={item.logoSrc ?? "/placeholder.svg"}
                              alt={item.logoAlt ?? ""}
                              className="h-full w-full object-cover object-center"
                            />
                          </motion.div>
                          <div className="min-w-0">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
                              {item.position}
                            </h3>
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                              <Building2 className="w-4 h-4 text-primary shrink-0" />
                              {item.company}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="w-4 h-4 mr-1 shrink-0" />
                              {item.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <Badge className="font-label">{item.status}</Badge>
                          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-primary border border-primary/25 rounded-full px-3 py-1.5 bg-primary/5">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.period}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 md:p-5">
                        <h4 className="text-base font-display font-semibold mb-2 flex items-center gap-2">
                          <Target className="w-5 h-5 text-primary" />
                          About {item.company}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">{item.companyInfo.description}</p>
                        <a
                          href={item.companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-cyan text-sm font-medium"
                        >
                          {item.companyInfo.website.replace('https://', '')}
                        </a>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="text-[10px] font-label border-white/15">
                            {item.companyInfo.industry}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] font-label border-white/15">
                            {item.companyInfo.size}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>

                      <div>
                        <h4 className="text-base font-display font-semibold mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Key responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {item.responsibilities.map((r, i) => (
                            <motion.li
                              key={i}
                              className="flex gap-3 text-sm text-muted-foreground"
                              initial={{ opacity: 0, x: -18 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{ delay: 0.1 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--glow)/0.6)]" />
                              {r}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
