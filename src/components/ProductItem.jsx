import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProductForm from '../forms/EditProductForm';
import ProductDetail from './ProductDetail';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/productActions';

const ProductItem = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    setConfirmDelete(false);
  }

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>

          <Grid container justifyContent="center">
            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.25rem', lineHeight: '1.5' }}>
              {truncateTitle(product.title, 30)}
            </Typography>
          </Grid>

          <Typography variant="body2" color="text.secondary">
            SKU: {product.sku}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precio: ${product.price}
          </Typography>

          <Grid container justifyContent="center">
            <Button onClick={handleOpenModal} variant="contained" color="primary">
              Ver detalle
            </Button>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Tooltip title="Editar producto">
              <IconButton onClick={handleOpenEditModal} aria-label="Editar producto">
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Eliminar producto">
              <IconButton onClick={() => setConfirmDelete(true)} aria-label="Eliminar producto">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <ProductDetail product={product} openModal={openModal} handleCloseModal={handleCloseModal} />

          <EditProductForm product={product} open={openEditModal} onClose={handleCloseEditModal} />

          <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
            <DialogTitle>Eliminar producto</DialogTitle>
            <DialogContent>
              <Typography>¿Estás seguro de que deseas eliminar este producto?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDelete(false)} color="primary">Cancelar</Button>
              <Button onClick={() => handleDeleteProduct(product.id)} color="primary">Eliminar</Button>
            </DialogActions>
          </Dialog>

        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductItem;
