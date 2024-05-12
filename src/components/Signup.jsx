import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { Button, TextField, Container, Typography } from '@mui/material';
import { registerUser } from '../redux/actions/userActions';

const Signup = () => {
  const dispatch = useDispatch();

  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    dispatch(registerUser({ userName, email, password }));
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
      <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
        Registrarse
      </Button>
      <Typography align="center" gutterBottom>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
      </Typography>
    </Container>
  );
};

export default Signup;
