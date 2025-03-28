import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const PriceHistoryChart = ({ priceHistory = [], title = 'Price History' }) => {
  // Group price history by store
  const storeData = {};
  priceHistory.forEach((item) => {
    if (!storeData[item.store]) {
      storeData[item.store] = [];
    }
    storeData[item.store].push({
      x: new Date(item.date),
      y: item.price
    });
  });

  // Generate unique colors for each store
  const colors = ['#1976d2', '#ff6d00', '#2e7d32', '#9c27b0', '#d32f2f'];

  // Create datasets for the chart
  const datasets = Object.keys(storeData).map((store, index) => ({
    label: store,
    data: storeData[store],
    borderColor: colors[index % colors.length],
    backgroundColor: `${colors[index % colors.length]}22`, // Add transparency
    tension: 0.3,
  }));

  const data = { datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'PP', // Localized date format
          displayFormats: {
            day: 'MMM d'
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (₹)'
        },
        min: function(context) {
          const min = Math.min(...priceHistory.map(item => item.price)) * 0.9;
          return Math.floor(min);
        }
      }
    }
  };

  if (priceHistory.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No price history available for this product.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: 300 }}>
        <Line data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default PriceHistoryChart;
