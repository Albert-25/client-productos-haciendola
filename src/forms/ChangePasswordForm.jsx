import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeUserPassword } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const ChangePasswordForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogout = async () => {
        await dispatch(logout()).unwrap();
        navigate('/login');
    };

    const handleSubmit = async () => {

        if (formData.newPassword.length < 3) {
            toast.error("La nueva contraseña debe tener al menos 3 caracteres");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Las nuevas contraseñas no coinciden");
            return;
        }

        try {
            await dispatch(changeUserPassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            })).unwrap();

            toast.success("Contraseña cambiada con éxito, ingrese nuevamente");
            handleClose();
            handleLogout();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cambiar Contraseña</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Contraseña Actual"
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nueva Contraseña"
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Confirmar Nueva Contraseña"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Guardar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChangePasswordForm;
