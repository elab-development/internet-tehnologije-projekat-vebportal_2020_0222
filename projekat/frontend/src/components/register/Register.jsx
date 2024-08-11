import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { sendWelcomeEmail } from '../../services/mailService';

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      const user = {
        name,
        surname,
        username,
        email,
        password,
      };
      console.log(user);
      const response = await register(user);
      //await sendWelcomeEmail(user);
      console.log(response.korisnik);
      alert('Uspesan register');
      navigate('/Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-header">Registracija</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="register-input-group">
          <label className="register-label">Ime:</label>
          <input
            className="register-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="register-input-group">
          <label className="register-label">Prezime:</label>
          <input
            className="register-input"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="register-input-group">
          <label className="register-label">Korisničko ime:</label>
          <input
            className="register-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="register-input-group">
          <label className="register-label">Email:</label>
          <input
            className="register-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register-input-group">
          <label className="register-label">Lozinka:</label>
          <input
            className="register-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="register-button" type="submit">Registrujte se</button>
      </form>
    </div>
  );
}

export default Register;
