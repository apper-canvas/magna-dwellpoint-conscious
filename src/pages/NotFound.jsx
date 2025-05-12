import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  useEffect(() => {
    document.title = 'Page Not Found | DwellPoint';
    
    return () => {
      document.title = 'DwellPoint | Find Your Perfect Home';
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div 
        className="max-w-lg w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="text-primary-light w-32 h-32">
              {AlertTriangleIcon({ size: 128 })}
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">
              404
            </div>
          </div>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg text-surface-600 dark:text-surface-400 mb-8"
        >
          The page you are looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200"
          >
            <HomeIcon size={20} className="mr-2" />
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;