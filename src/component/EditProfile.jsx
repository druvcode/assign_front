import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { logout, updateUser } from '../userSlice'; 
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api'; 

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user.name || '',  
        email: user.user.email || '', 
        phone: user.user.phone || '', 
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/updateUser/${user.user.id}`, formData, { withCredentials: true });
      console.log('Profile updated:', response.data);

      dispatch(updateUser(response.data.user));

      navigate('/homepage');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(logout());
      } else {
        console.error('Failed to update profile:', error.response?.data || error.message);
      }
    }
  };

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditProfile;
