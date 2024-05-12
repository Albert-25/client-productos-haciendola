import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ProductDetail = ({ product, openModal, handleCloseModal }) => {

    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>{product.title}</DialogTitle>
            <DialogContent dividers>
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                <hr></hr>
                <Typography variant="body2" color="text.secondary">
                    SKU: {product.sku}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Precio: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Precio comparado: ${product.comparePrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Gramos: {product.grams}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Codigo de barra: {product.barcode}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} variant="contained" color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetail;
