import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Box, Card, CardMedia, CardContent, 
  Button, Chip, Rating, LinearProgress, Tab, Tabs, Paper,
  FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment,
  Pagination, Divider, Stack, IconButton, Tooltip
} from '@mui/material';
import { 
  FlashOn, Timer, TrendingDown, FilterList, Search,
  Favorite, FavoriteBorder, LocalOffer, Bolt, Alarm,
  Sort, ArrowDropDown, ShoppingCart, Close
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../redux/actions/uiActions';
// Import these actions when you implement them
// import { fetchLootDeals } from '../redux/actions/productActions';
// import { addToWatchlist, removeFromWatchlist } from '../redux/actions/userActions';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';
import useDebounce from '../hooks/useDebounce';

// Sample loot deal products data for demonstration
const lootDealProducts = [
  {
    id: 'loot1',
    name: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    image: '/sony-headphones.jpg',
    brand: 'Sony',
    category: 'Electronics',
    averageRating: 4.8,
    originalPrice: 24990,
    currentBestPrice: {
      price: 14990,
      store: 'Amazon'
    },
    discount: '40% OFF',
    timeLeft: '2d 4h', // Time left for the deal
    soldPercent: 78, // Percent of stock sold
    endTime: Date.now() + 172800000 // Current time + 2 days in milliseconds
  },
  {
    id: 'loot2',
    name: 'Samsung 55" Crystal 4K UHD Smart TV',
    image: '/samsung-tv.jpg',
    brand: 'Samsung',
    category: 'Electronics',
    averageRating: 4.5,
    originalPrice: 59900,
    currentBestPrice: {
      price: 37990,
      store: 'Flipkart'
    },
    discount: '37% OFF',
    timeLeft: '1d 12h',
    soldPercent: 65,
    endTime: Date.now() + 129600000 // Current time + 1.5 days in milliseconds
  },
  {
    id: 'loot3',
    name: 'Apple Watch SE (2nd Gen)',
    image: '/apple-watch.jpg',
    brand: 'Apple',
    category: 'Wearables',
    averageRating: 4.7,
    originalPrice: 29900,
    currentBestPrice: {
      price: 19900,
      store: 'Croma'
    },
    discount: '33% OFF',
    timeLeft: '8h 45m',
    soldPercent: 92,
    endTime: Date.now() + 31500000 // Current time + 8.75 hours in milliseconds
  },
  {
    id: 'loot4',
    name: 'Dyson V11 Absolute Cordless Vacuum',
    image: '/dyson-vacuum.jpg',
    brand: 'Dyson',
    category: 'Home & Kitchen',
    averageRating: 4.6,
    originalPrice: 58900,
    currentBestPrice: {
      price: 38990,
      store: 'Reliance Digital'
    },
    discount: '34% OFF',
    timeLeft: '3d 6h',
    soldPercent: 45,
    endTime: Date.now() + 284400000 // Current time + 3.25 days in milliseconds
  },
  {
    id: 'loot5',
    name: 'Dell XPS 13 9310 Laptop',
    image: '/dell-xps.jpg',
    brand: 'Dell',
    category: 'Computers',
    averageRating: 4.7,
    originalPrice: 129900,
    currentBestPrice: {
      price: 89990,
      store: 'Dell'
    },
    discount: '31% OFF',
    timeLeft: '5d 2h',
    soldPercent: 37,
    endTime: Date.now() + 442800000 // Current time + 5.1 days in milliseconds
  },
  {
    id: 'loot6',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    image: '/instant-pot.jpg',
    brand: 'Instant Pot',
    category: 'Home & Kitchen',
    averageRating: 4.8,
    originalPrice: 8999,
    currentBestPrice: {
      price: 4999,
      store: 'Amazon'
    },
    discount: '44% OFF',
    timeLeft: '6h 30m',
    soldPercent: 88,
    endTime: Date.now() + 23400000 // Current time + 6.5 hours in milliseconds
  },
  {
    id: 'loot7',
    name: 'Canon EOS M50 Mark II Mirrorless Camera',
    image: '/canon-camera.jpg',
    brand: 'Canon',
    category: 'Electronics',
    averageRating: 4.5,
    originalPrice: 58990,
    currentBestPrice: {
      price: 42990,
      store: 'Flipkart'
    },
    discount: '27% OFF',
    timeLeft: '2d 8h',
    soldPercent: 52,
    endTime: Date.now() + 201600000 // Current time + 2.33 days in milliseconds
  },
  {
    id: 'loot8',
    name: 'Fitbit Versa 3 Health & Fitness Smartwatch',
    image: '/fitbit-versa.jpg',
    brand: 'Fitbit',
    category: 'Wearables',
    averageRating: 4.4,
    originalPrice: 21999,
    currentBestPrice: {
      price: 13999,
      store: 'Myntra'
    },
    discount: '36% OFF',
    timeLeft: '1d 9h',
    soldPercent: 71,
    endTime: Date.now() + 118800000 // Current time + 1.38 days in milliseconds
  }
];

// Categories for filtering
const categories = [
  'All Categories', 'Electronics', 'Computers', 'Wearables', 
  'Home & Kitchen', 'Fashion', 'Beauty', 'Sports'
];

// Brands for filtering
const brands = [
  'All Brands', 'Apple', 'Samsung', 'Sony', 'Dyson', 
  'Dell', 'Canon', 'Fitbit', 'Instant Pot'
];

// Component to display countdown timer
const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();
      
      if (difference <= 0) {
        return 'Expired';
      }
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      let timeString = '';
      if (days > 0) {
        timeString += `${days}d `;
      }
      if (hours > 0 || days > 0) {
        timeString += `${hours}h `;
      }
      timeString += `${minutes}m ${seconds}s`;
      
      return timeString;
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endTime]);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Alarm fontSize="small" color="error" />
      <Typography variant="body2" fontWeight="medium" color="error.main">
        {timeLeft}
      </Typography>
    </Box>
  );
};

