import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icon declarations
  const BedIcon = getIcon('Bed');
  const BathIcon = getIcon('Bath');
  const SquareIcon = getIcon('Square');
  const HeartIcon = getIcon('Heart');
  const HomeIcon = getIcon('Home');
  const MapPinIcon = getIcon('MapPin');
  const DollarSignIcon = getIcon('DollarSign');
  const FilterIcon = getIcon('SlidersHorizontal');
  const XIcon = getIcon('X');
  const SearchIcon = getIcon('Search');
  
  // Sample properties data
  const initialProperties = [
    {
      id: 1,
      title: "Modern Lakefront Villa",
      address: "123 Lakeview Dr, Seattle, WA",
      price: 1250000,
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      favorite: false
    },
    {
      id: 2,
      title: "Downtown Luxury Apartment",
      address: "456 Main St, Chicago, IL",
      price: 850000,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      favorite: false
    },
    {
      id: 3,
      title: "Suburban Family Home",
      address: "789 Oak Ave, Portland, OR",
      price: 675000,
      type: "House",
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2100,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      favorite: false
    },
    {
      id: 4,
      title: "Beachfront Condo",
      address: "101 Ocean Blvd, Miami, FL",
      price: 1650000,
      type: "Condo",
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      favorite: false
    },
    {
      id: 5,
      title: "Mountain View Retreat",
      address: "222 Pine Rd, Denver, CO",
      price: 925000,
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      favorite: false
    },
    {
      id: 6,
      title: "Urban Loft Space",
      address: "333 Loft Ave, New York, NY",
      price: 1100000,
      type: "Loft",
      bedrooms: 1,
      bathrooms: 2,
      area: 1600,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      favorite: false
    }
  ];

  // States
  const [properties, setProperties] = useState(initialProperties);
  const [filteredProperties, setFilteredProperties] = useState(initialProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    propertyType: ''
  });
  const [loading, setLoading] = useState(false);

  // Apply filters and search
  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        let results = [...properties];
        
        // Apply search term
        if (searchTerm) {
          const lowercasedSearch = searchTerm.toLowerCase();
          results = results.filter(property => 
            property.title.toLowerCase().includes(lowercasedSearch) || 
            property.address.toLowerCase().includes(lowercasedSearch) ||
            property.type.toLowerCase().includes(lowercasedSearch)
          );
        }
        
        // Apply price filters
        if (filters.minPrice) {
          results = results.filter(property => property.price >= Number(filters.minPrice));
        }
        if (filters.maxPrice) {
          results = results.filter(property => property.price <= Number(filters.maxPrice));
        }
        
        // Apply bedroom filter
        if (filters.beds) {
          results = results.filter(property => property.bedrooms >= Number(filters.beds));
        }
        
        // Apply bathroom filter
        if (filters.baths) {
          results = results.filter(property => property.bathrooms >= Number(filters.baths));
        }
        
        // Apply property type filter
        if (filters.propertyType) {
          results = results.filter(property => 
            property.type.toLowerCase() === filters.propertyType.toLowerCase()
          );
        }
        
        setFilteredProperties(results);
        setLoading(false);
      }, 600);
    };
    
    applyFilters();
  }, [searchTerm, filters, properties]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: '',
      propertyType: ''
    });
    setSearchTerm('');
    setShowFilters(false);
    toast.info("All filters have been reset");
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    const updatedProperties = properties.map(property => {
      if (property.id === id) {
        const newFavoriteStatus = !property.favorite;
        toast.success(newFavoriteStatus 
          ? "Property added to favorites" 
          : "Property removed from favorites"
        );
        return { ...property, favorite: newFavoriteStatus };
      }
      return property;
    });
    
    setProperties(updatedProperties);
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="mb-8 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 p-4 md:p-6 shadow-soft">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={20} />
            <input
              type="text"
              placeholder="Search by location, property name, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <FilterIcon size={18} />
            <span className="font-medium">Filters</span>
          </button>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                {/* Price Range */}
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">Price Range</label>
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                        className="w-full pl-9 pr-2 py-2 text-sm rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700"
                      />
                    </div>
                    <span className="text-surface-500">-</span>
                    <div className="relative flex-1">
                      <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                        className="w-full pl-9 pr-2 py-2 text-sm rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Beds */}
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">Bedrooms</label>
                  <div className="relative">
                    <BedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                    <select
                      value={filters.beds}
                      onChange={(e) => setFilters({...filters, beds: e.target.value})}
                      className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 appearance-none"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500">
                      {getIcon('ChevronDown')({ size: 16 })}
                    </div>
                  </div>
                </div>
                
                {/* Baths */}
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">Bathrooms</label>
                  <div className="relative">
                    <BathIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                    <select
                      value={filters.baths}
                      onChange={(e) => setFilters({...filters, baths: e.target.value})}
                      className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 appearance-none"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500">
                      {getIcon('ChevronDown')({ size: 16 })}
                    </div>
                  </div>
                </div>
                
                {/* Property Type */}
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">Property Type</label>
                  <div className="relative">
                    <HomeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                    <select
                      value={filters.propertyType}
                      onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                      className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 appearance-none"
                    >
                      <option value="">Any</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Condo">Condo</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Loft">Loft</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500">
                      {getIcon('ChevronDown')({ size: 16 })}
                    </div>
                  </div>
                </div>
                
                {/* Reset Button */}
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-800 dark:text-surface-200 rounded-lg transition-colors duration-200"
                  >
                    <XIcon size={16} />
                    <span className="font-medium">Reset Filters</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Results Count and Info */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">
          {loading ? (
            <span className="inline-flex items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                {getIcon('Loader')({ size: 18 })}
              </motion.div>
              Searching...
            </span>
          ) : (
            <span>{filteredProperties.length} Properties Found</span>
          )}
        </h3>
      </div>
      
      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="card group overflow-hidden h-full flex flex-col"
              >
                {/* Property Image */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 
                      ${property.favorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-surface-500 hover:bg-white hover:text-red-500'}`}
                    aria-label={property.favorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <HeartIcon size={18} fill={property.favorite ? "currentColor" : "none"} />
                  </button>
                  
                  {/* Property Type Tag */}
                  <div className="absolute bottom-4 left-4 bg-surface-900/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {property.type}
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold mb-1 line-clamp-1">{property.title}</h3>
                    <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm">
                      <MapPinIcon size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{property.address}</span>
                    </div>
                  </div>
                  
                  <div className="mt-1 mb-4">
                    <h4 className="text-xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </h4>
                  </div>
                  
                  {/* Property Features */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-200 dark:border-surface-700">
                    <div className="flex items-center text-surface-600 dark:text-surface-400">
                      <BedIcon size={16} className="mr-1" />
                      <span className="text-sm mr-3">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center text-surface-600 dark:text-surface-400">
                      <BathIcon size={16} className="mr-1" />
                      <span className="text-sm mr-3">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center text-surface-600 dark:text-surface-400">
                      <SquareIcon size={16} className="mr-1" />
                      <span className="text-sm">{property.area.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="px-5 pb-5">
                  <button 
                    className="w-full bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 py-2 rounded-lg font-medium transition-colors duration-200"
                    onClick={() => toast.info(`Viewing details for ${property.title}`)}
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          ) : !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="text-surface-400 dark:text-surface-500 mb-4">
                {getIcon('Search')({ size: 60 })}
              </div>
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md">
                We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={resetFilters}
                className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200"
              >
                <XIcon size={16} />
                <span>Reset Filters</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeature;