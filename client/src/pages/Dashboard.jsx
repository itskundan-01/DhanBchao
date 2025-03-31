import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Grid, Box, Button, Paper, Card, CardMedia, 
  CardContent, CardActionArea, Chip, Rating, Tabs, Tab,
  IconButton, useMediaQuery, useTheme
} from '@mui/material';
import { 
  ArrowForward, CompareArrows,
  Whatshot, ArrowRightAlt, 
  SmartToy, Timer, Favorite,
  LocalFireDepartment, TrendingUp, NewReleases
} from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';

// Sample banner data for carousel
const bannerData = [
  {
    id: 1,
    image: '/banner1.jpg',
    title: 'Massive Electronics Sale',
    description: 'Up to 40% off on top brands',
    buttonText: 'Shop Now',
    buttonLink: '/categories/Electronics'
  },
  {
    id: 2,
    image: '/banner2.jpg',
    title: 'New Season Fashion',
    description: 'Latest trends for the season',
    buttonText: 'Explore Collection',
    buttonLink: '/categories/Fashion'
  },
  {
    id: 3,
    image: '/banner3.jpg',
    title: 'Home Makeover Deals',
    description: 'Transform your space for less',
    buttonText: 'Discover More',
    buttonLink: '/categories/Home'
  }
];

// Sample top deals data
const topDeals = [
  {
    id: 'deal1',
    name: 'Samsung 55" 4K Smart TV',
    image: '/sample-tv.jpg',
    originalPrice: 59999,
    dealPrice: 42999,
    discount: '28%',
    endTime: new Date(Date.now() + 86400000) // 24 hours from now
  },
  {
    id: 'deal2',
    name: 'Apple iPad Pro 11"',
    image: '/sample-ipad.jpg',
    originalPrice: 79900,
    dealPrice: 67900,
    discount: '15%',
    endTime: new Date(Date.now() + 43200000) // 12 hours from now
  },
  {
    id: 'deal3',
    name: 'Bose QuietComfort Earbuds',
    image: '/sample-earbuds.jpg',
    originalPrice: 26900,
    dealPrice: 16900,
    discount: '37%',
    endTime: new Date(Date.now() + 28800000) // 8 hours from now
  },
  {
    id: 'deal4',
    name: 'Sony WH-1000XM4 Headphones',
    image: '/sample-headphones.jpg',
    originalPrice: 29990,
    dealPrice: 19990,
    discount: '33%',
    endTime: new Date(Date.now() + 64800000) // 18 hours from now
  }
];

// Sample categories - using existing data from Home page
const categories = [
  { 
    name: 'Electronics',
    image: '/electronics.avif',
    description: 'Mobiles, Laptops, Audio',
    count: 1240
  },
  { 
    name: 'Fashion',
    image: '/fashion.webp',
    description: 'Clothing, Shoes, Watches',
    count: 890
  },
  { 
    name: 'Home & Kitchen',
    image: '/kitchenhome.jpg',
    description: 'Appliances, Decor, Kitchen',
    count: 750
  },
  { 
    name: 'Beauty',
    image: '/beauty.webp',
    description: 'Skincare, Makeup, Fragrances',
    count: 520
  },
  { 
    name: 'Sports & Fitness',
    image: '/sports.avif',
    description: 'Exercise, Outdoor, Equipment',
    count: 380
  },
  { 
    name: 'Books & Media',
    image: '/books.avif',
    description: 'Books, Music, Movies',
    count: 620
  }
];

// Sample featured products - reusing from Home page
const featuredProducts = [
  {
    id: 'product1',
    name: 'Samsung Galaxy S21',
    image: '/sample-product1.jpg',
    brand: 'Samsung',
    averageRating: 4.5,
    currentBestPrice: {
      price: 799,
      store: 'Amazon'
    },
    discount: '20% off'
  },
  {
    id: 'product2',
    name: 'iPhone 13',
    image: '/sample-product2.jpg',
    brand: 'Apple',
    averageRating: 4.7,
    currentBestPrice: {
      price: 899,
      store: 'Flipkart'
    },
    discount: '10% off'
  },
  {
    id: 'product3',
    name: 'Google Pixel 6',
    image: '/sample-product3.jpg',
    brand: 'Google',
    averageRating: 4.6,
    currentBestPrice: {
      price: 749,
      store: 'Croma'
    },
    discount: '15% off'
  },
  {
    id: 'product4',
    name: 'OnePlus 10 Pro',
    image: '/sample-product4.jpg',
    brand: 'OnePlus',
    averageRating: 4.4,
    currentBestPrice: {
      price: 699,
      store: 'Amazon'
    },
    discount: '25% off'
  }
];

