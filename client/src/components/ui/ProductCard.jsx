import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  Button,
  Chip,
  IconButton,
  CardActions,
  Tooltip
} from '@mui/material';
import { FavoriteBorder, Favorite, CompareArrows } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../redux/actions/userActions';
import { addToCompare } from '../../redux/actions/productActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector(state => state.user);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const {
    id,
    name,
    image,
    brand,
    averageRating = 0,
    currentBestPrice = {}
  } = product;

  // Check if product is in watchlist
  const isInWatchlist = watchlist?.some(item => item.id === id);

  // Format price using Indian numbering system
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToWatchlist = () => {
    if (!isAuthenticated) {
      // Redirect to auth page or show login prompt
      return;
    }
    dispatch(addToWatchlist(id));
  };

  const handleRemoveFromWatchlist = () => {
    dispatch(removeFromWatchlist(id));
  };

  const handleAddToCompare = () => {
    dispatch(addToCompare(product));
  };

  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Box
        component={RouterLink}
        to={`/product/${id}`}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component="img"
          height="200"
          image={image || '/placeholder-product.jpg'}
          alt={name}
          sx={{ objectFit: 'contain', p: 2 }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {brand}
          </Typography>
          
          <Typography variant="h6" component="div" gutterBottom noWrap>
            {name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={averageRating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({averageRating})
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            {currentBestPrice.price ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="primary">
                  {formatPrice(currentBestPrice.price)}
                </Typography>
                <Chip 
                  label={currentBestPrice.store} 
                  size="small" 
                  variant="outlined" 
                />
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Price not available
              </Typography>
            )}
          </Box>
        </CardContent>
      </Box>

      <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
        {isInWatchlist ? (
          <Tooltip title="Remove from watchlist">
            <IconButton color="primary" onClick={handleRemoveFromWatchlist}>
              <Favorite />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={isAuthenticated ? "Add to watchlist" : "Sign in to add to watchlist"}>
            <IconButton onClick={handleAddToWatchlist}>
              <FavoriteBorder />
            </IconButton>
          </Tooltip>
        )}
        <Button 
          size="small" 
          startIcon={<CompareArrows />}
          onClick={handleAddToCompare}
        >
          Compare
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
