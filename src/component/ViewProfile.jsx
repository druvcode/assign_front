
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Avatar } from '@mui/material';

const ViewProfile = () => {
  const user = useSelector((state) => state.user.user);
  console.log("xxxxxxxxxxxxxxxxxxxxxx",user)

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        <Avatar 
          alt={user.name} 
          sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
        >
        </Avatar>
        <Typography variant="h4" component="h1" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email: </strong>{user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Phone: </strong>{user.phone}
        </Typography>
      </Box>
    </Container>
  );
};

export default ViewProfile;
