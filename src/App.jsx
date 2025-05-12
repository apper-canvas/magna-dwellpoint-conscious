import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(
      !darkMode ? "Dark mode activated" : "Light mode activated", 
      { icon: !darkMode ? "🌙" : "☀️" }
    );
  };
  
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-primary w-8 h-8">
                {getIcon('Home')({ size: 32 })}
              </div>
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DwellPoint
            </h1>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-surface-100 dark:bg-surface-800 py-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              © 2023 DwellPoint. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Terms
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Privacy
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="bg-surface-50 dark:bg-surface-800 shadow-soft"
      />
    </div>
  );
}

export default App;