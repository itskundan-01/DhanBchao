import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, Divider, Chip, Avatar,
  Button, Card, CardMedia, CardContent, Grid
} from '@mui/material';
import { ArrowBack, CalendarToday, Person } from '@mui/icons-material';

const BlogPost = () => {
  // Using slug to fetch the blog post data (even though we're using mock data for now)
  // eslint-disable-next-line no-unused-vars
  const { slug } = useParams();
  
  // In a real app, you would fetch the blog post data from an API
  // For this example, we'll use mock data
  const post = {
    title: 'Complete Guide to Smart Price Comparison',
    author: 'Admin',
    date: 'September 30, 2023',
    featuredImage: '/blog/featured.jpg',
    category: 'Shopping Tips',
    content: `
      <p>In the digital age, price comparison has become an essential skill for any savvy shopper. With countless online retailers offering the same products at different price points, finding the best deal can save you significant money over time.</p>
      
      <h2>Why Price Comparison Matters</h2>
      <p>Price comparison isn't just about finding the lowest price. It's about understanding the overall value of your purchase. This includes considering factors like warranty, shipping costs, return policies, and seller reputation.</p>
      
      <p>MahaLoot's platform simplifies this process by gathering information from multiple sources and presenting it in a clear, easy-to-understand format. Our AI technology even analyzes price history to determine if a "sale" is actually a good deal or just a marketing tactic.</p>
      
      <h2>Tips for Effective Price Comparison</h2>
      <ul>
        <li>Look beyond the base price - consider shipping, taxes, and fees</li>
        <li>Check price history to ensure you're getting a genuine discount</li>
        <li>Consider warranty terms and return policies</li>
        <li>Read reviews from multiple sources</li>
        <li>Use MahaLoot tools to automate comparison across platforms</li>
      </ul>
      
      <h2>Using AI to Enhance Your Shopping Experience</h2>
      <p>Our advanced AI algorithms don't just compare prices - they analyze products based on specifications, reviews, brand reputation, and more to help you find the best value for your money.</p>
      
      <p>By setting price alerts, you can also be notified when a product you're interested in drops to your target price, ensuring you never miss a deal.</p>
    `,
    relatedPosts: [
      {
        id: 1,
        slug: 'best-smartphones-2023',
        title: 'The Best Smartphones of 2023',
        image: '/blog/smartphones.jpg'
      },
      {
        id: 2,
        slug: 'save-money-online-shopping',
        title: 'Top 10 Ways to Save Money While Shopping Online',
        image: '/blog/online-shopping.jpg'
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button 
        startIcon={<ArrowBack />}
        component={RouterLink}
        to="/blog"
        sx={{ mb: 4 }}
      >
        Back to All Posts
      </Button>
      
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 6 }}>
        {/* Featured Image */}
        <Box
          component="img"
          src={post.featuredImage}
          alt={post.title}
          sx={{
            width: '100%',
            height: { xs: 200, md: 400 },
            objectFit: 'cover'
          }}
        />
        
        {/* Content */}
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          {/* Category */}
          <Chip label={post.category} color="primary" size="small" sx={{ mb: 2 }} />
          
          {/* Title */}
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            {post.title}
          </Typography>
          
          {/* Author and Date */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ mr: 2 }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{post.author}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday fontSize="small" sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Published on {post.date}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Blog Content */}
          <Box sx={{ my: 4 }}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          {/* Related Posts */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Related Articles
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {post.relatedPosts.map(relatedPost => (
                <Grid item xs={12} sm={6} key={relatedPost.id}>
                  <Card component={RouterLink} to={`/blog/${relatedPost.slug}`} sx={{ display: 'flex', textDecoration: 'none', color: 'inherit' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 100 }}
                      image={relatedPost.image}
                      alt={relatedPost.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{relatedPost.title}</Typography>
                      <Button size="small" color="primary" sx={{ mt: 1, p: 0 }}>
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogPost;
