import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Box, IconButton, Paper, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Search as SearchIcon, Clear } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../redux/actions/productActions';
import useDebounce from '../../hooks/useDebounce';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
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
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Search suggestions logic 
  React.useEffect(() => {
    if (debouncedQuery.length > 2) {
      dispatch(searchProducts(debouncedQuery))
        .then(action => {
          if (action.type === 'SEARCH_PRODUCTS_SUCCESS') {
            setResults(action.payload.data.slice(0, 5));
            setShowResults(true);
          }
        });
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };
  
  return (
    <Box sx={{ position: 'relative' }}>
      <SearchWrapper>
        <form onSubmit={handleSearch}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search products..."
            inputProps={{ 'aria-label': 'search' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 2 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          {query && (
            <IconButton size="small" sx={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)' }} onClick={handleClear}>
              <Clear fontSize="small" />
            </IconButton>
          )}
        </form>
      </SearchWrapper>
      
      {showResults && results.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            left: 0,
            zIndex: 1000,
            maxHeight: '300px',
            overflow: 'auto'
          }}
        >
          <List>
            {results.map(item => (
              <ListItem 
                button 
                key={item.id}
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  setShowResults(false);
                }}
                sx={{ '&:hover': { bgcolor: 'background.default' } }}
              >
                <ListItemText 
                  primary={item.name} 
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {item.brand} • ₹{item.currentBestPrice?.price || 'N/A'}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
