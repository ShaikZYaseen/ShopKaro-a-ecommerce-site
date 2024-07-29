import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../thunks/UserThunk";
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.login.status); // Adjust based on your actual state structure

  useEffect(() => {
    if (status === 'succeeded') {
      setSuccessMessage('User registered successfully');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/');

      }, 1500);
    } else if (status === 'failed') {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  }, [status, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = {
      email,
      password
    };

    dispatch(login(form));
  };

  return (
    <div className="signup">
      <div className="form-box">
        {status === 'loading' ? (
          <CircularProgress />
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <span className="title">Log in</span>
            <div className="form-container">
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                aria-label="Email"
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                aria-label="Password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        )}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </div>
    </div>
  );
};

export default LoginForm;
