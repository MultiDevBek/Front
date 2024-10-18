import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Для отображения ошибок
    const navigate = useNavigate(); // Для редиректа

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    useEffect  (() => {
        const keyDownHandler = event => {
            console.log('User pressed key: ', event.key);

            if (event.key === 'Enter') {
                handleLogin();
            }
        }
        window.addEventListener('keydown', keyDownHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        }
    }
    , [login, password]);

    const handleLogin = () => {
        // Простая проверка на правильные данные
        if (login === 'admin' && password === '12345') {
            // Если логин и пароль совпадают с "затычкой", то перенаправляем на дашборд
            navigate('/app/dash');
        } else {
            // Если неверные данные, выводим ошибку
            setError('Не верный логин или пароль');
        }
    };



    return (
        <div className='login-container'>
            <input type="text" className='login-input' value={login} onChange={handleLoginChange} placeholder="Login" />
            <input type="password" className='login-input' value={password} onChange={handlePasswordChange} placeholder="Password" />
            {error && <p className='error-message'>{error}</p>} {/* Отображение ошибок */}
            <button className='login-button' type="submit" onClick={handleLogin} >Log In</button>
        </div>
    );
};

export default Login;
