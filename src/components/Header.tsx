import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { downloadResume } from "@/lib/resumeDownload";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleNavClick = (item: { label: string; id: string; isRoute: boolean }) => {
    if (item.isRoute) {
      navigate(`/${item.id}`);
      setIsOpen(false);
      return;
    }
    /* Section anchors only exist on the home page — scroll there first from /portfolio etc. */
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.id } });
      setIsOpen(false);
      return;
    }
    scrollToSection(item.id);
  };

  const navItems = [
    { label: "About", id: "about", isRoute: false },
    { label: "Skills", id: "skills", isRoute: false },
    { label: "Experience", id: "experience", isRoute: false },
    { label: "Education", id: "education", isRoute: false },
    { label: "Projects", id: "projects", isRoute: false },
    { label: "Portfolio", id: "portfolio", isRoute: true },
    { label: "Contact", id: "contact", isRoute: false },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] glass-nav">
      <div className="container mx-auto px-4 py-3.5 flex justify-between items-center gap-4">
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          className="flex flex-col items-start cursor-pointer text-left flex-shrink-0 group"
          whileTap={{ scale: 0.98 }}
        >
          <span className="block text-sm font-label font-semibold text-muted-foreground tracking-wide">
            Portfolio
          </span>
          <span className="block text-base sm:text-lg font-display font-bold text-foreground leading-tight group-hover:text-primary/90 transition-colors">
            Vishwas Tiwari
          </span>
        </motion.button>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <Button size="sm" className="font-label text-xs" onClick={() => downloadResume()}>
                Resume
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </div>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 glass-nav border-t border-white/5 py-4 animate-fade-in">
                <nav>
                  <ul className="flex flex-col px-4">
                    {navItems.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => handleNavClick(item)}
                          className="w-full text-left py-3 px-3 rounded-xl font-label text-sm text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-8 flex-1 justify-end">
            <nav>
              <ul className="flex flex-wrap justify-end gap-x-6 gap-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item)}
                      className="font-label text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <Button size="sm" className="font-label shrink-0" onClick={() => downloadResume()}>
              Resume
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
