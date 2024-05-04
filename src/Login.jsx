// Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './CartSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        axios.get('http://localhost:4000/users').then(response => {
            const users = response.data;
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                // Dispatch setUser action with user data
                dispatch(setUser({
                    userID: user.id,
                    username: user.username,
                    password: user.password,
                    role: user.role,
                    items: user.items // Pass items from the user to setUser action
                }));
                // Navigate to the cart item page
                navigate('/cartitem');
            } else {
                alert('Invalid username or password');
            }
        });
    };

    return (
        <div>
            <center>
                <h2>Login</h2>
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
                    <button type="button" onClick={handleLogin}>Login</button>
                </form>
            </center>
        </div>
    );
};

export default Login;
