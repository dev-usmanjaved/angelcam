import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">AngelCam</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {userName ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Hello, {userName}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
