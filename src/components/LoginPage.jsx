import { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, rememberMe });
  };

  return (
    <div className="login-container">
      {/* Mountain Background */}
      <div className="mountain-background"></div>

      {/* Login Box */}
      <div className="login-box">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo-icon"></div>
          <span className="logo-text">PenTeleData</span>
        </div>

        {/* Title */}
        <h2 className="login-title">Log In</h2>

        {/* Login Form */}
        <div>
          {/* Username Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Password Field */}
          <div className="form-group password-container">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input password-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="show-password-btn"
            >
              Show
            </button>
          </div>

          {/* Bottom Row with Login Button and Remember Me */}
          <div className="form-bottom">
            <button
              type="button"
              onClick={handleSubmit}
              className="login-btn"
            >
              Log In
            </button>
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
        </div>
      </div>

      {/* Footer Warning */}
      <div className="footer-warning">
        <p>
          PenTeleData is aware that many of our customers have received phishing emails that appear to come from us. Please remember that we will NEVER ask you for personal information to validate your account via a link in an email. If you receive an email like this, please delete it or click the spam option to move it to your junk folder. For more information about phishing, visit{' '}
          <a href="https://www.ptd.net/phishing" className="footer-link">
            https://www.ptd.net/phishing
          </a>
          .
        </p>
        <p className="copyright">
          Copyright © 2005-2023 Synacor, Inc. All rights reserved. "Zimbra" is a registered trademark of Synacor, Inc.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;