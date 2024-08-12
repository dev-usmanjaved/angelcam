import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import ListCameras from './components/ListCameras';
import Recordings from './components/Recordings';
import NavBar from './components/NavBar';

const App = () => {
  const [userName, setUserName] = useState(null);

  const handleLogin = (name) => {
    setUserName(name);
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <NavBar userName={userName} onLogout={handleLogout} />
        <main className="container">
          <h1 className="text-uppercase text-center my-4">Angel Cam</h1>
        </main>
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route
              path="/"
              element={userName ? <ListCameras /> : <LoginForm onLogin={handleLogin} />}
            />
            <Route path="/camera/:cameraId/recordings" element={<Recordings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
