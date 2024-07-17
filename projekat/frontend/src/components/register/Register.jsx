import React, { useState } from 'react'
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) =>{

        try {
            event.preventDefault();
            const user = {

                name: name,
                surname: surname,
                username: username,
                email: email,
                password: password

            }
            console.log(user);
            const response = await register(user);
            console.log(response.korisnik);
            alert('Uspesan register');
            navigate('/Login');

        } catch (error) {
            alert(error.message);
        }
    }

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Ime:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prezime:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Korisničko ime:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div >
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lozinka:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrujte se</button>
      </form>
    </div>
  )
}

export default Register