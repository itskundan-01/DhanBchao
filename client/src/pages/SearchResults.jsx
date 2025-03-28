import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Container, Typography, Grid, Box, Divider, Paper,
  FormControl, Select, MenuItem, InputLabel, Pagination
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../redux/actions/productActions';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';
import ProductCard from '../components/ui/ProductCard';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/userActions';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(state => state.products);
  const { watchlist } = useSelector(state => state.user);
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
      // Reset pagination when search query changes
      setPage(1);
    }
  }, [dispatch, query]);

  // Sort products based on selected option
  const sortProducts = (products) => {
    if (!products) return [];
    
    const sorted = [...products];
    switch(sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => 
          (a.currentBestPrice?.price || Infinity) - (b.currentBestPrice?.price || Infinity));
      case 'price-high':
        return sorted.sort((a, b) => 
          (b.currentBestPrice?.price || 0) - (a.currentBestPrice?.price || 0));
      case 'rating':
        return sorted.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      default: // relevance - keep original order
        return sorted;
    }
  };

  // Pagination
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const sortedProducts = sortProducts(searchResults);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * productsPerPage, 
    page * productsPerPage
  );
  const totalPages = Math.ceil((sortedProducts.length || 0) / productsPerPage);

  const isInWatchlist = (productId) => {
    return watchlist.some(item => item.id === productId);
  };

  const handleAddToWatchlist = (productId) => {
    dispatch(addToWatchlist(productId));
  };

  const handleRemoveFromWatchlist = (productId) => {
    dispatch(removeFromWatchlist(productId));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results: {query}
      </Typography>
      
      {loading.search ? (
        <Loader text="Searching products..." />
      ) : error ? (
        <ErrorAlert error={error} />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="body1">
              Found {sortedProducts.length} results
            </Typography>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Customer Rating</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {paginatedProducts.length > 0 ? (
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard 
                    product={product}
                    isInWatchlist={isInWatchlist(product.id)}
                    onAddToWatchlist={handleAddToWatchlist}
                    onRemoveFromWatchlist={handleRemoveFromWatchlist}
                    onAddToCompare={() => {}} // Todo: implement comparison feature
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper elevation={0} sx={{ p: 5, textAlign: 'center', bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>
                No products found for "{query}"
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try using different keywords or browse our categories
              </Typography>
            </Paper>
          )}
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResults;
