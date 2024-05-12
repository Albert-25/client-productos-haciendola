import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userNameOrEmail: '',
    password: ''
  });
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const { userNameOrEmail, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    dispatch(login({ userNameOrEmail, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated])

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField
        label="Usuario o correo"
        variant="outlined"
        margin="normal"
        fullWidth
        name="userNameOrEmail"
        value={userNameOrEmail}
        onChange={onChange}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Iniciar Sesión
      </Button>
      <Typography align="center" gutterBottom>
        ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
      </Typography>
    </Container>
  );
};

export default Login;
