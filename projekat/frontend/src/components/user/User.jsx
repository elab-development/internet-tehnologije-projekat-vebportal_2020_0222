import React from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';

function User({user,setIsLoggedIn, setLoggedInUser}) {

    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedInUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        navigate("/");
      };

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <form>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            className="form-control"
            id="userId"
             value={user.user_id}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={user.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            className="form-control"
            id="surname"
             value={user.surname}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
             value={user.username} 
            readOnly
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
           onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default User;