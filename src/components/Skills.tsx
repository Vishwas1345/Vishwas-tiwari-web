import { Card, CardContent } from "@/components/ui/card";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiGithub,
  SiJupyter,
  SiGooglecolab,
  SiMysql,
  SiMongodb,
  SiGoogle,
  SiOpenai,
  SiGithubactions,
} from "react-icons/si";
import { DiCss3, DiJava } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";
import { FaFileExcel, FaFileWord, FaFilePowerpoint } from "react-icons/fa";
import { FaChartLine, FaChartBar } from "react-icons/fa6";
import {
  Lightbulb,
  Search,
  MessageCircle,
  Users,
  Sparkles,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

const iconBase = "h-5 w-5 shrink-0";

interface SkillProps {
  name: string;
  icon: React.ReactNode;
  category?: string;
}

type SkillBlock = {
  title: string;
  skills: SkillProps[];
};

const SkillItem = ({ name, icon, category }: SkillProps) => {
  return (
    <div className="mb-5 group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center min-w-0">
          <motion.div
            className="mr-3 flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15 group-hover:shadow-[0_0_20px_hsl(var(--glow)/0.2)] [&_svg]:overflow-visible"
            whileHover={{ scale: 1.18, rotate: -6 }}
            transition={{ type: "spring", stiffness: 340, damping: 15 }}
          >
            {icon}
          </motion.div>
          <div className="min-w-0">
            <span className="font-medium text-foreground group-hover:text-primary transition-colors block truncate">
              {name}
            </span>
            {category && <div className="text-xs text-muted-foreground font-label mt-0.5">{category}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

const Skills = () => {
  const programmingLanguages = [
    {
      name: "Python",
      icon: <SiPython className={iconBase} aria-hidden />,
      category: "Primary language",
    },
    {
      name: "Java",
      icon: <DiJava className="h-5 w-5" aria-hidden />,
      category: "Object-oriented",
    },
    {
      name: "HTML/CSS",
      icon: (
        <span className="flex items-center gap-0.5" aria-hidden>
          <SiHtml5 className="h-5 w-5 text-[#E34F26]" title="HTML5" />
        </span>
      ),
      category: "Web",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className={`${iconBase} text-[#F7DF1E]`} aria-hidden />,
      category: "Frontend",
    },
  ];

  const dataScienceTools = [
    {
      name: "Pandas",
      icon: <SiPandas className={`${iconBase} text-[#150458]`} aria-hidden />,
      category: "Data handling",
    },
    {
      name: "NumPy",
      icon: <SiNumpy className={`${iconBase} text-[#4DABCF]`} aria-hidden />,
      category: "Numerical computing",
    },
    {
      name: "Matplotlib",
      icon: <FaChartLine className={`${iconBase} text-[#11557C]`} aria-hidden />,
      category: "Visualization",
    },
    {
      name: "Seaborn",
      icon: <FaChartBar className={`${iconBase} text-[#4C72B0]`} aria-hidden />,
      category: "Visualization",
    },
    {
      name: "Scikit-learn",
      icon: <SiScikitlearn className={`${iconBase} text-[#F89939]`} aria-hidden />,
      category: "Machine learning",
    },
  ];

  const developmentTools = [
    {
      name: "Git & GitHub",
      icon: (
        <span className="flex items-center gap-0.5" aria-hidden>
          <SiGithub className="h-5 w-5 text-foreground" title="GitHub" />
        </span>
      ),
      category: "Version control",
    },
    {
      name: "VS Code",
      icon: <VscVscode className={`${iconBase} text-[#23A9F2]`} aria-hidden />,
      category: "IDE",
    },
    {
      name: "Jupyter Lab",
      icon: <SiJupyter className={`${iconBase} text-[#F37626]`} aria-hidden />,
      category: "Analysis",
    },
    {
      name: "Google Colab",
      icon: <SiGooglecolab className={`${iconBase} text-[#F9AB00]`} aria-hidden />,
      category: "ML notebooks",
    },
    {
      name: "CI/CD Pipelines",
      icon: <SiGithubactions className={`${iconBase} text-[#2088FF]`} aria-hidden />,
      category: "Automation",
    },
  ];

  const officeSkills = [
    {
      name: "MS Excel",
      icon: <FaFileExcel className={`${iconBase} text-[#217346]`} aria-hidden />,
      category: "Spreadsheets",
    },
    {
      name: "MS Word",
      icon: <FaFileWord className={`${iconBase} text-[#2B579A]`} aria-hidden />,
      category: "Docs",
    },
    {
      name: "MS PowerPoint",
      icon: <FaFilePowerpoint className={`${iconBase} text-[#D24726]`} aria-hidden />,
      category: "Decks",
    },
    {
      name: "Google Workspace",
      icon: (
        <span className="flex items-center gap-0.5" aria-hidden>
          <SiGoogle className="h-5 w-5 text-[#4285F4]" title="Google" />
        </span>
      ),
      category: "Cloud",
    },
  ];

  const databaseSkills = [
    {
      name: "MySQL",
      icon: <SiMysql className={`${iconBase} text-[#4479A1]`} aria-hidden />,
      category: "Relational DB",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className={`${iconBase} text-[#47A248]`} aria-hidden />,
      category: "NoSQL document DB",
    },
  ];

  const softSkills = [
    {
      name: "Problem solving",
      icon: <Lightbulb className={iconBase} aria-hidden />,
      category: "Analytical",
    },
    {
      name: "Research & insights",
      icon: <Search className={iconBase} aria-hidden />,
      category: "Research",
    },
    {
      name: "Communication",
      icon: <MessageCircle className={iconBase} aria-hidden />,
      category: "Interpersonal",
    },
    {
      name: "Team collaboration",
      icon: <Users className={iconBase} aria-hidden />,
      category: "Leadership",
    },
    {
      name: "Leveraging AI",
      icon: <SiOpenai className={`${iconBase} text-foreground`} aria-hidden />,
      category: "Implementation",
    },
  ];

  const blocks: SkillBlock[] = [
    {
      title: "Languages",
      skills: programmingLanguages,
    },
    {
      title: "Data science",
      skills: dataScienceTools,
    },
    {
      title: "Development tools",
      skills: developmentTools,
    },
    {
      title: "Office & productivity",
      skills: officeSkills,
    },
    {
      title: "Databases",
      skills: databaseSkills,
    },
    {
      title: "Soft skills",
      skills: softSkills,
    },
  ];

  return (
    <section id="skills" className="relative section-band-alt overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow text-left">Capabilities</p>
          <h2 className="section-title text-left block">Technical expertise</h2>
          <p className="section-desc text-left mx-0 mb-14">
            Tools and strengths I use to ship analysis, models, and interfaces end-to-end.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block, blockIndex) => (
            <Reveal key={block.title} delay={0.06 * blockIndex}>
              <Card className="card-hover border-0 h-full floating-animation" style={{ animationDelay: `${blockIndex * 0.15}s` }}>
                <CardContent className="p-7">
                  <h3 className="mb-6 text-lg font-display font-semibold text-foreground">{block.title}</h3>
                  <Stagger interval={0.06} delay={0.1}>
                    {block.skills.map((skill, index) => (
                      <StaggerItem key={`${skill.name}-${index}`}>
                        <SkillItem
                          name={skill.name}
                          icon={skill.icon}
                          category={skill.category}
                        />
                      </StaggerItem>
                    ))}
                  </Stagger>
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
