import React from 'react';
import { 
  Container, Typography, Grid, Box, Card, CardContent, 
  CardMedia, Chip, Button, Divider, TextField, InputAdornment 
} from '@mui/material';
import { Search, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Blog = () => {
  // Sample blog post data - would come from API in real implementation
  const blogPosts = [
    {
      id: 1,
      slug: 'best-smartphones-2023',
      title: 'The Best Smartphones of 2023',
      excerpt: 'Our comprehensive guide to this year\'s top smartphones, comparing features, performance, and value.',
      image: '/blog/smartphones.jpg',
      date: 'October 15, 2023',
      author: 'Rahul Sharma',
      category: 'Technology'
    },
    {
      id: 2,
      slug: 'save-money-online-shopping',
      title: 'Top 10 Ways to Save Money While Shopping Online',
      excerpt: 'Learn expert strategies to maximize your savings when shopping on e-commerce platforms.',
      image: '/blog/online-shopping.jpg',
      date: 'October 3, 2023',
      author: 'Priya Patel',
      category: 'Shopping Tips'
    },
    {
      id: 3,
      slug: 'ai-shopping-assistants',
      title: 'How AI is Transforming Online Shopping',
      excerpt: 'Explore how artificial intelligence is revolutionizing the way we discover, compare, and purchase products online.',
      image: '/blog/ai-shopping.jpg',
      date: 'September 24, 2023',
      author: 'Vikram Malhotra',
      category: 'Technology'
    },
    // Add more posts as needed
  ];
  
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          DhanBchao Blog
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Shopping tips, product comparisons, and money-saving advice
        </Typography>
        
        <Box sx={{ display: 'flex', mt: 4 }}>
          <TextField
            placeholder="Search blog posts..."
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 500 }}
          />
        </Box>
      </Box>
      
      <Divider sx={{ mb: 6 }} />
      
      {/* Featured Post */}
      <Box sx={{ mb: 6 }}>
        <Card sx={{ display: { sm: 'flex' }, borderRadius: 2, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            sx={{ width: { sm: '40%' }, height: { xs: 240, sm: 'auto' } }}
            image="/blog/featured.jpg"
            alt="Featured post"
          />
          <CardContent sx={{ flex: '1 1 auto', p: 4 }}>
            <Chip label="Featured" color="primary" size="small" sx={{ mb: 2 }} />
            <Typography variant="h4" component="h2" gutterBottom>
              Complete Guide to Smart Price Comparison
            </Typography>
            <Typography variant="body1" paragraph>
              In this comprehensive guide, we explore how to effectively compare prices across different platforms, identify genuine deals, and make informed purchasing decisions.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                September 30, 2023 • By Admin
              </Typography>
              <Button 
                variant="outlined" 
                endIcon={<ArrowForward />}
                component={RouterLink}
                to="/blog/complete-guide-price-comparison"
              >
                Read More
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      {/* Blog Posts Grid */}
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Latest Posts
      </Typography>
      
      <Grid container spacing={4}>
        {blogPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Chip 
                  label={post.category} 
                  color="primary" 
                  size="small"
                  variant="outlined" 
                  sx={{ mb: 1 }} 
                />
                <Typography variant="h6" component="h3" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {post.excerpt}
                </Typography>
                <Typography variant="caption" color="text.secondary" paragraph>
                  {post.date} • By {post.author}
                </Typography>
                <Button 
                  component={RouterLink}
                  to={`/blog/${post.slug}`}
                  endIcon={<ArrowForward fontSize="small" />}
                  sx={{ mt: 2, px: 0 }}
                >
                  Read Article
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: 2, px: 4 }}
        >
          Load More Posts
        </Button>
      </Box>
    </Container>
  );
};

export default Blog;
