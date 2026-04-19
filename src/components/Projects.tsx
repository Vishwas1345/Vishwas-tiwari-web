import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BarChart3, Globe, Brain, Database, TrendingUp, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  icon: React.ReactNode;
  category: string;
  className?: string;
}

const ProjectCard = ({ title, description, tags, imageUrl, icon, category, className }: ProjectCardProps) => {
  return (
    <Card
      className={cn(
        "card-hover border-0 h-full flex flex-col overflow-hidden group min-h-[280px]",
        className
      )}
    >
      <div className="absolute top-4 right-4 z-10">
        <div className="rounded-xl border border-primary/25 bg-black/45 p-2 text-primary backdrop-blur-md">{icon}</div>
      </div>

      <div className="relative h-44 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent opacity-95" />
        <div className="absolute bottom-3 left-4">
          <Badge variant="secondary" className="font-label text-[10px] uppercase tracking-wider bg-black/40 text-white border-white/10">
            {category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-display font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">{description}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] font-label border-white/12 text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Super Store's Superb Analytics",
      description:
        "End-to-end retail analytics: sales patterns, customer behavior, and regional trends with actionable recommendations.",
      tags: ["Python", "Pandas", "Seaborn", "BI"],
      imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <TrendingUp className="w-5 h-5" />,
      category: "Analytics",
    },
    {
      title: "Email Sender Pro",
      description: "Bulk and individual email workflows with live progress tracking for campaigns and newsletters.",
      tags: ["Python", "Automation", "GUI"],
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Mail className="w-5 h-5" />,
      category: "Automation",
    },
    {
      title: "Portfolio Website Pro",
      description: "Modern portfolio with responsive layout, motion, and performance-minded structure.",
      tags: ["React", "TypeScript", "Tailwind"],
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Globe className="w-5 h-5" />,
      category: "Web",
    },
    {
      title: "Titanic Survival Prediction",
      description: "ML pipeline with feature engineering; strong accuracy using scikit-learn and TensorFlow workflows.",
      tags: ["Python", "Scikit-learn", "TensorFlow"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Brain className="w-5 h-5" />,
      category: "ML",
    },
    {
      title: "AI ChatBot",
      description: "Gemini-powered assistant with streaming responses and a Streamlit interface.",
      tags: ["Python", "Gemini", "Streamlit"],
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <Brain className="w-5 h-5" />,
      category: "AI",
    },
    {
      title: "Cafe Menu Analytics",
      description: "Café billing analysis: top sellers, revenue trends, and category performance.",
      tags: ["Python", "Pandas", "Matplotlib"],
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&h=500&q=80",
      icon: <BarChart3 className="w-5 h-5" />,
      category: "Analytics",
    },
  ];

  return (
    <section id="projects" className="relative section-band overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow text-center">Selected work</p>
          <h2 className="section-title text-center mx-auto block">Projects</h2>
          <p className="section-desc text-center mx-auto mb-14">
            Bento-style showcase — dive deeper on the full portfolio page.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(260px,auto)]">
          <Reveal className="md:col-span-2 md:row-span-2" delay={0.05}>
            <ProjectCard {...projects[0]} className="md:min-h-[520px]" />
          </Reveal>
          <Reveal delay={0.08}>
            <ProjectCard {...projects[1]} />
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectCard {...projects[2]} />
          </Reveal>
          <Reveal className="lg:col-span-2" delay={0.12}>
            <ProjectCard {...projects[3]} />
          </Reveal>
          <Reveal delay={0.14}>
            <ProjectCard {...projects[4]} />
          </Reveal>
          <Reveal delay={0.16}>
            <ProjectCard {...projects[5]} />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <Card className="card-hover border-0 max-w-lg w-full">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-display font-semibold mb-2">Want the full gallery?</h3>
                <p className="text-muted-foreground text-sm mb-6">Extended case studies and more builds on the portfolio route.</p>
                <Button className="font-label gap-2" onClick={() => (window.location.href = "/portfolio")}>
                  <ExternalLink className="w-4 h-4" />
                  Open full portfolio
                </Button>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
