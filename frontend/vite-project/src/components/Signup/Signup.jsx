import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from "../../thunks/UserThunk";
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('s');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.signup.status); 

  useEffect(() => {
    if (status === 'succeeded') {
      setSuccessMessage('User registered successfully');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/login');

      }, 1500);
    } else if (status === 'failed') {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  }, [status, navigate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      name,
      email,
      password,
      avatar,
    };

    dispatch(signup(form));
  };

  return (
    <div className="signup">
      <div className="form-box">
        {status === 'loading' ? (
          <CircularProgress />
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <span className="title">Sign up</span>
            <span className="subtitle">Create an account with your email.</span>
            <div className="form-container">
              <input
                type="text"
                className="input"
                placeholder="Full Name"
                value={name}
                onChange={handleNameChange}
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <input
                type="file"
                className="input"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
            <button type="submit">Sign up</button>
          </form>
        )}
        <div className="form-section">
          <p>Have an account? <a href="/login">Log in</a></p>
        </div>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </div>
  );
};

export default SignUpForm;
