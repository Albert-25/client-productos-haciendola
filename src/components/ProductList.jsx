import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Grid, IconButton, Tooltip, Typography, MenuItem, Select } from '@mui/material';
import { logout } from '../redux/actions/authActions';
import { fetchProducts, addProduct } from '../redux/actions/productActions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ProductItem from './ProductItem';
import AddProductForm from '../forms/AddProductForm';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const [page, setPage] = useState(1);
  const [perPage] = useState(9);
  const [openForm, setOpenForm] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (filter === 'justCreated') {
      setPage(1);
    }
  }, [filter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const indexOfLastProduct = page * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  let filteredProducts = products;

  if (filter === 'justCreated') {
    filteredProducts = products.filter(product => product.isJustCreated);
  }

  const pageCount = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Productos
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {filteredProducts.length > 0 && (
          <Box mt={2}>
            <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <Tooltip title="Cerrar sesión" arrow>
          <IconButton aria-label="Logout" onClick={handleLogout} sx={{ position: 'absolute', top: '10px', right: '10px' }}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar Producto" arrow>
          <IconButton aria-label="AddProduct" onClick={handleOpenForm} sx={{ position: 'absolute', top: '10px', right: '60px' }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          sx={{ position: 'absolute', top: '10px', right: '110px' }}
        >
          <MenuItem value="all">Todos los productos</MenuItem>
          <MenuItem value="justCreated">Productos recién creados</MenuItem>
        </Select>
      </Grid>
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            {filter === 'justCreated' ? 'Aquí aparecerán los productos recién agregados' : 'No se encontraron productos'}
          </Typography>
        </Grid>
      )}
      <AddProductForm open={openForm} handleClose={handleCloseForm} />
    </Grid>
  );
};

export default ProductList;
