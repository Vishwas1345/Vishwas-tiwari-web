import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Coffee,
  Database,
  BarChart,
  LineChart,
  Cpu,
  BookOpen,
  FileSpreadsheet,
  FileText,
  FileImage,
  FileCode,
  Globe,
  GitBranch,
  Cloud,
  Terminal,
  OmegaIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface SkillProps {
  name: string;
  icon: React.ReactNode;
  category?: string;
  level?: number;
}

const SkillItem = ({ name, icon, category, level }: SkillProps) => {
  return (
    <div className="mb-5 group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center min-w-0">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15 group-hover:shadow-[0_0_20px_hsl(var(--glow)/0.2)]">
            {icon}
          </div>
          <div className="min-w-0">
            <span className="font-medium text-foreground group-hover:text-primary transition-colors block truncate">
              {name}
            </span>
            {category && <div className="text-xs text-muted-foreground font-label mt-0.5">{category}</div>}
          </div>
        </div>
      </div>
      {level != null && (
        <div className="skill-bar">
          <div className="skill-progress transition-all duration-700" style={{ width: `${level}%` }} />
        </div>
      )}
    </div>
  );
};

const Skills = () => {
  const programmingLanguages = [
    { name: "Python", icon: <Code className="w-5 h-5" />, category: "Primary language" },
    { name: "Java", icon: <Coffee className="w-5 h-5" />, category: "Object-oriented" },
    { name: "HTML/CSS", icon: <FileCode className="w-5 h-5" />, category: "Web" },
    { name: "JavaScript", icon: <Globe className="w-5 h-5" />, category: "Frontend" },
  ];

  const dataScienceTools = [
    { name: "Pandas", level: 85, icon: <Database className="w-5 h-5" />, category: "Data handling" },
    { name: "NumPy", level: 80, icon: <BarChart className="w-5 h-5" />, category: "Numerical computing" },
    { name: "Matplotlib", level: 60, icon: <LineChart className="w-5 h-5" />, category: "Visualization" },
    { name: "Seaborn", level: 65, icon: <LineChart className="w-5 h-5" />, category: "Visualization" },
    { name: "Scikit-learn", level: 75, icon: <Cpu className="w-5 h-5" />, category: "Machine learning" },
  ];

  const developmentTools = [
    { name: "Git & GitHub", level: 70, icon: <GitBranch className="w-5 h-5" />, category: "Version control" },
    { name: "VS Code", level: 60, icon: <Terminal className="w-5 h-5" />, category: "IDE" },
    { name: "Jupyter Lab", level: 85, icon: <BookOpen className="w-5 h-5" />, category: "Analysis" },
    { name: "Google Colab", level: 85, icon: <OmegaIcon className="w-5 h-5" />, category: "ML notebooks" },
    { name: "Cursor", level: 80, icon: <Terminal className="w-5 h-5" />, category: "AI editor" },
  ];

  const officeSkills = [
    { name: "MS Excel", level: 90, icon: <FileSpreadsheet className="w-5 h-5" />, category: "Spreadsheets" },
    { name: "MS Word", level: 90, icon: <FileText className="w-5 h-5" />, category: "Docs" },
    { name: "MS PowerPoint", level: 60, icon: <FileImage className="w-5 h-5" />, category: "Decks" },
    { name: "Google Workspace", level: 80, icon: <Cloud className="w-5 h-5" />, category: "Cloud" },
  ];

  const databaseSkills = [
    { name: "MySQL", level: 60, icon: <Database className="w-5 h-5" />, category: "Relational DB" },
  ];

  const softSkills = [
    { name: "Problem solving", level: 85, icon: <Cloud className="w-5 h-5" />, category: "Analytical" },
    { name: "Research & insights", level: 80, icon: <BarChart className="w-5 h-5" />, category: "Research" },
    { name: "Communication", level: 75, icon: <Globe className="w-5 h-5" />, category: "Interpersonal" },
    { name: "Team collaboration", level: 80, icon: <GitBranch className="w-5 h-5" />, category: "Leadership" },
    { name: "Leveraging AI", level: 95, icon: <Cpu className="w-5 h-5" />, category: "Implementation" },
  ];

  const blocks = [
    {
      title: "Languages",
      accent: "from-primary to-highlight",
      dot: "chip-dot-cyan" as const,
      skills: programmingLanguages,
    },
    {
      title: "Data science",
      accent: "from-highlight to-primary/65",
      dot: "chip-dot-blue" as const,
      skills: dataScienceTools,
    },
    {
      title: "Development tools",
      accent: "from-primary/85 to-highlight-deep",
      dot: "chip-dot-cyan" as const,
      skills: developmentTools,
    },
    {
      title: "Office & productivity",
      accent: "from-highlight-deep to-primary/55",
      dot: "chip-dot-blue" as const,
      skills: officeSkills,
    },
    {
      title: "Databases",
      accent: "from-primary to-highlight/90",
      dot: "chip-dot-cyan" as const,
      skills: databaseSkills,
    },
    {
      title: "Soft skills",
      accent: "from-highlight to-primary",
      dot: "chip-dot-blue" as const,
      skills: softSkills,
    },
  ];

  return (
    <section id="skills" className="relative section-band-alt overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow text-center">Capabilities</p>
          <h2 className="section-title text-center mx-auto block">Technical expertise</h2>
          <p className="section-desc text-center mx-auto mb-14">
            Tools and strengths I use to ship analysis, models, and interfaces end-to-end.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block, blockIndex) => (
            <Reveal key={block.title} delay={0.06 * blockIndex}>
              <Card className="card-hover border-0 h-full floating-animation" style={{ animationDelay: `${blockIndex * 0.15}s` }}>
                <CardContent className="p-7">
                  <div className="flex items-center mb-6">
                    <div className={`h-9 w-1 rounded-full bg-gradient-to-b ${block.accent} mr-4 shadow-[0_0_12px_hsl(var(--glow)/0.35)]`} />
                    <h3 className={`flex items-center gap-2 text-lg font-display font-semibold ${block.dot}`}>
                      {block.title}
                    </h3>
                  </div>
                  {block.skills.map((skill, index) => (
                    <SkillItem
                      key={`${skill.name}-${index}`}
                      name={skill.name}
                      icon={skill.icon}
                      category={skill.category}
                      level={"level" in skill ? skill.level : undefined}
                    />
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
