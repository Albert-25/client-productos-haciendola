import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../redux/actions/authActions';

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword({ currentPassword, newPassword }));
    onClose();
  };

  return (
    <div>
      <h2>Cambiar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Contraseña actual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
