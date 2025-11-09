import { Fragment } from 'react';
import Login from './pages/Login';
import { Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Login />
    </Box>
  );
}

export default App;