// Sample trending products
const trendingProducts = [
  {
    id: 'trend1',
    name: 'Dyson V12 Vacuum',
    image: '/sample-vacuum.jpg',
    brand: 'Dyson',
    averageRating: 4.7,
    price: 58900,
    searches: '5.3k searches this week'
  },
  {
    id: 'trend2',
    name: 'Nintendo Switch OLED',
    image: '/sample-switch.jpg',
    brand: 'Nintendo',
    averageRating: 4.8,
    price: 34990,
    searches: '4.8k searches this week'
  },
  {
    id: 'trend3',
    name: 'Apple AirPods Pro 2',
    image: '/sample-airpods.jpg',
    brand: 'Apple',
    averageRating: 4.6,
    price: 26900,
    searches: '7.2k searches this week'
  },
  {
    id: 'trend4',
    name: 'Samsung Frame TV 55"',
    image: '/sample-frametv.jpg',
    brand: 'Samsung',
    averageRating: 4.5,
    price: 84990,
    searches: '3.9k searches this week'
  }
];

// Sample recently viewed products
const recentlyViewed = [
  {
    id: 'recent1',
    name: 'Logitech MX Master 3',
    image: '/sample-mouse.jpg',
    price: 9995,
    viewedOn: '2 hours ago'
  },
  {
    id: 'recent2',
    name: 'Philips Air Purifier',
    image: '/sample-purifier.jpg',
    price: 15990,
    viewedOn: 'Yesterday'
  },
  {
    id: 'recent3',
    name: 'Kindle Paperwhite',
    image: '/sample-kindle.jpg',
    price: 13999,
    viewedOn: '3 days ago'
  }
];

// Popular brands
const popularBrands = [
  { name: 'Apple', logo: '/brand-apple.png', link: '/brands/apple' },
  { name: 'Samsung', logo: '/brand-samsung.png', link: '/brands/samsung' },
  { name: 'Sony', logo: '/brand-sony.png', link: '/brands/sony' },
  { name: 'LG', logo: '/brand-lg.png', link: '/brands/lg' },
  { name: 'Dell', logo: '/brand-dell.png', link: '/brands/dell' },
  { name: 'Nike', logo: '/brand-nike.png', link: '/brands/nike' }
];

