import { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Typography }from '@mui/material';
import Grid2 from '@mui/material/Grid2'
import Paper from '@mui/material/Paper';
import './App.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function App() {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, alignItems: 'center'}}>
    {/* Title */}
    <Box sx={{ flexGrow: 1, padding: 2, marginBottom: 10}}>
      <Typography variant="h4" gutterBottom>
        My Search App
      </Typography>
    </Box>

    {/* Search bar and button */}
    <Grid2 container spacing={2} alignItems="center">
      <Grid2 xs={9} md={10}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search"
          placeholder="Type your query here"
        />
      </Grid2>
      <Grid2 xs={3} md={2}>
        <Button variant="contained" color="primary" fullWidth>
          Search
        </Button>
      </Grid2>
    </Grid2>

    {/* Space below */}
    <Box sx={{ height: 16, marginTop: 10}} />

    {/* Main Grid */}
    <Grid2 container spacing={4}>
      <Grid2 xs={6} md={8}>
        <Item>xs=6 md=8</Item>
      </Grid2>
      <Grid2 xs={6} md={4}>
        <Item>xs=6 md=4</Item>
      </Grid2>
      <Grid2 xs={6} md={4}>
        <Item>xs=6 md=4</Item>
      </Grid2>
      <Grid2 xs={6} md={8}>
        <Item>xs=6 md=8</Item>
      </Grid2>
    </Grid2>
  </Box>
  );
} 
