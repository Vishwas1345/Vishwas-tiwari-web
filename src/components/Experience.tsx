import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Users, Target } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

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
      period: "May 2026 - Present",
      location: "On-site ",
      status: "Active",
      description:
        "AI/ML and Backend Engineer specializing in AI product development, LLM integrations, and backend infrastructure. Experienced in building production-ready AI features, integrating enterprise tools, developing MCP-based AI systems, and optimizing distributed backend flows. Passionate about leveraging AI and scalable engineering practices to improve automation, developer productivity, and software quality.",
      responsibilities: [
        "Developed multiple integrations for TestDino including Slack, GitHub, JIRA, and Claude Web to improve automation and developer assistant and workflows",
        "Built the MCP (Model Context Protocol) infrastructure for TestDino, enabling multiple AI clients to securely interact with TestDino report data and enhance QA automation workflows",
        "Worked on backend architecture improvements including server load balancing, database sharding, and CI/CD pipeline optimization to improve scalability and system reliability",
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
      position: "Data Science Intern",
      company: "Alphabin Technologies",
      period: "August 2025 - April 2026",
      location: "Onsite",
      status: "Completed",
      description:
        "Data Science Intern experienced in Machine Learning, NLP, LLM evaluation, text classification, clustering, and AI workflow automation. Built practical solutions for model testing, error analysis, and process automation using modern AI technologies.",
      responsibilities: [
        "Built LLM testing workflows using Playwright and DeepEval to evaluate AI model accuracy, response structure, and resilience against prompt injection attacks",
        "Developed a text classification and clustering model for automated error grouping from raw Playwright error logs, improving debugging and failure analysis workflows",
        "Created an AI-driven blog publishing pipeline that automated content publishing workflows, reduced manual effort, and improved operational efficiency",
      ],
      companyInfo: {
        industry: "Software testing & QA",
        size: "Mid-size",
        focus: "Quality engineering",
        description:
          "Alphabin Technologies delivers quality assurance and testing services across industries, with emphasis on automation and performance.",
        website: "https://alphabin.co",
      },
      logoSrc: "/lovable-uploads/OIP.jpeg",
      logoAlt: "Alphabin Technologies logo",
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
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                            <img
                              src={item.logoSrc ?? "/placeholder.svg"}
                              alt={item.logoAlt ?? ""}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
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
                            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--glow)/0.6)]" />
                              {r}
                            </li>
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
