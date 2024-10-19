import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './AddUser.css';

const AddUser = () => { 
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика для отправки данных
        console.log({ fullName, email, status, password });
    };
    
  
    return (
        <div className="container">
            <h1>Добавление пользователя</h1>
            <form onSubmit={handleSubmit} className="add-user-form" >
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Имя" /><br />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Выброать статус</option>
                    <option value="Исполнитель">Исполнитель</option>
                    <option value="Администратор">Администратор</option>
                </select> <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
                <input type="text" placeholder="Категория" /><br />
                <button className="btn" type="sumbit">Добавить</button>

            </form>
        </div>
    );  
}
export default AddUser;