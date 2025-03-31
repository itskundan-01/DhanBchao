import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, 
  Tabs, Tab, Button, Divider, Chip, Rating,
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Alert
} from '@mui/material';
import { 
  FavoriteBorder, Favorite,
  ShoppingCart, NotificationsActive 
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../redux/actions/productActions';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/userActions';
import PriceHistoryChart from '../components/ui/PriceHistoryChart';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';

const ProductDetails = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.products);
  const { watchlist } = useSelector(state => state.user);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.mainImage) {
      setSelectedImage(product.mainImage);
    }
  }, [product]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Check if product is in watchlist
  const isInWatchlist = watchlist?.some(item => item.id === id);

  const handleToggleWatchlist = () => {
    if (!isAuthenticated) {
      // Redirect to auth or show login prompt
      return;
    }

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(id));
    } else {
      dispatch(addToWatchlist(id));
    }
  };

  const handleSetPriceAlert = () => {
    // Implementation for price alert functionality
    console.log('Set price alert for product', id);
  };

  if (loading) {
    return <Loader text="Loading product details..." />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Product Name and Rating */}
      <Typography variant="h4" component="h1" gutterBottom>
        {product.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating value={product.averageRating} precision={0.5} readOnly />
        <Typography variant="body2" sx={{ ml: 1 }}>
          ({product.numReviews} reviews)
        </Typography>
        <Chip 
          label={product.brand} 
          variant="outlined" 
          size="small" 
          sx={{ ml: 2 }} 
        />
        <Chip 
          label={product.category} 
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
              src={selectedImage || product.mainImage} 
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
            />
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
            {[product.mainImage, ...(product.additionalImages || [])].map((img, idx) => (
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
                  {product.prices?.map((price) => (
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
                startIcon={isInWatchlist ? <Favorite /> : <FavoriteBorder />}
                onClick={handleToggleWatchlist}
                color={isInWatchlist ? "primary" : "inherit"}
              >
                {isInWatchlist ? 'Remove from Watchlist' : 'Add to Wishlist'}
              </Button>
              <Button 
                variant="outlined"
                startIcon={<NotificationsActive />}
                onClick={handleSetPriceAlert}
              >
                Price Alert
              </Button>
            </Box>
          </Paper>

          {/* Product Description */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography variant="body2" paragraph>
              {product.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>Specifications</Typography>
            <Grid container spacing={2}>
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
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
            <Box>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map(review => (
                  <Box key={review.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2">{review.userName}</Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="body2">{review.comment}</Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))
              ) : (
                <Typography>No reviews yet. Be the first to review this product!</Typography>
              )}
            </Box>
          )}
          {tabValue === 1 && (
            <Typography>Related products will appear here based on category and user preferences.</Typography>
          )}
          {tabValue === 2 && (
            product.priceHistory ? 
              <PriceHistoryChart priceHistory={product.priceHistory} /> : 
              <Typography>No price history available for this product yet.</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
