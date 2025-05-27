import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-500 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Mountain Silhouette Background */}
      <div className="absolute bottom-0 w-full">
        <svg viewBox="0 0 1200 300" className="w-full h-48 fill-blue-700 opacity-60">
          <path d="M0,300 L0,200 L100,150 L200,180 L300,120 L400,160 L500,100 L600,140 L700,80 L800,120 L900,90 L1000,130 L1100,110 L1200,150 L1200,300 Z"/>
        </svg>
      </div>

      {/* Login Box */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm relative z-10 mx-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 mr-2 rounded-sm"></div>
            <span className="text-xl font-bold text-gray-700">PenTeleData</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-600 mb-8 tracking-wide">Log In</h2>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-gray-500 text-sm mb-2 font-medium" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-gray-500 text-sm mb-2 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent pr-16"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-blue-500 text-sm hover:text-blue-600 transition-colors"
            >
              Show
            </button>
          </div>

          {/* Bottom Row with Login Button and Remember Me */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
            >
              Log In
            </button>
            <label className="flex items-center text-gray-600 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              />
              Remember me
            </label>
          </div>
        </div>
      </div>

      {/* Footer Warning */}
      <div className="absolute bottom-0 w-full bg-red-600 text-white text-xs py-3 px-4 text-center">
        <p className="leading-relaxed">
          PenTeleData is aware that many of our customers have received phishing emails that appear to come from us. Please remember that we will NEVER ask you for personal information to validate your account via a link in an email. If you receive an email like this, please delete it or click the spam option to move it to your junk folder. For more information about phishing, visit{' '}
          <a href="https://www.ptd.net/phishing" className="underline hover:text-red-200 transition-colors">
            https://www.ptd.net/phishing
          </a>
          .
        </p>
        <p className="mt-2 text-xs opacity-90">
          Copyright © 2005-2023 Synacor, Inc. All rights reserved. "Zimbra" is a registered trademark of Synacor, Inc.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;