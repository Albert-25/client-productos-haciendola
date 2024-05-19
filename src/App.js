import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import ProductList from './components/ProductList';
import Signup from './components/Signup';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup"
          element={isAuthenticated ? <Navigate to="/products" /> : <Signup />} />
        <Route
          path="/products"
          element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/products" /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
