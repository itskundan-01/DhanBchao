import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  InputBase, 
  IconButton,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/actions/productActions';
import useDebounce from '../../hooks/useDebounce';

// Styled search bar container
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// Styled search icon
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styled input base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get search results from redux store
  const { searchResults, loading } = useSelector(state => state.products);
  
  // Debounce search query to avoid excessive API calls
  const debouncedQuery = useDebounce(query, 500);
  
  // Perform search when debounced query changes
  React.useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= 2) {
      dispatch(searchProducts(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);
  
  // Handle input change
  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setAnchorEl(event.currentTarget);
  };
  
  // Clear search
  const handleClearSearch = () => {
    setQuery('');
    setAnchorEl(null);
  };
  
  // Handle search submission
  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setAnchorEl(null);
    }
  };
  
  // Handle clicking on a search result
  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setAnchorEl(null);
    setQuery('');
  };
  
  // Determine if popper should be open
  const open = Boolean(anchorEl) && query.length >= 2;
  const id = open ? 'search-popper' : undefined;

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', maxWidth: { xs: '100%', md: 350 } }}>
      <SearchContainer>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <form onSubmit={handleSearch}>
          <StyledInputBase
            placeholder="Search products…"
            inputProps={{ 'aria-label': 'search' }}
            value={query}
            onChange={handleQueryChange}
            endAdornment={
              query ? (
                <IconButton 
                  size="small" 
                  sx={{ mr: 0.5 }} 
                  onClick={handleClearSearch}
                  aria-label="clear search"
                >
                  <Clear fontSize="small" />
                </IconButton>
              ) : null
            }
          />
        </form>
      </SearchContainer>
      
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ width: { xs: '90vw', sm: 400 }, zIndex: 1301 }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            maxHeight: 400, 
            overflow: 'auto',
            mt: 0.5,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          {loading.search ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : searchResults && searchResults.length > 0 ? (
            <List>
              {searchResults.slice(0, 6).map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem button onClick={() => handleResultClick(product.id)}>
                    <Box 
                      component="img" 
                      src={product.image} 
                      alt={product.name}
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        mr: 2, 
                        objectFit: 'contain',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1
                      }} 
                    />
                    <ListItemText 
                      primary={product.name} 
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {product.brand} • {product.currentBestPrice?.price ? 
                            `₹${product.currentBestPrice.price}` : 'Price not available'}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              <ListItem 
                button 
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(query)}`);
                  setAnchorEl(null);
                }}
              >
                <ListItemText 
                  primary={`See all results for "${query}"`}
                  primaryTypographyProps={{
                    color: 'primary',
                    textAlign: 'center'
                  }}
                />
              </ListItem>
            </List>
          ) : query.length >= 2 ? (
            <Box sx={{ p: 2 }}>
              <Typography align="center" color="text.secondary">
                No products found for "{query}"
              </Typography>
            </Box>
          ) : null}
        </Paper>
      </Popper>
    </Box>
  );
};

export default SearchBar;
