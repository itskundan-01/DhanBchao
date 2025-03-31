import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Grid, Box, Button, Paper, Card, 
  CardContent, CardMedia, Rating, CardActionArea,
  Stack, Chip, Avatar, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { 
  ArrowForward, Search, CompareArrows, 
  Timer, TrendingDown, Discount, FlashOn,
  SmartToy, Savings, ArrowRightAlt, CheckCircle,
  Whatshot, Bolt, LocalFireDepartment, RateReview,
  VerifiedUser, LocalMall, ArrowDownward, Speed
} from '@mui/icons-material';

// Sample featured products
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

// Category data
const categories = [
  { 
    name: 'Electronics',
    image: '/electronics.avif',
    description: 'Latest gadgets, laptops, smartphones',
    count: 1240
  },
  { 
    name: 'Fashion',
    image: '/fashion.webp',
    description: 'Clothing, accessories, footwear',
    count: 890
  },
  { 
    name: 'Home & Kitchen',
    image: '/kitchenhome.jpg',
    description: 'Appliances, decor, furniture',
    count: 750
  },
  { 
    name: 'Beauty',
    image: '/beauty.webp',
    description: 'Skincare, makeup, fragrances',
    count: 520
  }
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section with Gradient Background */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #0a3d70 100%)',
          color: 'white', 
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative circles */}
        <Box 
          sx={{ 
            position: 'absolute', 
            width: 300, 
            height: 300, 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.05)',
            top: -100,
            right: -100
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            width: 200, 
            height: 200, 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.05)',
            bottom: -50,
            left: -50
          }} 
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                AI-Powered <br/>
                <Box component="span" sx={{ color: '#ff9e40' }}>Product Comparisons</Box>
              </Typography>
              <Typography 
                variant="h5" 
                paragraph
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  maxWidth: 500,
                  lineHeight: 1.5
                }}
              >
                We scan e-commerce platforms in real-time, compare prices, analyze reviews, and provide AI-powered recommendations to help you make the best purchase decisions.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  component={RouterLink}
                  to="/categories"
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                    backgroundColor: 'white',
                    color: '#1976d2',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  Start Comparing
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={RouterLink}
                  to="/how-it-works"
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  How It Works
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  maxWidth: 500
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                    }
                  }}
                >
                  <img 
                    src="/placeholder-hero.jpg" 
                    alt="AI Product Comparison"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                
                {/* Floating price tags */}
                <Paper
                  elevation={6}
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    borderRadius: 2,
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <ArrowDownward color="success" />
                  <Typography color="success.main" fontWeight="bold">
                    Real-time price tracking
                  </Typography>
                </Paper>
                
                <Paper
                  elevation={6}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: -15,
                    borderRadius: 2,
                    p: 1.5,
                    backgroundColor: '#ff6d00',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <SmartToy sx={{ color: 'white' }} />
                  <Typography color="white" fontWeight="bold">
                    AI-Powered Analysis
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section - Redesigned with steps */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            How MahaLoot Works
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Our advanced platform scans multiple e-commerce sites to deliver comprehensive product comparisons
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <Search sx={{ fontSize: 40, color: '#1976d2' }} />,
              title: 'Data Collection',
              description: 'We scan multiple e-commerce platforms in real-time to gather product information, prices, and reviews.',
              step: 1
            },
            {
              icon: <CompareArrows sx={{ fontSize: 40, color: '#ff6d00' }} />,
              title: 'Automated Analysis',
              description: 'Our AI algorithms analyze product specifications, price histories, and review sentiment across platforms.',
              step: 2
            },
            {
              icon: <SmartToy sx={{ fontSize: 40, color: '#2e7d32' }} />,
              title: 'AI Recommendations',
              description: 'Our recommendation engine evaluates all factors to suggest the best product based on your preferences.',
              step: 3
            },
            {
              icon: <Savings sx={{ fontSize: 40, color: '#9c27b0' }} />,
              title: 'Smart Decision',
              description: 'Make informed purchases with complete confidence, backed by data-driven insights and analysis.',
              step: 4
            }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {item.step}
                </Box>
                <Box sx={{ mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Loot Deals Feature Section - New Addition */}
      <Box 
        sx={{ 
          backgroundColor: '#fcf0f4',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background pattern */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("/pattern-dots.svg")',
            opacity: 0.05,
            backgroundSize: '40px',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -30, 
                    left: -20, 
                    transform: 'rotate(-15deg)',
                    bgcolor: '#ef476f', 
                    color: 'white', 
                    py: 1, 
                    px: 3, 
                    borderRadius: 2,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(239, 71, 111, 0.3)',
                    zIndex: 1
                  }}
                >
                  <FlashOn sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  MASSIVE SAVINGS
                </Box>
                
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    transform: 'perspective(1000px) rotateY(5deg)',
                    height: { xs: 300, md: 400 },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)',
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    image="lootimg.jpeg"
                    alt="Loot Deals Preview"
                    sx={{ 
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{ position: 'absolute', top: 40, left: 40, maxWidth: '50%' }}>
                    <Chip 
                      icon={<Bolt />} 
                      label="LIMITED TIME" 
                      sx={{ 
                        bgcolor: '#ef476f', 
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 2
                      }} 
                    />
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 800,
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        mb: 1
                      }}
                    >
                      Flash Deals up to 90% Off
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'white',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        mb: 3
                      }}
                    >
                      Exclusive offers that disappear fast
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    color: '#ef476f',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <LocalFireDepartment sx={{ mr: 1, fontSize: 36 }} />
                  Loot Deals
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ fontWeight: 500, mb: 3 }}
                >
                  Heavily discounted products with limited-time offers
                </Typography>
                <Typography paragraph sx={{ mb: 4 }}>
                  Our AI algorithms constantly scan e-commerce platforms to identify flash sales, 
                  clearance items, and limited-time offers with the biggest discounts. 
                  Get notified instantly when products in your watchlist go on massive sales.
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {[
                    { 
                      icon: <Timer sx={{ color: '#ef476f' }} />, 
                      title: "Time-Limited Offers", 
                      desc: "Deals that expire quickly with countdown timers" 
                    },
                    { 
                      icon: <TrendingDown sx={{ color: '#ef476f' }} />, 
                      title: "Price Drop Alerts", 
                      desc: "Get notified when prices fall dramatically" 
                    },
                    { 
                      icon: <Discount sx={{ color: '#ef476f' }} />, 
                      title: "Verified Discounts", 
                      desc: "We confirm discounts are truly below normal price" 
                    },
                    { 
                      icon: <FlashOn sx={{ color: '#ef476f' }} />, 
                      title: "Lightning Fast Updates", 
                      desc: "Real-time monitoring of major flash sales" 
                    }
                  ].map((item, i) => (
                    <Grid item xs={6} key={i}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(239, 71, 111, 0.1)',
                            color: '#ef476f',
                            width: 40,
                            height: 40
                          }}
                        >
                          {item.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/loot-deals"
                  endIcon={<ArrowForward />}
                  sx={{ 
                    py: 1.5,
                    px: 4,
                    bgcolor: '#ef476f',
                    '&:hover': {
                      bgcolor: '#d31c48'
                    },
                    fontWeight: 'bold'
                  }}
                >
                  Explore All Loot Deals
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* AI Features Section - New addition */}
      <Box 
        sx={{ 
          backgroundColor: '#f0f7ff',
          py: { xs: 6, md: 10 } 
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              AI-Powered Features
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              How our technology helps you make better shopping decisions
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <Speed sx={{ fontSize: 50, color: '#1976d2' }}/>,
                title: "Real-Time Price Tracking",
                description: "Our system continuously monitors prices across major e-commerce platforms to find the best deals and track price history."
              },
              {
                icon: <RateReview sx={{ fontSize: 50, color: '#ff6d00' }}/>,
                title: "Review Sentiment Analysis",
                description: "Our AI analyzes customer reviews to identify common praises and complaints, giving you the real story beyond star ratings."
              },
              {
                icon: <VerifiedUser sx={{ fontSize: 50, color: '#2e7d32' }}/>,
                title: "Warranty & Support Comparison",
                description: "We evaluate warranty terms, return policies, and customer support quality to ensure you're protected after purchase."
              },
              {
                icon: <LocalMall sx={{ fontSize: 50, color: '#9c27b0' }}/>,
                title: "Personalized Recommendations",
                description: "Based on your preferences, budget, and usage needs, our AI recommends the best product that truly matches what you're looking for."
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 4,
                    height: '100%', 
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    textAlign: { xs: 'center', sm: 'left' },
                    gap: 3
                  }}
                >
                  <Box sx={{ mt: { xs: 0, sm: 1 } }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Popular Categories Section - Redesigned with better cards */}
      <Box 
        sx={{ 
          backgroundColor: '#f8f9fa',
          py: { xs: 6, md: 10 }
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 5,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ fontWeight: 700 }}
              >
                Popular Categories
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Browse products across these categories for instant comparisons
              </Typography>
            </Box>
            <Button 
              variant="outlined"
              component={RouterLink}
              to="/categories"
              endIcon={<ArrowRightAlt />}
              sx={{ borderRadius: 2, px: 3 }}
            >
              View All Categories
            </Button>
          </Box>

          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.name}>
                <Card 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardActionArea 
                    component={RouterLink} 
                    to={`/categories/${category.name}`}
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={category.image}
                        alt={category.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          borderRadius: 5,
                          px: 1,
                          py: 0.5
                        }}
                      >
                        <Typography variant="body2" color="white" fontWeight="medium">
                          {category.count}+ products
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {category.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="primary" fontWeight="medium">
                          Browse Category
                        </Typography>
                        <ArrowForward sx={{ ml: 1, fontSize: 16 }} color="primary" />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Products Section - With real product cards */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip 
            label="AI-Recommended" 
            color="error" 
            icon={<Whatshot />} 
            sx={{ mb: 2 }} 
          />
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Top Rated Products
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Products with excellent price-to-performance ratio based on our analysis
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box 
                  component={RouterLink}
                  to={`/product/${product.id}`}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image || '/placeholder-product.jpg'}
                      alt={product.name}
                      sx={{ objectFit: 'contain', p: 2, bgcolor: '#f9f9f9' }}
                    />
                    <Chip
                      label={product.discount}
                      color="error"
                      size="small"
                      sx={{ 
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ pb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.brand}
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom 
                      noWrap 
                      sx={{ fontWeight: 'medium' }}
                    >
                      {product.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating 
                        value={product.averageRating} 
                        precision={0.5} 
                        readOnly 
                        size="small" 
                      />
                      <Typography variant="body2" sx={{ ml: 1 }} color="text.secondary">
                        ({product.averageRating})
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        ₹{product.currentBestPrice.price}
                      </Typography>
                      <Chip 
                        label={product.currentBestPrice.store} 
                        variant="outlined" 
                        size="small" 
                      />
                    </Box>
                  </CardContent>
                </Box>
                
                <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    component={RouterLink}
                    to={`/product/${product.id}`}
                    sx={{ borderRadius: 2 }}
                  >
                    Compare Prices
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForward />} 
            size="large"
            component={RouterLink}
            to="/categories"
            sx={{ borderRadius: 2, px: 4 }}
          >
            View More Products
          </Button>
        </Box>
      </Container>

      {/* Data-Driven Decision Making Section */}
      <Box 
        sx={{ 
          backgroundColor: '#f0f7ff',
          py: { xs: 6, md: 10 } 
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Data-Driven Decision Making
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Our AI comparison engine goes beyond simple price matching. We analyze multiple factors to help you make truly informed buying decisions.
              </Typography>
              
              <List>
                {[
                  "Price history tracking across platforms to identify true discounts",
                  "Comprehensive review analysis evaluating user experiences",
                  "Detailed specification comparisons to match products to your needs",
                  "Warranty and after-sales support quality assessment",
                  "Price-to-performance ratio evaluation for best value recommendation"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Button 
                variant="contained"
                size="large" 
                sx={{ mt: 2 }}
                component={RouterLink}
                to="/how-it-works"
              >
                Learn More About Our Technology
              </Button>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  height: '100%',
                  minHeight: 400
                }}
              >
                <img 
                  src="/aianalysis.jpeg" 
                  alt="AI Analysis Dashboard" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call-To-Action Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1976d2 0%, #0a3d70 100%)',
              color: 'white'
            }}
          >
            <SmartToy sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Let AI Do The Research
            </Typography>
            <Typography 
              variant="h6" 
              paragraph
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto' 
              }}
            >
              Save hours of research by letting our AI analyze thousands of products, reviews, and prices to find your perfect match.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/categories"
              sx={{ 
                py: 1.5, 
                px: 4, 
                backgroundColor: 'white',
                color: '#1976d2',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                },
                borderRadius: 2,
                fontSize: '1.1rem'
              }}
            >
              Start Comparing Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
