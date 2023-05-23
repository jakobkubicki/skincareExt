import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './App.css';

// Improved mock data
const skincareProducts = [
  {
    name: 'Super Hydrating Moisturizer',
    ingredients: ['Hyaluronic Acid', 'Ceramides', 'Glycerin'],
    sideEffects: ['Minor skin irritation', 'Redness'],
    link: 'http://www.example.com/product1', // Update with actual link
  },
  {
    name: 'Revitalizing Eye Cream',
    ingredients: ['Retinol', 'Peptides', 'Vitamin C'],
    sideEffects: ['Dryness', 'Peeling'],
    link: 'http://www.example.com/product2', // Update with actual link
  },
  // Add more products as necessary
];

function App() {
  return (
    <Box className="App" sx={{ width: '80%', margin: 'auto' }}>
      <Typography variant="h3" gutterBottom>Welcome to the Ube Tube!</Typography>

      {skincareProducts.map((product, index) => (
        <Box key={index} sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>{product.name}</Typography>

          <TableContainer component={Paper} sx={{ mt: 1, boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Ingredients</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Potential Side Effects</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Product Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {product.ingredients.map((ingredient, i) => (
                      <Typography key={i} variant="body1" gutterBottom>{ingredient}</Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    {product.sideEffects.map((sideEffect, i) => (
                      <Typography key={i} variant="body1" gutterBottom>{sideEffect}</Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" href={product.link} target="_blank">Go to product</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
}

export default App;
