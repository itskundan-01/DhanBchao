import React, { useState } from 'react';
import { 
  Container, Typography, Grid, Paper, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TextField, Autocomplete,
  Button, Chip, Rating, IconButton
} from '@mui/material';
import { Delete, CompareArrows, Add } from '@mui/icons-material';

// Placeholder data for demonstration
const sampleProducts = [
  {
    id: 'product1',
    name: 'Samsung Galaxy S21',
    image: '/sample-product1.jpg',
    category: 'Electronics',
    brand: 'Samsung',
    averageRating: 4.5,
    prices: {
      'Amazon': 799,
      'Flipkart': 820,
      'Croma': 849
    },
    specifications: {
      'Display': '6.2" Dynamic AMOLED',
      'Processor': 'Exynos 2100',
      'RAM': '8GB',
      'Storage': '128GB',
      'Camera': '12MP + 12MP + 64MP',
      'Battery': '4000mAh'
    }
  },
  {
    id: 'product2',
    name: 'iPhone 13',
    image: '/sample-product2.jpg',
    category: 'Electronics',
    brand: 'Apple',
    averageRating: 4.7,
    prices: {
      'Amazon': 899,
      'Flipkart': 879,
      'Croma': 899
    },
    specifications: {
      'Display': '6.1" Super Retina XDR',
      'Processor': 'A15 Bionic',
      'RAM': '4GB',
      'Storage': '128GB',
      'Camera': '12MP + 12MP',
      'Battery': '3240mAh'
    }
  },
  {
    id: 'product3',
    name: 'Google Pixel 6',
    image: '/sample-product3.jpg',
    category: 'Electronics',
    brand: 'Google',
    averageRating: 4.6,
    prices: {
      'Amazon': 749,
      'Flipkart': 759,
      'Croma': 799
    },
    specifications: {
      'Display': '6.4" AMOLED',
      'Processor': 'Google Tensor',
      'RAM': '8GB',
      'Storage': '128GB',
      'Camera': '50MP + 12MP',
      'Battery': '4614mAh'
    }
  }
];

const specOrder = ['Display', 'Processor', 'RAM', 'Storage', 'Camera', 'Battery'];
const stores = ['Amazon', 'Flipkart', 'Croma'];

const Compare = () => {
  const [productsToCompare, setProductsToCompare] = useState(sampleProducts.slice(0, 2));
  const [productToAdd, setProductToAdd] = useState(null);

  const handleAddProduct = () => {
    if (productToAdd && !productsToCompare.some(p => p.id === productToAdd.id)) {
      setProductsToCompare([...productsToCompare, productToAdd]);
      setProductToAdd(null);
    }
  };

  const handleRemoveProduct = (productId) => {
    setProductsToCompare(productsToCompare.filter(p => p.id !== productId));
  };

  const getBestPrice = (product) => {
    const prices = Object.values(product.prices);
    return Math.min(...prices);
  };

  const getBestStore = (product) => {
    const bestPrice = getBestPrice(product);
    return Object.entries(product.prices).find(([_, price]) => price === bestPrice)[0];
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Compare Products
      </Typography>
      
      {/* Product Selection */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={sampleProducts.filter(p => !productsToCompare.some(cp => cp.id === p.id))}
              getOptionLabel={(option) => option.name}
              value={productToAdd}
              onChange={(_, newValue) => setProductToAdd(newValue)}
              renderInput={(params) => <TextField {...params} label="Add a product to compare" />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddProduct}
              disabled={!productToAdd}
            >
              Add to Comparison
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Comparison Table */}
      {productsToCompare.length > 0 ? (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            {/* Header */}
            <TableHead>
              <TableRow>
                <TableCell>Features</TableCell>
                {productsToCompare.map((product) => (
                  <TableCell key={product.id} align="center" sx={{ minWidth: 200 }}>
                    <Box sx={{ position: 'relative' }}>
                      <IconButton 
                        size="small" 
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          objectFit: 'contain',
                          display: 'block',
                          mx: 'auto',
                          mb: 2
                        }}
                      />
                      <Typography variant="subtitle1" gutterBottom>
                        {product.name}
                      </Typography>
                      <Chip 
                        label={`Best: ₹${getBestPrice(product)} at ${getBestStore(product)}`} 
                        color="primary" 
                        size="small" 
                      />
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            
            {/* Body */}
            <TableBody>
              {/* Basic Info */}
              <TableRow>
                <TableCell component="th" scope="row">Brand</TableCell>
                {productsToCompare.map((product) => (
                  <TableCell key={product.id} align="center">
                    {product.brand}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Rating</TableCell>
                {productsToCompare.map((product) => (
                  <TableCell key={product.id} align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Rating value={product.averageRating} precision={0.1} readOnly size="small" />
                    </Box>
                  </TableCell>
                ))}
              </TableRow>

              {/* Prices */}
              <TableRow>
                <TableCell colSpan={productsToCompare.length + 1} sx={{ bgcolor: 'background.default' }}>
                  <Typography variant="h6">Price Comparison</Typography>
                </TableCell>
              </TableRow>
              {stores.map((store) => (
                <TableRow key={store}>
                  <TableCell component="th" scope="row">{store}</TableCell>
                  {productsToCompare.map((product) => (
                    <TableCell key={product.id} align="center">
                      ₹{product.prices[store] || 'N/A'}
                      {product.prices[store] && 
                        product.prices[store] === getBestPrice(product) && 
                        <Chip 
                          label="Best Price" 
                          color="secondary" 
                          size="small" 
                          sx={{ ml: 1 }}
                        />
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Specifications */}
              <TableRow>
                <TableCell colSpan={productsToCompare.length + 1} sx={{ bgcolor: 'background.default' }}>
                  <Typography variant="h6">Specifications</Typography>
                </TableCell>
              </TableRow>
              {specOrder.map((spec) => (
                <TableRow key={spec}>
                  <TableCell component="th" scope="row">{spec}</TableCell>
                  {productsToCompare.map((product) => (
                    <TableCell key={product.id} align="center">
                      {product.specifications[spec] || 'N/A'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
          <CompareArrows sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No products selected for comparison
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add products above to start comparing their features and prices.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Compare;
