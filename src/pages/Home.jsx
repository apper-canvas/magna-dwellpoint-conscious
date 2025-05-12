import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const BuildingOffice2Icon = getIcon('Building2');
  const MapPinIcon = getIcon('MapPin');
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Featured locations with property counts
  const featuredLocations = [
    { 
      name: "New York", 
      properties: 1234, 
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "Los Angeles", 
      properties: 985, 
      image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "Miami", 
      properties: 763, 
      image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "Chicago", 
      properties: 542, 
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    }
  ];
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! We'll keep you updated with the latest listings.");
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Modern home interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-900/80 to-surface-900/60 dark:from-surface-900/90 dark:to-surface-900/70"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36 relative z-1">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={fadeInUp}
            >
              Find Your Perfect Place to Call Home
            </motion.h1>
            <motion.p 
              className="text-xl text-surface-100 mb-8 max-w-lg"
              variants={fadeInUp}
            >
              Discover thousands of properties for sale and rent across the country with our intuitive search tools.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <div className="bg-white dark:bg-surface-800 p-4 rounded-xl shadow-soft">
                <div className="flex mb-6 border-b border-surface-200 dark:border-surface-700">
                  <button 
                    className={`flex-1 py-2 px-4 text-center font-medium ${activeTab === 'buy' ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-400'}`}
                    onClick={() => setActiveTab('buy')}
                  >
                    Buy
                  </button>
                  <button 
                    className={`flex-1 py-2 px-4 text-center font-medium ${activeTab === 'rent' ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-400'}`}
                    onClick={() => setActiveTab('rent')}
                  >
                    Rent
                  </button>
                  <button 
                    className={`flex-1 py-2 px-4 text-center font-medium ${activeTab === 'sell' ? 'text-primary border-b-2 border-primary' : 'text-surface-600 dark:text-surface-400'}`}
                    onClick={() => setActiveTab('sell')}
                  >
                    Sell
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={20} />
                    <input 
                      type="text" 
                      placeholder="City, neighborhood, or address" 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                      {activeTab === 'buy' ? <HomeIcon size={20} /> : (activeTab === 'rent' ? <BuildingIcon size={20} /> : <BuildingOffice2Icon size={20} />)}
                    </div>
                    <select 
                      className="w-full appearance-none pl-10 pr-10 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="land">Land</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500">
                      {getIcon('ChevronDown')({ size: 20 })}
                    </div>
                  </div>
                  
                  <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                    {activeTab === 'buy' ? 'Find Homes' : (activeTab === 'rent' ? 'Find Rentals' : 'Estimate Value')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Feature Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Home</h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Explore our curated selection of properties tailored to your needs
            </p>
          </div>
          
          <MainFeature />
        </div>
      </section>
      
      {/* Featured Locations */}
      <section className="py-16 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Locations</h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Discover properties in these sought-after cities across the country
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLocations.map((location, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-card cursor-pointer"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img 
                  src={location.image} 
                  alt={location.name} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{location.name}</h3>
                  <p className="text-surface-100">{location.properties.toLocaleString()} properties</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Stay Updated with New Properties
                </h2>
                <p className="text-surface-100 mb-8">
                  Subscribe to our newsletter to receive personalized property recommendations and market insights.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-white text-primary hover:bg-surface-100 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              <div className="hidden md:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Modern apartment" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;