import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Users, Target, Award, Code } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const Experience = () => {
  const experienceData = [
    {
      position: "Data Science Intern",
      company: "Alphabin Technologies",
      period: "August 2025 - Present",
      location: "Onsite",
      status: "Active",
      description:
        "Hands-on data science and analytics at a service-based QA company — from exploratory analysis to stakeholder-ready reporting.",
      responsibilities: [
        "Analyzing datasets to extract meaningful insights and patterns",
        "Creating data visualizations and reports for stakeholders",
        "Collaborating with cross-functional teams on data-driven solutions",
        "Working with testing data to improve software quality metrics",
      ],
      technologies: [
        "Python",
        "JavaScript",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Matplotlib",
        "Seaborn",
        "Jupyter",
        "SQL",
        "Excel",
      ],
      achievements: [
        "Contributed to TestDino, an AI-driven software test reporting tool",
        "Built interactive dashboards for real-time monitoring",
      ],
      companyInfo: {
        industry: "Software testing & QA",
        size: "Mid-size",
        focus: "Quality engineering",
        description:
          "Alphabin Technologies delivers quality assurance and testing services across industries, with emphasis on automation and performance.",
      },
    },
  ];

  return (
    <section id="experience" className="relative section-band overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow text-center">Work</p>
          <h2 className="section-title text-center mx-auto block">Professional experience</h2>
          <p className="section-desc text-center mx-auto mb-14">
            Real roles, real datasets, and shipping value with teams.
          </p>
        </Reveal>

        <div className="mt-4 max-w-4xl mx-auto">
          <div className="relative timeline-rail pl-8 md:pl-10 ml-2 md:ml-4">
            {experienceData.map((item, index) => (
              <Reveal key={index} delay={0.08}>
                <div className="mb-12 relative group">
                  <div className="absolute -left-[2.15rem] md:-left-[2.6rem] top-2 flex h-9 w-9 items-center justify-center rounded-2xl border-2 border-background bg-gradient-to-br from-primary to-[hsl(207,100%,45%)] shadow-[0_0_20px_hsl(var(--glow)/0.35)] transition-transform group-hover:scale-110">
                    <Building2 className="w-4 h-4 text-primary-foreground" />
                  </div>

                  <Card className="card-hover border-0">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div className="flex gap-4 min-w-0">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                            <img
                              src="/placeholder.svg"
                              alt=""
                              className="h-full w-full object-cover opacity-80"
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
                          href="https://alphabin.co"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-cyan text-sm font-medium"
                        >
                          alphabin.co
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

                      <div className="mb-6">
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

                      <div className="mb-6">
                        <h4 className="text-base font-display font-semibold mb-3 flex items-center gap-2">
                          <Code className="w-5 h-5 text-primary" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="font-label text-xs bg-white/5 border border-white/10">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-display font-semibold mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {item.achievements.map((a, i) => (
                            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(207,100%,60%)]" />
                              {a}
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
