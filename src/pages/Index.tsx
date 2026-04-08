import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SiteIntro } from "@/components/SiteIntro";
import { IntroContext } from "@/contexts/IntroContext";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <IntroContext.Provider value={{ introComplete, setIntroComplete }}>
      <SiteIntro>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </SiteIntro>
    </IntroContext.Provider>
  );
};

export default Index;
