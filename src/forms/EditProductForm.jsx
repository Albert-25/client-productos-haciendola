import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { editProduct } from '../redux/actions/productActions';

const EditProductForm = ({ product, open, onClose }) => {
    const dispatch = useDispatch();
    const [editedProduct, setEditedProduct] = useState(product);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value
        });
    };

    const handleEditProduct = () => {
        dispatch(editProduct({ productId: editedProduct.id, updatedProductData: editedProduct }));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Título"
                    type="text"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    type="text"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="SKU"
                    type="text"
                    name="sku"
                    value={editedProduct.sku}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Stock"
                    type="number"
                    name="stock"
                    value={editedProduct.stock}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Precio"
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Gramos"
                    type="number"
                    name="grams"
                    value={editedProduct.grams}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Precio Comparado"
                    type="number"
                    name="comparePrice"
                    value={editedProduct.comparePrice}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Código de Barras"
                    type="text"
                    name="barcode"
                    value={editedProduct.barcode}
                    onChange={handleInputChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleEditProduct} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductForm;
