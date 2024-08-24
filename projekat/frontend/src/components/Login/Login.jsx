import React, { useState } from "react";
import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      const emailAndPassword = {
        email: email,
        password: password,
      };


      const response = await login(emailAndPassword);
      const user = response.korisnik;
      if(user.is_banned){
        alert("Korisnik je banovan i ne može da se uloguje!");
        return;
      }
      const token = response.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Uspesno logovanje");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Prijava</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label className="login-label">Email:</label>
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="login-label">Lozinka:</label>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">
          Prijavi se
        </button>
      </form>
      <p className="login-footer">
        Nemate nalog? <Link to="/register">Registrujte se</Link>
      </p>
    </div>
  );
}

export default Login;
