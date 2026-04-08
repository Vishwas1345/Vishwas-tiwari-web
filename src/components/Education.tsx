import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Calendar, MapPin, Star, Award } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const Education = () => {
  const educationData = [
    {
      degree: "Bachelor in Computer Applications (BCA)",
      institution: "Bhagwan Mahavir University",
      period: "2023-26",
      grade: "5th Semester",
      cgpa: "7.76",
      location: "Surat, Gujarat",
      details:
        "Comprehensive BCA program focused on programming fundamentals, data structures, algorithms, and software development.",
      achievements: [
        "Strong academic performance (CGPA 7.76)",
        "Coding competitions and hackathons",
        "Core courses: DBMS, Web Development, OOP",
        "Capstone projects integrating multiple technologies",
      ],
      courses: [
        "Data Structures",
        "Database Management",
        "Web Development",
        "OOP",
        "Computer Networks",
        "Software Engineering",
      ],
      status: "In Progress",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "St Xavier's High School",
      period: "2021-23",
      grade: "10+2 (PCM)",
      cgpa: "69.78 PR",
      location: "Surat, Gujarat",
      details: "Higher secondary with Physics, Chemistry, and Mathematics — foundation in analytical thinking.",
      achievements: [
        "69.78 PR in finals",
        "Science exhibitions and competitions",
        "Advanced mathematics and physics coursework",
      ],
      courses: ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"],
      status: "Completed",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Sungrace School, Udhna",
      period: "2009-21",
      grade: "10th Standard",
      cgpa: "Distinction",
      location: "Udhna, Surat",
      details: "Secondary education with distinction and broad foundation across core subjects.",
      achievements: [
        "Distinction in finals",
        "Extracurricular leadership",
        "Strong foundation in STEM",
      ],
      courses: ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Computer Applications"],
      status: "Completed",
    },
  ];

  return (
    <section id="education" className="relative section-band-alt overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow text-center">Academics</p>
          <h2 className="section-title text-center mx-auto block">Education journey</h2>
          <p className="section-desc text-center mx-auto mb-14">
            Coursework and milestones that shaped how I build and learn.
          </p>
        </Reveal>

        <div className="max-w-4xl mx-auto">
          <div className="relative timeline-rail pl-8 md:pl-10 ml-2 md:ml-4">
            {educationData.map((item, index) => (
              <Reveal key={index} delay={0.06 * index}>
                <div className="mb-12 relative group">
                  <div className="absolute -left-[2.15rem] md:-left-[2.6rem] top-2 flex h-9 w-9 items-center justify-center rounded-2xl border-2 border-background bg-gradient-to-br from-primary to-[hsl(207,100%,50%)] shadow-[0_0_20px_hsl(var(--glow)/0.35)] transition-transform group-hover:scale-110">
                    <GraduationCap className="w-4 h-4 text-primary-foreground" />
                  </div>

                  <Card className="card-hover border-0">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-wrap justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">{item.degree}</h3>
                          <div className="flex items-center gap-2 text-foreground font-medium">
                            <BookOpen className="w-5 h-5 text-primary" />
                            {item.institution}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {item.location}
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <Badge variant={item.status === "In Progress" ? "default" : "secondary"} className="font-label">
                            {item.status}
                          </Badge>
                          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-primary border border-primary/25 rounded-full px-3 py-1.5 bg-primary/5">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.period}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 border border-primary/15">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold font-label">{item.grade}</span>
                        </div>
                        {item.cgpa && (
                          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 border border-white/10">
                            <Award className="w-4 h-4 text-[hsl(207,100%,65%)]" />
                            <span className="text-sm font-semibold">{item.cgpa}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">{item.details}</p>

                      <div className="mb-6">
                        <h4 className="text-base font-display font-semibold mb-3">Key courses</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.courses.map((course) => (
                            <Badge key={course} variant="outline" className="text-xs border-white/15 font-label">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-display font-semibold mb-3">Achievements</h4>
                        <ul className="space-y-2">
                          {item.achievements.map((a, i) => (
                            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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

export default Education;
