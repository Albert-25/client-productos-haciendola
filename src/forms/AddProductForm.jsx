import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/productActions';

const AddProductForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        sku: '',
        grams: '',
        stock: '',
        price: '',
        comparePrice: '',
        barcode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const handle = formData.title.toLowerCase().replace(/\s+/g, '-');
        const productToAdd = { ...formData, handle };
        dispatch(addProduct(productToAdd));
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar Nuevo Producto</DialogTitle>
            <DialogContent>
                <TextField label="Título" name="title" value={formData.title} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Descripción" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="SKU" name="sku" value={formData.sku} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Gramos" name="grams" value={formData.grams} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Stock" name="stock" value={formData.stock} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Precio" name="price" value={formData.price} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Precio de comparación" name="comparePrice" value={formData.comparePrice} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Código de barras" name="barcode" value={formData.barcode} onChange={handleChange} fullWidth margin="normal" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductForm;
