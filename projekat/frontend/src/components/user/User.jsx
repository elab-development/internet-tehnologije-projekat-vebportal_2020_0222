import React from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

function User({ user, setIsLoggedIn, setLoggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setLoggedInUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="user-container mt-4">
      <h2 className="user-h2">User Details</h2>
      <form className="user-form">
        <div>
          <label htmlFor="userId" className="user-label">User ID:</label>
          <input
            type="text"
            id="userId"
            value={user.user_id}
            readOnly
            className="user-input"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="user-label">Name:</label>
          <input
            type="text"
            id="firstName"
            value={user.name}
            readOnly
            className="user-input"
          />
        </div>
        <div>
          <label htmlFor="surname" className="user-label">Surname:</label>
          <input
            type="text"
            id="surname"
            value={user.surname}
            readOnly
            className="user-input"
          />
        </div>
        <div>
          <label htmlFor="username" className="user-label">Username:</label>
          <input
            type="text"
            id="username"
            value={user.username}
            readOnly
            className="user-input"
          />
        </div>
        <button
          type="button"
          className="user-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default User;
