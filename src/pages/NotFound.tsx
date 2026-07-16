import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioPlexusCanvas } from "@/components/PortfolioPlexusCanvas";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative text-foreground overflow-hidden">
      <PortfolioPlexusCanvas />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          className="card-hover text-center px-10 py-12 sm:px-14 max-w-md mx-4"
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary"
            animate={{ rotate: [0, 12, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Compass className="w-8 h-8" />
          </motion.div>
          <h1 className="text-7xl font-display font-bold text-gradient mb-3">404</h1>
          <p className="text-xl text-muted-foreground mb-2">Oops! Page not found</p>
          <p className="text-sm text-muted-foreground/80 mb-8">
            The page you're looking for drifted off into the particle field.
          </p>
          <Button className="font-label gap-2" onClick={() => navigate("/")}>
            <Home className="w-4 h-4" />
            Return to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