const Dashboard = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle tab change for featured products section
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Function to render countdown timer
  const renderCountdown = (endTime) => {
    const timeRemaining = new Date(endTime) - new Date();
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Main Hero Carousel */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Carousel
          animation="slide"
          navButtonsAlwaysVisible
          indicators={true}
          autoPlay
          cycleNavigation
          navButtonsProps={{
            style: {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              color: 'black',
              borderRadius: '50%',
              margin: isMobile ? '0 5px' : '0 10px',
            }
          }}
        >
          {bannerData.map((banner) => (
            <Box key={banner.id} sx={{ position: 'relative' }}>
              <Box 
                sx={{
                  height: { xs: '30vh', sm: '40vh', md: '50vh' },
                  width: '100%',
                  bgcolor: '#000',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  component="img"
                  src={banner.image}
                  alt={banner.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8
                  }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      maxWidth: { xs: '80%', md: '50%' },
                      zIndex: 1
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      component="h1" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {banner.title}
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        mb: 3,
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        textShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}
                    >
                      {banner.description}
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      component={RouterLink}
                      to={banner.buttonLink}
                      sx={{
                        px: 4,
                        py: 1,
                        fontWeight: 600,
                        borderRadius: 2
                      }}
                    >
                      {banner.buttonText}
                    </Button>
                  </Box>
                </Container>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
      
      {/* Container for all other sections */}
      <Container maxWidth="xl">
        {/* Top Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ fontWeight: 700, mb: { xs: 1, sm: 0 } }}
            >
              Shop by Category
            </Typography>
            <Button 
              variant="outlined" 
              endIcon={<ArrowRightAlt />} 
              component={RouterLink}
              to="/categories"
              sx={{ borderRadius: 2 }}
            >
              View All Categories
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={6} sm={4} md={2} key={category.name}>
                <Card 
                  component={RouterLink}
                  to={`/categories/${category.name}`}
                  sx={{ 
                    height: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.image}
                    alt={category.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 2, flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Today's Deals Section */}
        <Paper sx={{ mb: 6, p: 3, borderRadius: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
              <LocalFireDepartment sx={{ color: 'error.main', mr: 1 }} />
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ fontWeight: 700 }}
              >
                Today's Deals
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="error" 
              component={RouterLink}
              to="/loot-deals"
              endIcon={<ArrowForward />}
              sx={{ borderRadius: 2 }}
            >
              See All Deals
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {topDeals.map((deal) => (
              <Grid item xs={6} sm={6} md={3} key={deal.id}>
                <Card sx={{ height: '100%', position: 'relative' }}>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      left: 10, 
                      bgcolor: 'error.main',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      zIndex: 1,
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}
                  >
                    SAVE {deal.discount}
                  </Box>
                  
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Box 
                      component="img"
                      src={deal.image}
                      alt={deal.name}
                      sx={{ 
                        height: 140, 
                        width: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ pt: 1 }}>
                    <Typography variant="subtitle1" noWrap fontWeight="medium">
                      {deal.name}
                    </Typography>
                    
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" color="error.main" fontWeight="bold">
                        {formatPrice(deal.dealPrice)}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          ml: 1, 
                          textDecoration: 'line-through',
                          color: 'text.secondary'
                        }}
                      >
                        {formatPrice(deal.originalPrice)}
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      <Timer fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        Ends in {renderCountdown(deal.endTime)}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      component={RouterLink}
                      to={`/product/${deal.id}`}
                      sx={{ borderRadius: 2 }}
                    >
                      View Deal
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Featured Products Section with Tabs */}
        <Paper sx={{ mb: 6, borderRadius: 2, overflow: 'hidden' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              bgcolor: 'background.paper',
              '& .MuiTab-root': {
                py: 2
              }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ mr: 1, fontSize: 20 }} />
                  <Typography>Trending Now</Typography>
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NewReleases sx={{ mr: 1, fontSize: 20 }} />
                  <Typography>New Arrivals</Typography>
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Whatshot sx={{ mr: 1, fontSize: 20 }} />
                  <Typography>Top Rated</Typography>
                </Box>
              } 
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Trending Products Tab */}
            {activeTab === 0 && (
              <Grid container spacing={3}>
                {trendingProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <CardActionArea 
                        component={RouterLink}
                        to={`/product/${product.id}`}
                      >
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                          <Box 
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{ 
                              height: 160, 
                              width: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                        
                        <CardContent sx={{ pt: 1, pb: 1 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {product.brand}
                          </Typography>
                          
                          <Typography variant="subtitle1" component="h3" gutterBottom noWrap>
                            {product.name}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating value={product.averageRating} precision={0.1} size="small" readOnly />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({product.averageRating})
                            </Typography>
                          </Box>
                          
                          <Typography variant="h6" fontWeight="bold" color="primary.main">
                            {formatPrice(product.price)}
                          </Typography>
                          
                          <Box 
                            sx={{ 
                              mt: 1,
                              display: 'flex',
                              alignItems: 'center',
                              color: 'success.main'
                            }}
                          >
                            <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="caption" fontWeight="medium">
                              {product.searches}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                      
                      <Box sx={{ p: 2, pt: 0, mt: 'auto', display: 'flex', gap: 1 }}>
                        <Button 
                          variant="contained"
                          fullWidth
                          size="small"
                          startIcon={<CompareArrows />}
                          sx={{ borderRadius: 2 }}
                        >
                          Compare
                        </Button>
                        <IconButton 
                          size="small"
                          color="primary"
                          sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}
                        >
                          <Favorite />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* New Arrivals Tab */}
            {activeTab === 1 && (
              <Grid container spacing={3}>
                {featuredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <Chip
                          label="New"
                          color="primary"
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            fontWeight: 'bold'
                          }}
                        />
                        
                        <CardActionArea 
                          component={RouterLink}
                          to={`/product/${product.id}`}
                        >
                          <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Box 
                              component="img"
                              src={product.image}
                              alt={product.name}
                              sx={{ 
                                height: 160, 
                                width: '100%',
                                objectFit: 'contain'
                              }}
                            />
                          </Box>
                          
                          <CardContent sx={{ pt: 1, pb: 1 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {product.brand}
                            </Typography>
                            
                            <Typography variant="subtitle1" component="h3" gutterBottom noWrap>
                              {product.name}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Rating value={product.averageRating} precision={0.1} size="small" readOnly />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                ({product.averageRating})
                              </Typography>
                            </Box>
                            
                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                              ₹{product.currentBestPrice.price}
                            </Typography>
                            
                            <Chip
                              label="Just Arrived"
                              variant="outlined"
                              color="info"
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </CardContent>
                        </CardActionArea>
                      </Box>
                      
                      <Box sx={{ p: 2, pt: 0, mt: 'auto', display: 'flex', gap: 1 }}>
                        <Button 
                          variant="contained"
                          fullWidth
                          size="small"
                          startIcon={<CompareArrows />}
                          sx={{ borderRadius: 2 }}
                        >
                          Compare
                        </Button>
                        <IconButton 
                          size="small"
                          color="primary"
                          sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}
                        >
                          <Favorite />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Top Rated Tab */}
            {activeTab === 2 && (
              <Grid container spacing={3}>
                {featuredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <Chip
                          label={product.discount}
                          color="error"
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            fontWeight: 'bold'
                          }}
                        />
                        
                        <CardActionArea 
                          component={RouterLink}
                          to={`/product/${product.id}`}
                        >
                          <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Box 
                              component="img"
                              src={product.image}
                              alt={product.name}
                              sx={{ 
                                height: 160, 
                                width: '100%',
                                objectFit: 'contain'
                              }}
                            />
                          </Box>
                          
                          <CardContent sx={{ pt: 1, pb: 1 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {product.brand}
                            </Typography>
                            
                            <Typography variant="subtitle1" component="h3" gutterBottom noWrap>
                              {product.name}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Rating value={product.averageRating} precision={0.1} size="small" readOnly />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                ({product.averageRating})
                              </Typography>
                            </Box>
                            
                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                              ₹{product.currentBestPrice.price}
                            </Typography>
                            
                            <Chip 
                              label={product.currentBestPrice.store} 
                              variant="outlined" 
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </CardContent>
                        </CardActionArea>
                      </Box>
                      
                      <Box sx={{ p: 2, pt: 0, mt: 'auto', display: 'flex', gap: 1 }}>
                        <Button 
                          variant="contained"
                          fullWidth
                          size="small"
                          sx={{ borderRadius: 2 }}
                        >
                          Compare Prices
                        </Button>
                        <IconButton 
                          size="small"
                          color="primary"
                          sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}
                        >
                          <Favorite />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Paper>

        {/* Recently Viewed Products */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Recently Viewed
          </Typography>
          
          <Grid container spacing={2}>
            {recentlyViewed.map((product) => (
              <Grid item xs={12} sm={4} key={product.id}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box 
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 80, height: 80, objectFit: 'contain' }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Viewed {product.viewedOn}
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      {formatPrice(product.price)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Popular Brands */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Popular Brands
          </Typography>
          
          <Grid container spacing={2}>
            {popularBrands.map((brand) => (
              <Grid item xs={4} sm={2} key={brand.name}>
                <Card 
                  component={RouterLink}
                  to={brand.link}
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textDecoration: 'none',
                    height: 100,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 2
                    }
                  }}
                >
                  <Box 
                    component="img"
                    src={brand.logo}
                    alt={brand.name}
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: '60px', 
                      objectFit: 'contain'
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Personalized Recommendations */}
        <Paper sx={{ mb: 6, p: 3, borderRadius: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
              <SmartToy sx={{ color: 'primary.main', mr: 1 }} />
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ fontWeight: 700 }}
              >
                Recommended For You
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Based on your browsing history
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {featuredProducts.slice(0, 3).map((product) => (
              <Grid item xs={12} sm={4} key={product.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardActionArea 
                    component={RouterLink}
                    to={`/product/${product.id}`}
                  >
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Box 
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{ 
                          height: 140, 
                          width: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                    
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {product.brand}
                      </Typography>
                      
                      <Typography variant="subtitle1" component="h3" gutterBottom noWrap>
                        {product.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ₹{product.currentBestPrice.price}
                        </Typography>
                        <Chip 
                          label={product.discount} 
                          color="error" 
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  
                  <Box sx={{ p: 2, pt: 0, mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      variant="outlined"
                      size="small"
                      startIcon={<CompareArrows />}
                    >
                      Compare
                    </Button>
                    <Button 
                      variant="contained"
                      size="small"
                    >
                      View Product
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
