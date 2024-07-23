import React from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

function User({user,setIsLoggedIn, setLoggedInUser}) {

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
    <div className="container mt-4">
      <h2>User Details</h2>
      <form>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
             value={user.user_id}
            readOnly
          />
        </div>
        <div >
          <label htmlFor="firstName">Name:</label>
          <input
            type="text"
            id="firstName"
            value={user.name}
            readOnly
          />
        </div>
        <div >
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
             value={user.surname}
            readOnly
          />
        </div>
        <div >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
             value={user.username} 
            readOnly
          />
        </div>
        <button
          type="button"
           onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default User;