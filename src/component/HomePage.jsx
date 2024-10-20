import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout as logoutAction } from '../userSlice'; 
import UserTable from './UserTable';

const API_BASE_URL = 'http://localhost:8000/api'; 

function HomePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user.user); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOption = async (option) => {
    handleMenuClose();
    switch (option) {
      case 'viewProfile':
        navigate('/profile/view');
        break;
      case 'editProfile':
        navigate('/profile/edit');
        break;
      case 'logout':
        try {
          await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
          dispatch(logoutAction()); 
          navigate('/login'); 
        } catch (error) {
          console.error('Logout failed:', error.response?.data || error.message)
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AssignWork
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleProfileOption('viewProfile')}>View Profile</MenuItem>
            <MenuItem onClick={() => handleProfileOption('editProfile')}>Edit Profile</MenuItem>
            <MenuItem onClick={() => handleProfileOption('logout')}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4">
          Welcome, {user ? user.user.name : 'Guest'}!
        </Typography>
      </Box>
      <UserTable/>
    </div>
  );
}

export default HomePage;
