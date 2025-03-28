import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, 
  Tabs, Tab, Button, Divider, Chip, Rating,
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow
} from '@mui/material';
import { FavoriteBorder, Notifications, ShoppingCart } from '@mui/icons-material';

// Placeholder data - would come from API in real implementation
const productData = {
  id: 'product123',
  name: 'Sample Product',
  brand: 'Brand Name',
  description: 'This is a detailed description of the sample product with all of its features and benefits.',
  mainImage: '/sample-product.jpg',
  additionalImages: ['/sample-1.jpg', '/sample-2.jpg', '/sample-3.jpg'],
  category: 'Electronics',
  averageRating: 4.5,
  numReviews: 128,
  specifications: {
    'Color': 'Black',
    'Weight': '300g',
    'Dimensions': '10 x 5 x 2 cm',
    'Material': 'Aluminum',
    'Warranty': '1 Year'
  },
  prices: [
    { store: 'Amazon', price: 499, url: '#', inStock: true },
    { store: 'Flipkart', price: 525, url: '#', inStock: true },
    { store: 'Myntra', price: 550, url: '#', inStock: false },
  ]
};

const ProductDetails = () => {
  const { id } = useParams(); // This variable will be used when API implementation is complete
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(productData.mainImage);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Product Name and Rating */}
      <Typography variant="h4" component="h1" gutterBottom>
        {productData.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating value={productData.averageRating} precision={0.5} readOnly />
        <Typography variant="body2" sx={{ ml: 1 }}>
          ({productData.numReviews} reviews)
        </Typography>
        <Chip 
          label={productData.brand} 
          variant="outlined" 
          size="small" 
          sx={{ ml: 2 }} 
        />
        <Chip 
          label={productData.category} 
          variant="outlined" 
          size="small" 
          sx={{ ml: 1 }} 
        />
      </Box>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <img 
              src={selectedImage} 
              alt={productData.name}
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
            />
          </Paper>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
            {[productData.mainImage, ...productData.additionalImages].map((img, idx) => (
              <Paper
                key={idx}
                elevation={1}
                sx={{ 
                  p: 1, 
                  cursor: 'pointer',
                  border: img === selectedImage ? '2px solid #1976d2' : 'none',
                  width: 80,
                  height: 80
                }}
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Product view ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* Product Info and Prices */}
        <Grid item xs={12} md={6}>
          {/* Price Comparison */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Price Comparison</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Store</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Availability</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productData.prices.map((price) => (
                    <TableRow key={price.store}>
                      <TableCell component="th" scope="row">
                        {price.store}
                      </TableCell>
                      <TableCell align="right">₹{price.price}</TableCell>
                      <TableCell align="center">
                        {price.inStock ? 
                          <Chip label="In Stock" color="success" size="small" /> : 
                          <Chip label="Out of Stock" color="error" size="small" />
                        }
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="contained" 
                          size="small" 
                          href={price.url}
                          disabled={!price.inStock}
                          endIcon={<ShoppingCart />}
                        >
                          Buy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<FavoriteBorder />}
              >
                Add to Wishlist
              </Button>
              <Button 
                variant="outlined"
                startIcon={<Notifications />}
              >
                Price Alert
              </Button>
            </Box>
          </Paper>

          {/* Product Description */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography variant="body2" paragraph>
              {productData.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>Specifications</Typography>
            <Grid container spacing={2}>
              {Object.entries(productData.specifications).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                  <Typography variant="body2" color="text.secondary">{key}:</Typography>
                  <Typography variant="body1">{value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Reviews and Additional Info Tabs */}
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Reviews" />
            <Tab label="Related Products" />
            <Tab label="Price History" />
          </Tabs>
        </Box>
        <Box sx={{ py: 3 }}>
          {tabValue === 0 && (
            <Typography>Reviews content will go here.</Typography>
          )}
          {tabValue === 1 && (
            <Typography>Related products will go here.</Typography>
          )}
          {tabValue === 2 && (
            <Typography>Price history chart will go here.</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
