import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = () => {
    const newUser = {
      username,
      password,
      role: 'user',
      items: [] // Empty items array for the new user
    };
    axios.post('http://localhost:4000/users', newUser)
      .then(response => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreateUser}>Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
