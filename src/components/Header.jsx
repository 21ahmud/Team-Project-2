import React from "react";
import { motion } from "framer-motion";
import { LogOut, Menu, Sun, Moon, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const savedMode = localStorage.getItem("smartTileDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem("smartTileDarkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const iconVariants = {
    hover: { scale: 1.15, rotate: [0, 10, -10, 0], transition: { duration: 0.3 } },
    tap: { scale: 0.9 }
  };
  
  const buttonClass = "text-foreground hover:bg-foreground/10 dark:text-slate-300 dark:hover:bg-slate-700";

  return (
    <header className="w-full py-3 px-4 md:px-6 flex items-center justify-between bg-card/80 backdrop-blur-lg border-b border-border/70 sticky top-0 z-50 shadow-sm">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-2"
      >
        <Button variant="ghost" size="icon" className={`md:hidden ${buttonClass}`}>
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/dashboard" className="flex items-center gap-2">
          <motion.div 
            className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg text-primary-foreground"
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <BarChart3 className="h-5 w-5 md:h-6 md:w-6" />
          </motion.div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors">
            SmartTile Analytics
          </h1>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-1 md:gap-2"
      >
        <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className={buttonClass}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </motion.div>
        <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
          <Button variant="ghost" size="icon" className={buttonClass}>
            <Settings className="h-5 w-5" />
          </Button>
        </motion.div>
        <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
          <Button variant="ghost" size="icon" onClick={onLogout} className="text-destructive hover:bg-destructive/10">
            <LogOut className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;