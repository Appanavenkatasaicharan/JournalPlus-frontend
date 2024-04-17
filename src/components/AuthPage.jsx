import React, { useState } from 'react';
import axios from 'axios'
import '../styles/AuthPage.css';
import LoadingPage from './LoadingPage';
import ErrorPopup from './ErrorPopup';

const AuthPage = ({setToken,setName}) => {
  const [isSignup, setIsSignup] = useState(true); // Tracks whether to show signup or signin form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
    // Function to open the error popup
    const openErrorPopup = (message) => {
      setErrorMessage(message);
      setShowError(true);
    };
    // Function to close the error popup
    const closeErrorPopup = () => {
      setShowError(false);
      setErrorMessage('');
    };

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSignup = () => {
    setIsLoading(true)
    axios.post('https://journal-plus-backend.vercel.app/api/v1/auth/register',{name:username,email:email,password:password})
    .then((res)=>{
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('username',res.data.user.name)
      setToken(res.data.token)
      setName(res.data.user.name)
      setIsLoading(false)
    })
    .catch((err)=>{
      openErrorPopup('You need to provide all the credentials.')
      setIsLoading(false)
    })
  };

  const handleSignin = () => {
    setIsLoading(true)
    axios.post('https://journal-plus-backend.vercel.app/api/v1/auth/login',{email:email,password:password})
    .then((res)=>{
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('username',res.data.user.name)
      setToken(res.data.token)
      setName(res.data.user.name)
      setIsLoading(false)
    })
    .catch((err)=>{
      openErrorPopup('Invaid credentials')
      setIsLoading(false)
    })
  };

  return (
    isLoading?
    <LoadingPage/>:
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
      <ErrorPopup showError={showError} message={errorMessage} onClose={closeErrorPopup} />
    </div>
  );
};

export default AuthPage;
