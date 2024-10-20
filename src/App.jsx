// App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './userSlice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate, redirect, useNavigate } from 'react-router-dom';
import SignUp from './component/SignUp';

import HomePage from './component/HomePage';
import Login from './component/Login';
import ViewProfile from './component/ViewProfile';
import EditProfile from './component/EditProfile';


function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={user ? <HomePage  /> : <Navigate to="/login" />} />
        <Route path="/profile/view" element={user ? <ViewProfile  /> : <Navigate to="/login" />} />
        <Route path="/profile/edit" element={user ? <EditProfile  /> : <Navigate to="/login" />} />

      </Routes>
    </Router>

  );
}

export default App;
