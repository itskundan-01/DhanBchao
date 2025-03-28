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
  CardActions
} from '@mui/material';
import { FavoriteBorder, Favorite, CompareArrows } from '@mui/icons-material';

const ProductCard = ({
  product,
  isInWatchlist = false,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  onAddToCompare
}) => {
  const {
    id,
    name,
    image,
    brand,
    averageRating = 0,
    currentBestPrice = {}
  } = product;

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
                  ₹{currentBestPrice.price}
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
          <IconButton color="primary" onClick={() => onRemoveFromWatchlist(id)}>
            <Favorite />
          </IconButton>
        ) : (
          <IconButton onClick={() => onAddToWatchlist(id)}>
            <FavoriteBorder />
          </IconButton>
        )}
        <Button 
          size="small" 
          startIcon={<CompareArrows />}
          onClick={() => onAddToCompare(product)}
        >
          Compare
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
