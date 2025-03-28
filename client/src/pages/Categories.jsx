import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Typography, Grid, Box, Card, CardMedia, CardContent, 
  CardActionArea, Breadcrumbs, Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';
import ProductCard from '../components/ui/ProductCard';

const Categories = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  
  useEffect(() => {
    if (category) {
      dispatch(fetchProducts(1, 20, category));
    }
  }, [dispatch, category]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {category ? (
        <>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link component={RouterLink} to="/categories" underline="hover" color="inherit">
              Categories
            </Link>
            <Typography color="text.primary">{category}</Typography>
          </Breadcrumbs>
          
          <Typography variant="h4" component="h1" gutterBottom>
            {category}
          </Typography>
          
          {loading.products ? (
            <Loader text={`Loading ${category} products...`} />
          ) : error ? (
            <ErrorAlert error={error} />
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard 
                    product={product} 
                    onAddToWatchlist={() => {}} 
                    onRemoveFromWatchlist={() => {}} 
                    onAddToCompare={() => {}} 
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Browse Categories
          </Typography>
          
          <PopularCategories />
        </>
      )}
    </Container>
  );
};

const PopularCategories = () => {
  const categories = [
    { 
      name: 'Electronics',
      image: '/electronics.avif',
      description: 'Latest gadgets, laptops, smartphones, and more'
    },
    { 
      name: 'Fashion',
      image: '/fashion.avif',
      description: 'Clothing, accessories, footwear for all ages'
    },
    { 
      name: 'Home & Kitchen',
      image: '/home-kitchen.avif',
      description: 'Appliances, decor, furniture, and kitchenware'
    },
    { 
      name: 'Beauty',
      image: '/beauty.avif',
      description: 'Skincare, makeup, fragrances, and personal care'
    },
    { 
      name: 'Sports',
      image: '/sports.avif',
      description: 'Equipment, fitness gear, outdoor accessories'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.name}>
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
            <CardActionArea component={RouterLink} to={`/categories/${category.name}`}>
              <CardMedia
                component="img"
                height="180"
                image={category.image}
                alt={category.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
