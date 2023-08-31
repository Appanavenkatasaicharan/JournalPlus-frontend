import React, { useState } from 'react';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true); // Tracks whether to show signup or signin form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSignup = () => {
    // Implement signup logic here
    console.log('Signup:', username, email, password);
  };

  const handleSignin = () => {
    // Implement signin logic here
    console.log('Signin:', email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">JournalPlus</h2>
        {isSignup ? (
          <div className="auth-form">
            <h3>Sign Up</h3>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
            <p>Already have an account? <span className="switch-link" onClick={handleFormSwitch}>Sign In</span></p>
          </div>
        ) : (
          <div className="auth-form">
            <h3>Sign In</h3>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignin}>Sign In</button>
            <p>Don't have an account? <span className="switch-link" onClick={handleFormSwitch}>Sign Up</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
