import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { IntroContext, useIntroOptional } from "@/contexts/IntroContext";

type HomeLocationState = { scrollTo?: string };

/** Scroll to a section when arriving from another route (e.g. /portfolio) — waits for intro overlay to finish. */
function ScrollToRouteSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { introComplete } = useIntroOptional();
  const scrollTo = (location.state as HomeLocationState | null)?.scrollTo;

  useEffect(() => {
    if (!scrollTo || !introComplete) return;

    const run = () => {
      const element = document.getElementById(scrollTo);
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
      navigate(".", { replace: true, state: {} });
    };

    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [scrollTo, introComplete, navigate]);

  return null;
}

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <IntroContext.Provider value={{ introComplete, setIntroComplete }}>
      <SiteIntro>
        <ScrollToRouteSection />
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
