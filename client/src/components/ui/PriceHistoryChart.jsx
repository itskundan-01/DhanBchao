import React, { useState } from 'react';
import { Box, Paper, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PriceHistoryChart = ({ priceHistory }) => {
  const [timeRange, setTimeRange] = useState('3m'); // Default: 3 months
  
  // Process price history data
  const processData = () => {
    if (!priceHistory || priceHistory.length === 0) {
      return [];
    }
    
    // Sort by date
    const sortedHistory = [...priceHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Filter by time range
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (timeRange) {
      case '1m':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
      default:
        cutoffDate = new Date(0); // Beginning of time
    }
    
    return sortedHistory
      .filter(item => new Date(item.date) >= cutoffDate)
      .map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        price: item.price,
        store: item.store
      }));
  };
  
  const chartData = processData();
  
  // Extract unique stores
  const stores = [...new Set(chartData.map(item => item.store))];
  
  // Colors for different stores
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  
  // Handle empty data
  if (chartData.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">No price history data available for the selected time range.</Typography>
      </Paper>
    );
  }
  
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Price History</Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="time-range-label">Time Range</InputLabel>
          <Select
            labelId="time-range-label"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            label="Time Range"
          >
            <MenuItem value="1m">1 Month</MenuItem>
            <MenuItem value="3m">3 Months</MenuItem>
            <MenuItem value="6m">6 Months</MenuItem>
            <MenuItem value="1y">1 Year</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {stores.map((store, index) => (
            <Line 
              key={store}
              type="monotone" 
              dataKey="price" 
              data={chartData.filter(item => item.store === store)} 
              name={store} 
              stroke={colors[index % colors.length]} 
              activeDot={{ r: 8 }} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default PriceHistoryChart;