// Deal Card Component
const DealCard = ({ deal, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
        }
      }}
      elevation={3}
    >
      {/* Flash Deal Label */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          left: -28,
          bgcolor: 'error.main', 
          color: 'white',
          py: 0.5,
          px: 3,
          transform: 'rotate(-45deg)',
          transformOrigin: 'top right',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}
      >
        <FlashOn fontSize="small" />
        <Typography variant="caption" fontWeight="bold">LOOT DEAL</Typography>
      </Box>
      
      {/* Discount Chip */}
      <Chip
        label={deal.discount}
        color="error"
        sx={{ 
          position: 'absolute',
          top: 12,
          right: 12,
          fontWeight: 'bold',
          fontSize: '0.85rem'
        }}
      />
      
      {/* Image */}
      <Box sx={{ position: 'relative' }}>
        <Box 
          component={RouterLink}
          to={`/product/${deal.id}`}
          sx={{ 
            display: 'block',
            textDecoration: 'none'
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={deal.image || '/placeholder-product.jpg'}
            alt={deal.name}
            sx={{ 
              objectFit: 'contain',
              p: 2,
              bgcolor: '#f8f8f8'
            }}
          />
        </Box>
        
        {/* Stock Progress */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {deal.soldPercent}% claimed
            </Typography>
            {deal.soldPercent > 80 && (
              <Typography variant="caption" color="error" fontWeight="bold">
                Almost gone!
              </Typography>
            )}
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={deal.soldPercent} 
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                bgcolor: deal.soldPercent > 80 ? 'error.main' : 'primary.main'
              }
            }}
          />
        </Box>
      </Box>
      
      {/* Content */}
      <CardContent sx={{ flexGrow: 1, pt: 1.5 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {deal.brand}
        </Typography>
        
        <Typography 
          variant="h6" 
          component={RouterLink}
          to={`/product/${deal.id}`}
          sx={{ 
            textDecoration: 'none',
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.3,
            height: 42,
            mb: 1
          }}
        >
          {deal.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Rating 
            value={deal.averageRating} 
            precision={0.5} 
            readOnly 
            size="small" 
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({deal.averageRating})
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 0.5
          }}
        >
          <Box>
            <Typography 
              variant="body2" 
              component="span"
              sx={{ 
                textDecoration: 'line-through', 
                color: 'text.secondary',
                mr: 1
              }}
            >
              ₹{deal.originalPrice.toLocaleString()}
            </Typography>
            <Typography 
              variant="h6" 
              component="span" 
              color="error.main"
              fontWeight="bold"
            >
              ₹{deal.currentBestPrice.price.toLocaleString()}
            </Typography>
          </Box>
          <Chip 
            label={deal.currentBestPrice.store} 
            variant="outlined" 
            size="small" 
          />
        </Box>
        
        <CountdownTimer endTime={deal.endTime} />
      </CardContent>
      
      {/* Actions */}
      <Box sx={{ p: 2, pt: 0, mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color={isInWatchlist ? "primary" : "default"}
          onClick={() => isInWatchlist ? onRemoveFromWatchlist(deal.id) : onAddToWatchlist(deal.id)}
          sx={{ mr: 1 }}
        >
          {isInWatchlist ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        
        <Button 
          variant="contained" 
          fullWidth
          component={RouterLink}
          to={`/product/${deal.id}`}
          endIcon={<ShoppingCart />}
          sx={{ 
            borderRadius: 2,
            fontWeight: 'bold',
            bgcolor: 'error.main',
            '&:hover': {
              bgcolor: 'error.dark'
            }
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

const LootDeals = () => {
  const [tabValue, setTabValue] = useState(0);
  const [category, setCategory] = useState('All Categories');
  const [brand, setBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState('');
  const [discountRange, setDiscountRange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedQuery = useDebounce(searchQuery, 400);
  
  const dispatch = useDispatch();
  // Uncomment when you implement redux actions
  // const { lootDeals, loading, error } = useSelector(state => state.products);
  // const { watchlist } = useSelector(state => state.user);
  
  // For demonstration purposes
  const loading = false;
  const error = null;
  const watchlist = [];
  
  const productsPerPage = 8;
  
  // For demonstration purposes, use the sample data
  // Replace with actual Redux state once implemented
  const deals = lootDealProducts;
  
  // Uncomment when implementing API calls
  // useEffect(() => {
  //   dispatch(fetchLootDeals());
  // }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToWatchlist = (productId) => {
    // Implement when adding Redux actions
    // dispatch(addToWatchlist(productId));
    console.log('Added to watchlist:', productId);
  };

  const handleRemoveFromWatchlist = (productId) => {
    // Implement when adding Redux actions
    // dispatch(removeFromWatchlist(productId));
    console.log('Removed from watchlist:', productId);
  };

  // Simple isInWatchlist check for demo
  const isInWatchlist = (productId) => {
    // Replace with actual check once implemented
    return watchlist.includes(productId);
  };

  // Filter deals based on all criteria
  const getFilteredDeals = () => {
    let filtered = [...deals];
    
    // Filter by tab value
    if (tabValue === 1) { // Ending Soon
      filtered = filtered.sort((a, b) => a.endTime - b.endTime);
    } else if (tabValue === 2) { // Biggest Discounts
      filtered = filtered.sort((a, b) => {
        const discountA = (a.originalPrice - a.currentBestPrice.price) / a.originalPrice;
        const discountB = (b.originalPrice - b.currentBestPrice.price) / b.originalPrice;
        return discountB - discountA;
      });
    } else if (tabValue === 3) { // Most Popular
      filtered = filtered.sort((a, b) => b.soldPercent - a.soldPercent);
    }
    
    // Filter by category
    if (category !== 'All Categories') {
      filtered = filtered.filter(deal => deal.category === category);
    }
    
    // Filter by brand
    if (brand !== 'All Brands') {
      filtered = filtered.filter(deal => deal.brand === brand);
    }
    
    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(deal => {
        const price = deal.currentBestPrice.price;
        if (!max) return price >= min; // When only min is provided
        return price >= min && price <= max;
      });
    }
    
    // Filter by discount percentage
    if (discountRange) {
      const [min, max] = discountRange.split('-').map(Number);
      filtered = filtered.filter(deal => {
        const discountPercent = ((deal.originalPrice - deal.currentBestPrice.price) / deal.originalPrice) * 100;
        if (!max) return discountPercent >= min; // When only min is provided
        return discountPercent >= min && discountPercent <= max;
      });
    }
    
    // Filter by search query
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        deal => deal.name.toLowerCase().includes(query) || 
                deal.brand.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const filteredDeals = getFilteredDeals();
  const totalPages = Math.ceil(filteredDeals.length / productsPerPage);
  const paginatedDeals = filteredDeals.slice(
    (page - 1) * productsPerPage, 
    page * productsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 6 },
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: -30,
            right: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: -40,
            left: '30%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FlashOn sx={{ fontSize: 40, mr: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Loot Deals
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom sx={{ maxWidth: 700 }}>
            Limited-time offers with massive discounts on popular products
          </Typography>
          <Typography variant="body1">
            Our AI algorithms scan e-commerce platforms 24/7 to find flash sales and clearance offers 
            with discounts up to 80% off regular prices. Grab them before they're gone!
          </Typography>
          
          {/* Search Bar */}
          <Box 
            sx={{ 
              mt: 4,
              maxWidth: 600,
              position: 'relative',
              display: 'flex'
            }}
          >
            <TextField 
              variant="outlined"
              placeholder="Search in deals..."
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { 
                  bgcolor: 'white', 
                  borderRadius: 2,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }
              }}
              sx={{ mr: 1 }}
            />
            <Button 
              variant="contained" 
              color="secondary"
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<FilterList />}
              sx={{ 
                minWidth: 'auto',
                px: { xs: 2, sm: 3 },
                bgcolor: 'white',
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)'
                },
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                borderRadius: 2
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Filter
              </Box>
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Filters */}
      {showFilters && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3,
            mb: 4,
            borderRadius: 3,
            position: 'relative'
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={() => setShowFilters(false)}
          >
            <Close />
          </IconButton>
          
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Filter Deals
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  labelId="brand-label"
                  value={brand}
                  label="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brands.map((brandOption) => (
                    <MenuItem key={brandOption} value={brandOption}>{brandOption}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="price-label">Price Range</InputLabel>
                <Select
                  labelId="price-label"
                  value={priceRange}
                  label="Price Range"
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <MenuItem value="">All Prices</MenuItem>
                  <MenuItem value="0-5000">Under ₹5,000</MenuItem>
                  <MenuItem value="5000-10000">₹5,000 - ₹10,000</MenuItem>
                  <MenuItem value="10000-25000">₹10,000 - ₹25,000</MenuItem>
                  <MenuItem value="25000-50000">₹25,000 - ₹50,000</MenuItem>
                  <MenuItem value="50000-">Over ₹50,000</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="discount-label">Discount</InputLabel>
                <Select
                  labelId="discount-label"
                  value={discountRange}
                  label="Discount"
                  onChange={(e) => setDiscountRange(e.target.value)}
                >
                  <MenuItem value="">All Discounts</MenuItem>
                  <MenuItem value="10-20">10% - 20% off</MenuItem>
                  <MenuItem value="20-30">20% - 30% off</MenuItem>
                  <MenuItem value="30-40">30% - 40% off</MenuItem>
                  <MenuItem value="40-">Over 40% off</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={() => {
                setCategory('All Categories');
                setBrand('All Brands');
                setPriceRange('');
                setDiscountRange('');
                setSearchQuery('');
              }}
              sx={{ mr: 2 }}
            >
              Clear All
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </Box>
        </Paper>
      )}
      
      {/* Main content */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            '& .MuiTabs-indicator': {
              backgroundColor: 'error.main'
            }
          }}
        >
          <Tab 
            icon={<FlashOn sx={{ mr: 0.5 }} />} 
            label="All Deals" 
            iconPosition="start"
            sx={{ '&.Mui-selected': { color: 'error.main' } }}
          />
          <Tab 
            icon={<Timer sx={{ mr: 0.5 }} />}
            label="Ending Soon" 
            iconPosition="start"
            sx={{ '&.Mui-selected': { color: 'error.main' } }}
          />
          <Tab 
            icon={<TrendingDown sx={{ mr: 0.5 }} />} 
            label="Biggest Discounts" 
            iconPosition="start"
            sx={{ '&.Mui-selected': { color: 'error.main' } }}
          />
          <Tab 
            icon={<LocalOffer sx={{ mr: 0.5 }} />} 
            label="Most Popular" 
            iconPosition="start"
            sx={{ '&.Mui-selected': { color: 'error.main' } }}
          />
        </Tabs>
      </Box>
      
      {loading ? (
        <Loader text="Loading deals..." />
      ) : error ? (
        <ErrorAlert error={error} />
      ) : (
        <>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1">
              {filteredDeals.length} deals found
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 2,
                  bgcolor: '#f5f5f5',
                  p: 0.5,
                  px: 1.5
                }}
              >
                <Bolt color="error" fontSize="small" />
                <Typography 
                  variant="body2" 
                  fontWeight="medium" 
                  color="error.main"
                  sx={{ ml: 0.5 }}
                >
                  Loot Deals update every hour
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {paginatedDeals.length > 0 ? (
            <Grid container spacing={3}>
              {paginatedDeals.map((deal) => (
                <Grid item xs={12} sm={6} md={3} key={deal.id}>
                  <DealCard 
                    deal={deal}
                    isInWatchlist={isInWatchlist(deal.id)}
                    onAddToWatchlist={handleAddToWatchlist}
                    onRemoveFromWatchlist={handleRemoveFromWatchlist}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 5, 
                textAlign: 'center', 
                bgcolor: 'background.paper',
                borderRadius: 3
              }}
            >
              <LocalOffer sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No deals found matching your criteria
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your filters or check back later for new deals
              </Typography>
            </Paper>
          )}
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      {/* Call to Action - Price Alerts */}
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 6,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          bgcolor: '#f0f7ff',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Never Miss a Deal Again!
        </Typography>
        <Typography variant="body1" paragraph>
          Set up price drop alerts for your favorite products and get notified when they go on sale.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink}
          to="/profile"
          sx={{ borderRadius: 2, px: 4 }}
        >
          Set Up Alerts
        </Button>
      </Paper>
    </Container>
  );
};

export default LootDeals;
