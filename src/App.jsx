import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import { Toaster } from "@/components/ui/toaster";
import AnimatedBackground from "@/components/AnimatedBackground";

const AppContent = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("smartTileUser");
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }, []);
  
  useEffect(() => {
    const darkMode = localStorage.getItem("smartTileDarkMode");
    if (darkMode === "true") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);


  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem("smartTileUser");
    setIsAuthenticated(false);
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className={`min-h-screen flex flex-col gradient-bg`}>
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col flex-1 w-full">
        {!isAuthPage && isAuthenticated && <Header onLogout={handleLogout} />}
        <main className={`flex-1 flex ${isAuthPage ? 'items-center justify-center p-4' : 'flex-col container mx-auto'}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className={`h-full ${isAuthPage ? 'w-full max-w-md' : 'w-full'}`}
            >
              <Routes location={location}>
                <Route 
                  path="/login" 
                  element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} 
                />
                <Route 
                  path="/signup" 
                  element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUpPage onSignUp={handleLogin} />} 
                />
                <Route 
                  path="/dashboard" 
                  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
                />
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        {!isAuthPage && isAuthenticated && <Footer />}
      </div>
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;