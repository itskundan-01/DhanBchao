import React from 'react';
import { 
  Container, Typography, Grid, Box, Paper, 
  Card, Button, List, ListItem, 
  ListItemIcon, ListItemText
} from '@mui/material';
import { 
  Search, CompareArrows, Analytics, Notifications, 
  TrendingDown, SmartToy, Speed, BarChart, MonetizationOn,
  Check, ArrowForward, VerifiedUser, LocalOffer, Person
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#f5f5f5' }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            mb: 6,
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
            color: 'white'
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            How DhanBchao Works
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Our AI-powered platform helps you make smarter shopping decisions and save money with intelligent price comparison.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            component={RouterLink}
            to="/categories"
            color="secondary"
            endIcon={<ArrowForward />}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontSize: '1.1rem'
            }}
          >
            Start Shopping Smarter
          </Button>
        </Paper>
        
        {/* Process Flow */}
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom 
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          How It Works - Four Simple Steps
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            {
              icon: <Search sx={{ fontSize: 60, color: '#4361ee' }} />,
              title: "Search & Find",
              description: "Enter the product you're interested in and DhanBchao will search across major e-commerce platforms in real-time."
            },
            {
              icon: <CompareArrows sx={{ fontSize: 60, color: '#3a0ca3' }} />,
              title: "Compare Options",
              description: "View detailed comparisons of prices, specs, and deals for identical products from different retailers."
            },
            {
              icon: <Analytics sx={{ fontSize: 60, color: '#4361ee' }} />,
              title: "Analyze Value",
              description: "Our AI analyzes price history, reviews sentiment, and specifications to determine the best overall value."
            },
            {
              icon: <Notifications sx={{ fontSize: 60, color: '#3a0ca3' }} />,
              title: "Track & Save",
              description: "Set price alerts to get notified when prices drop on items in your watchlist to maximize savings."
            }
          ].map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{ 
                  height: '100%',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
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
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}
                >
                  {index + 1}
                </Box>
                <Box sx={{ mb: 2 }}>
                  {step.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  {step.title}
                </Typography>
                <Typography variant="body1">
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {/* Our Technology */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mb: 6, borderRadius: 4 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            fontWeight="bold" 
            sx={{ mb: 5 }}
          >
            Our AI Technology
          </Typography>
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/ai-technology.jpg" 
                alt="AI Technology"
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: 3
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
                What Makes Us Different
              </Typography>
              <Typography variant="body1" paragraph>
                DhanBchao leverages cutting-edge artificial intelligence and machine learning to revolutionize how you shop online. Our platform doesn't just compare prices—it analyzes multiple factors to help you make truly informed decisions.
              </Typography>
              
              <List sx={{ mt: 3 }}>
                {[
                  {
                    icon: <SmartToy color="primary" />,
                    title: "AI-Powered Analysis",
                    description: "Our algorithms analyze millions of data points across retailers to find the best options"
                  },
                  {
                    icon: <Speed color="primary" />,
                    title: "Real-Time Price Tracking",
                    description: "Continuous monitoring of price changes to identify genuine deals versus marketing tactics"
                  },
                  {
                    icon: <BarChart color="primary" />,
                    title: "Review Sentiment Analysis",
                    description: "NLP technology that reads between the lines of customer reviews to highlight pros and cons"
                  },
                  {
                    icon: <TrendingDown color="primary" />,
                    title: "Price Prediction",
                    description: "Advanced forecasting that suggests when prices might drop based on historical patterns"
                  }
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="h6">{item.title}</Typography>} 
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
        
        {/* User Benefits */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 5 }}
          >
            Benefits for You
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <MonetizationOn sx={{ fontSize: 50, color: '#ff9e00' }} />,
                title: "Save Money",
                description: "Find the lowest prices across all major e-commerce platforms and track price drops automatically.",
                color: '#fff8e6'
              },
              {
                icon: <VerifiedUser sx={{ fontSize: 50, color: '#06d6a0' }} />,
                title: "Shop with Confidence",
                description: "Get comprehensive information about products, including quality, reliability, and value for money.",
                color: '#e6fff8'
              },
              {
                icon: <LocalOffer sx={{ fontSize: 50, color: '#ef476f' }} />,
                title: "Never Miss a Deal",
                description: "Set alerts for price drops and limited-time offers on products you're interested in.",
                color: '#ffedf2'
              },
              {
                icon: <Person sx={{ fontSize: 50, color: '#4361ee' }} />,
                title: "Personalized Recommendations",
                description: "Get product suggestions based on your preferences, browsing history, and budget requirements.",
                color: '#eef1ff'
              }
            ].map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  elevation={2}
                  sx={{ 
                    p: 4,
                    display: 'flex',
                    height: '100%',
                    borderRadius: 4,
                    bgcolor: benefit.color
                  }}
                >
                  <Box sx={{ pr: 3 }}>
                    {benefit.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body1">
                      {benefit.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Getting Started */}
        <Paper 
          elevation={3}
          sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            mb: 6,
            background: 'linear-gradient(135deg, #ff9e00 0%, #ff7300 100%)',
            color: 'white'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                Ready to Start Saving?
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4 }}>
                Join thousands of smart shoppers who are already saving time and money with DhanBchao.
              </Typography>
              
              <List>
                {[
                  "Create a free account in seconds",
                  "Start comparing products across platforms",
                  "Set price alerts for items you're interested in",
                  "Track your potential savings over time"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ p: 1 }}>
                    <ListItemIcon>
                      <Check sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/auth"
                sx={{ mt: 2, py: 1.5, px: 4, borderRadius: 2 }}
              >
                Create Free Account
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="/savings-illustration.png"
                alt="Savings Illustration"
                sx={{ 
                  width: '100%',
                  borderRadius: 3
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        
        {/* FAQs Preview */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Frequently Asked Questions
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}
          >
            Have questions about how DhanBchao works? Here are some common questions we receive.
          </Typography>
          
          <Grid container spacing={3}>
            {[
              {
                question: "Is DhanBchao completely free to use?",
                answer: "Yes, DhanBchao is completely free for all users. We make money through affiliate partnerships when you purchase through our links, but this never affects the prices you see."
              },
              {
                question: "How accurate are the price comparisons?",
                answer: "Our price comparisons are updated in real-time by scanning major e-commerce platforms multiple times daily to ensure you always see the most current pricing information."
              },
              {
                question: "Can I track price history for products?",
                answer: "Yes, DhanBchao tracks price history for all products in our database, allowing you to see how prices have changed over time and identify the best time to buy."
              },
              {
                question: "How do I set up price alerts?",
                answer: "Simply create an account, find the product you're interested in, and click the 'Set Price Alert' button. You can set your desired price, and we'll notify you when it drops to that level."
              }
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={1} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">
                    {faq.question}
                  </Typography>
                  <Typography variant="body1">
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/faq"
              endIcon={<ArrowForward />}
              sx={{ borderRadius: 2, px: 4 }}
            >
              View All FAQs
            </Button>
          </Box>
        </Box>
        
        {/* Final CTA */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Start Making Smarter Shopping Decisions Today
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 700, mx: 'auto' }}>
            Join DhanBchao and never overpay for your favorite products again.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/categories"
            sx={{ mt: 2, py: 1.5, px: 5, borderRadius: 2 }}
          >
            Start Comparing Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
