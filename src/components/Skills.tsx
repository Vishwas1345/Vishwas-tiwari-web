
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Coffee, 
  Database,
  BarChart,
  LineChart,
  BrainCircuit,
  BookOpen,
  FileSpreadsheet,
  FileText,
  FileImage,
  FileCode,
  Globe,
  Cpu,
  Zap,
  Palette,
  GitBranch,
  Cloud,
  Shield,
  Layers,
  Terminal,
  Smartphone,
  Monitor,
  OmegaIcon
} from 'lucide-react';

interface SkillProps {
  name: string;
  level: number | string;
  icon: React.ReactNode;
  category?: string;
}

const SkillItem = ({ name, level, icon, category }: SkillProps) => {
  const displayLevel = typeof level === 'number' ? `${level}%` : level;
  const progressWidth = typeof level === 'number' ? level : 0;
  
  return (
    <div className="mb-6 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="mr-3 p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            {icon}
          </div>
          <div>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">{name}</span>
            {category && (
              <div className="text-xs text-muted-foreground">{category}</div>
            )}
          </div>
        </div>
        <span className="text-sm text-muted-foreground font-semibold">{displayLevel}</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress transition-all duration-1000 ease-out" 
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const programmingLanguages = [
    { name: "Python", icon: <Code className="w-5 h-5 text-primary" />, category: "Primary Language" },
    { name: "Java", icon: <Coffee className="w-5 h-5 text-primary" />, category: "Object-Oriented" },
    { name: "HTML/CSS", icon: <FileCode className="w-5 h-5 text-primary" />, category: "Web Development" },
    { name: "JavaScript", icon: <Globe className="w-5 h-5 text-primary" />, category: "Frontend" },
  ];

  const dataScienceTools = [
    { name: "Pandas", level: 85, icon: <Database className="w-5 h-5 text-blue-400" />, category: "Data Handling" },
    { name: "NumPy", level: 80, icon: <BarChart className="w-5 h-5 text-blue-400" />, category: "Numerical Computing" },
    { name: "Matplotlib", level: 60, icon: <LineChart className="w-5 h-5 text-blue-400" />, category: "Data Visualization" },
    { name: "Seaborn", level: 65, icon: <Palette className="w-5 h-5 text-blue-400" />, category: "Data Visualization" },
    { name: "Sci-kit learn", level: 75, icon: <Cpu className="w-5 h-5 text-blue-400" />, category: "Machine Learning" }
  ];

  const developmentTools = [
    { name: "Git & GitHub", level: 70, icon: <GitBranch className="w-5 h-5 text-purple-400" />, category: "Version Control" },
    { name: "VS Code", level: 60, icon: <Terminal className="w-5 h-5 text-purple-400" />, category: "IDE" },
    { name: "Jupyter Lab", level: 85, icon: <BookOpen className="w-5 h-5 text-purple-400" />, category: "Data Analysis" },
    { name: "Google colab", level: 85, icon: <OmegaIcon className="w-5 h-5 text-purple-400" />, category: "Machine Learning" },
    { name: "Cursor", level: 80, icon: <Terminal className="w-5 h-5 text-purple-400" />, category: "AI Code Editor" },
  ];

  const officeSkills = [
    { name: "MS Excel", level: 90, icon: <FileSpreadsheet className="w-5 h-5 text-orange-400" />, category: "Spreadsheets" },
    { name: "MS Word", level: 90, icon: <FileText className="w-5 h-5 text-orange-400" />, category: "Documentation" },
    { name: "MS PowerPoint", level: 60, icon: <FileImage className="w-5 h-5 text-orange-400" />, category: "Presentations" },
    { name: "Google Workspace", level: 80, icon: <Cloud className="w-5 h-5 text-orange-400" />, category: "Cloud Tools" },
  ];

  const databaseSkills = [
    { name: "MySQL", level: 60, icon: <Database className="w-5 h-5 text-green-400" />, category: "Relational Database" },
  ];

  const softSkills = [
    { name: "Problem Solving", level: 85, icon: <Cloud className="w-5 h-5 text-cyan-400" />, category: "Analytical" },
    { name: "Insights", level: 80, icon: <BarChart className="w-5 h-5 text-cyan-400" />, category: "Research" },
    { name: "Communication", level: 75, icon: <Globe className="w-5 h-5 text-cyan-400" />, category: "Interpersonal" },
    { name: "Team Collaboration", level: 80, icon: <GitBranch className="w-5 h-5 text-cyan-400" />, category: "Leadership" },
    { name: "Leveraging AI", level: 95, icon: <Cpu className="w-5 h-5 text-cyan-400" />, category: "AI implementation" },
  ];

  return (
    <section id="skills" className="bg-gradient relative overflow-hidden">
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-cyan-400/20 rounded-full animate-bounce"></div>
      </div>

      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A comprehensive collection of my technical skills, tools, and competencies 
            that enable me to deliver innovative solutions and drive data-informed decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Programming Languages */}
          <Card className="card-hover glass-effect floating-animation">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-400 rounded-full mr-4"></div>
                <h3 className="text-xl font-semibold text-gradient">Programming Languages</h3>
              </div>
              {programmingLanguages.map((skill, index) => (
                <SkillItem key={index} name={skill.name} level={skill.level} icon={skill.icon} category={skill.category} />
              ))}
            </CardContent>
          </Card>

          {/* Data Science Tools */}
          <Card className="card-hover glass-effect floating-animation" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-4"></div>
                <h3 className="text-xl font-semibold text-gradient">Data Science Tools</h3>
              </div>
              {dataScienceTools.map((skill, index) => (
                <SkillItem key={index} name={skill.name} level={skill.level} icon={skill.icon} category={skill.category} />
              ))}
            </CardContent>
          </Card>

          {/* Development Tools */}
          <Card className="card-hover glass-effect floating-animation" style={{ animationDelay: '1s' }}>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-4"></div>
                <h3 className="text-xl font-semibold text-gradient">Development Tools</h3>
              </div>
              {developmentTools.map((skill, index) => (
                <SkillItem key={index} name={skill.name} level={skill.level} icon={skill.icon} category={skill.category} />
              ))}
            </CardContent>
          </Card>

          {/* Office Skills */}
          <Card className="card-hover glass-effect floating-animation" style={{ animationDelay: '1.5s' }}>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mr-4"></div>
                <h3 className="text-xl font-semibold text-gradient">Office & Productivity</h3>
              </div>
              {officeSkills.map((skill, index) => (
                <SkillItem key={index} name={skill.name} level={skill.level} icon={skill.icon} category={skill.category} />
              ))}
            </CardContent>
          </Card>

          {/* Database Skills */}
          <Card className="card-hover glass-effect floating-animation" style={{ animationDelay: '2s' }}>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full mr-4"></div>
                <h3 className="text-xl font-semibold text-gradient">Database Skills</h3>
              </div>
              {databaseSkills.map((skill, index) => (
                <SkillItem key={index} name={skill.name} level={skill.level} icon={skill.icon} category={skill.category} />
              ))}
            </CardContent>
          </Card>

          {/* Soft Skills */}
          <Card className="card-hover glass-effect floating-animation" style={{ animationDelay: '2.5s' }}>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full mr-4"></div>
                <h3 className="text-xl font-semibold text-gradient">Soft Skills</h3>
              </div>
              {softSkills.map((skill, index) => (
                <SkillItem key={index} name={skill.name} level={skill.level} icon={skill.icon} category={skill.category} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills Summary */}
        <div className="mt-16">
          <Card className="card-hover glass-effect">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gradient mb-4">Skills Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Programming Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Data Science Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Development Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">1+</div>
                  <div className="text-sm text-muted-foreground">Database Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Soft Skills</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
