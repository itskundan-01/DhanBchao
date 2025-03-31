import React from 'react';
import { 
  Container, Typography, Box, Accordion, AccordionSummary, 
  AccordionDetails, Paper
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const FAQ = () => {
  // We'll implement this with a simple structure for now
  // You can expand this with real FAQ data later
  
  const faqs = [
    {
      question: "What is DhanBchao?",
      answer: "DhanBchao is a comprehensive price comparison and recommendation platform that helps users make informed purchasing decisions by comparing prices, reviews, and ratings across multiple e-commerce platforms."
    },
    {
      question: "How does DhanBchao work?",
      answer: "Our platform scans major e-commerce websites in real-time to collect and analyze product data, prices, and user reviews. We then present this information in a user-friendly format, allowing you to compare options and make the best purchasing decisions."
    },
    {
      question: "Is DhanBchao free to use?",
      answer: "Yes, DhanBchao is completely free for all users. Our revenue comes from affiliate partnerships when users make purchases through our links."
    },
    // Add more FAQs here
  ];
  
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, mb: 6, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find answers to the most common questions about using DhanBchao
        </Typography>
      </Paper>
      
      <Box sx={{ mb: 6 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={1} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`faq-content-${index}`}
              id={`faq-header-${index}`}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Can't find what you're looking for? Contact our support team at support@dhanbchao.com
        </Typography>
      </Box>
    </Container>
  );
};

export default FAQ;
