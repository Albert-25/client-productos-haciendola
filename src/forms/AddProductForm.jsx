import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/actions/productActions';
import { toast } from 'react-toastify';

const AddProductForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.product);
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
        const { name, value } = e.target;

        if ((name === 'price' || name === 'stock' || name === 'grams' || name === 'comparePrice') && isNaN(value)) {
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const handle = formData.title.toLowerCase().replace(/\s+/g, '-');
        const productToAdd = { ...formData, handle };

        try {
            await dispatch(addProduct(productToAdd)).unwrap();
            toast.success('Producto registrado con éxito');
            handleClose();
            setFormData({
                title: '',
                description: '',
                sku: '',
                grams: '',
                stock: '',
                price: '',
                comparePrice: '',
                barcode: ''
            })
            
        } catch (error) {
            if (Array.isArray(error.message)) {
                error.message.forEach(errorMessage => {
                    toast.error(`${errorMessage}`);
                });

                return;
            }

            toast.error(`${error.message}`);
        }
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
                <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductForm;
