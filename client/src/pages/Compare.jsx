import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Grid, Box, Button, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, IconButton, Chip, Autocomplete
} from '@mui/material';
import {
  Delete, Add, CompareArrows, ArrowBackIos, Clear
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCompare, clearCompare, fetchProduct } from '../redux/actions/productActions';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';

// Note: This sample data will be replaced with data from Redux state after API integration
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
      'Flipkart': 779,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get comparison products from Redux state
  const { products, compareList, loading, error } = useSelector(state => state.products);
  
  const [productToAdd, setProductToAdd] = useState(null);

  // For now, use compareList from Redux if it exists, otherwise use sample data
  const productsToCompare = compareList.length > 0 ? compareList : sampleProducts.slice(0, 2);

  const handleAddProduct = () => {
    if (productToAdd) {
      dispatch(fetchProduct(productToAdd.id));
      setProductToAdd(null);
    }
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCompare(productId));
  };

  const handleClearComparison = () => {
    dispatch(clearCompare());
  };

  const getBestPrice = (product) => {
    const prices = Object.values(product.prices || {});
    return prices.length > 0 ? Math.min(...prices) : 'N/A';
  };

  const getBestStore = (product) => {
    if (!product.prices) return 'N/A';
    const bestPrice = getBestPrice(product);
    const bestStoreEntry = Object.entries(product.prices).find(([_, price]) => price === bestPrice);
    return bestStoreEntry ? bestStoreEntry[0] : 'N/A';
  };

  if (loading?.compare) {
    return <Loader text="Loading comparison data..." />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Compare Products
      </Typography>
      
      <Button 
        startIcon={<ArrowBackIos />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 3 }}
      >
        Back to Shopping
      </Button>
      
      {/* Product Selection */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={products.filter(p => !compareList.some(cp => cp.id === p.id))}
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
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Clear />}
              onClick={handleClearComparison}
            >
              Clear All
            </Button>
          </Box>
          
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
                  <TableCell component="th" scope="row">Category</TableCell>
                  {productsToCompare.map((product) => (
                    <TableCell key={product.id} align="center">
                      {product.category}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Rating</TableCell>
                  {productsToCompare.map((product) => (
                    <TableCell key={product.id} align="center">
                      {product.averageRating} / 5
                    </TableCell>
                  ))}
                </TableRow>
                
                {/* Price Comparison */}
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={productsToCompare.length + 1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Price Comparison
                    </Typography>
                  </TableCell>
                </TableRow>
                {stores.map((store) => (
                  <TableRow key={store}>
                    <TableCell component="th" scope="row">{store}</TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={product.id} align="center">
                        {product.prices && product.prices[store] ? (
                          <Typography 
                            fontWeight={getBestStore(product) === store ? 'bold' : 'normal'}
                            color={getBestStore(product) === store ? 'primary' : 'inherit'}
                          >
                            ₹{product.prices[store]}
                          </Typography>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                
                {/* Specifications */}
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={productsToCompare.length + 1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Specifications
                    </Typography>
                  </TableCell>
                </TableRow>
                {specOrder.map((spec) => (
                  <TableRow key={spec}>
                    <TableCell component="th" scope="row">{spec}</TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={product.id} align="center">
                        {product.specifications && product.specifications[spec] ? product.specifications[spec] : 'N/A'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
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
