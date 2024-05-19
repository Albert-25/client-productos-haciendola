import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Container, Typography } from '@mui/material';
import { registerUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading } = useSelector(state => state.user);

  const handleSignup = async () => {
    try {
      await dispatch(registerUser({ userName, email, password })).unwrap();
      toast.success('¡Registro exitoso!');
      navigate('/login');
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
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Registrarse
      </Typography>
      <TextField
        label="Usuario"
        variant="outlined"
        margin="normal"
        fullWidth
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSignup} disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
      <Typography align="center" gutterBottom>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
      </Typography>
    </Container>
  );
};

export default Signup;
