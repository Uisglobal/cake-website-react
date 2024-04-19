import React, { useState, useEffect } from 'react';
import '../Styles/LoginSignup.css';

const LoginSignup = () => {
  const [loginForm, setLoginForm] = useState(true); // True for login, false for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if isLoggedIn is stored in local storage
    const storedIsLoggedIn = localStorage.getItem('setIsLoggedIn');
    if (storedIsLoggedIn == 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const switchForm = () => {
    setLoginForm(!loginForm);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password
    };

    const url = 'http://localhost:4000/api/users/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setIsLoggedIn(true);
        localStorage.setItem('setIsLoggedIn', true);
        const { userId } = data; 
        localStorage.setItem('userId', userId); // Set userId in local storage
        console.log('Login successful. User ID:', userId);
      } else {
        // Login failed
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      username: 'test',
      shippingAddress: 'hamilton'
    };

    const url = 'http://localhost:4000/api/users';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        console.log('Signup successful:', data);
        setSuccessMessage('Signup successful. Please login.');

      } else {
        // Signup failed
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('setIsLoggedIn', false);
    localStorage.removeItem('userId');
    localStorage.removeItem('selectedProduct');
  };

  return (
    <div className="padding-container">
    <div className="login-signup-container">
      {!isLoggedIn ? (
        <>
          <h2>{loginForm ? 'Login' : 'Sign Up'}</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}

          <form className="login-signup-form" onSubmit={loginForm ? handleSubmitLogin : handleSubmitSignup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="error">{error}</p>}
            <button type="submit">{loginForm ? 'Login' : 'Sign Up'}</button>
          </form>
          <p>
            {loginForm ? "Don't have an account? " : "Already have an account? "}
            <span className="form-switch" onClick={switchForm}>{loginForm ? 'Sign up here' : 'Login here'}</span>
          </p>
        </>
      ) : (
        <div>
          <h3> You are Logged In.</h3>
        <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default LoginSignup;
