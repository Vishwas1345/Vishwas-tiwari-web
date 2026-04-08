import { Heart, Code, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[hsl(var(--surface-low))] py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary/[0.04] via-transparent to-[hsl(207,100%,50%)]/[0.04]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-xl font-display font-bold text-foreground mb-1">
              Vishwas<span className="text-primary"> Tiwari</span>
            </p>
            <p className="text-sm text-muted-foreground font-label">AI Enthusiast &amp; Developer</p>
            <div className="flex items-center justify-center md:justify-start mt-3 text-xs text-muted-foreground font-label gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Turning data into insight</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right text-sm text-muted-foreground gap-2">
            <div className="flex items-center gap-1.5">
              <Code className="w-4 h-4 text-primary" />
              <span>Built with React &amp; Tailwind</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary animate-pulse" />
              <span>and curiosity</span>
            </div>
            <p className="text-xs font-label pt-2 opacity-80">&copy; {currentYear} Vishwas Tiwari. All rights reserved.</p>
          </div>
        </div>

        <div className="border-t border-white/[0.05] mt-10 pt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The best way to predict the future is to build it — with data, rigor, and a bit of craft.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
