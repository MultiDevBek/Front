import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Add your login logic here
        console.log('Login:', login);
        console.log('Password:', password);
    };

    return (
        <div className='login-container'>
            <input type="text" className='login-input' value={login} onChange={handleLoginChange} placeholder="Login" />
            <input type="password" className='login-input' value={password} onChange={handlePasswordChange} placeholder="Password" />
            <button className='login-button' onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default Login;