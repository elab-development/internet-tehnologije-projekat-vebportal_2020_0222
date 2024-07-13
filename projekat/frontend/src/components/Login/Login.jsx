import React, { useState } from 'react';
import { login } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({setIsLoggedIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      const emailAndPassword = {
        email: email,
        password: password
      }

      console.log('Email and password: ' + JSON.stringify(emailAndPassword));

      const response = await login(emailAndPassword);
      const user = response.korisnik;
      const token = response.token;
      localStorage.setItem('token', token);
      console.log(JSON.stringify(user) + ' Ful paket: ' + JSON.stringify(response));
      alert('Uspesno logovanje');
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-container">
      <h2>Prijava</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Lozinka:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button-login" type="submit">Prijavi se</button>
      </form>
      <p className="register-link">
        Nemate nalog? <Link to="/register">Registrujte se</Link>
      </p>
    </div>
  );
}

export default Login;
