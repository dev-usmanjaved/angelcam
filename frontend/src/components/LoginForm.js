import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/', { token });
      onLogin(response.data.first_name);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Enter Token</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="token">Token</label>
          <input
            type="text"
            id="token"
            className="form-control"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default LoginForm;
