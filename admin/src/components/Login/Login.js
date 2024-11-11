import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import downloadImage from '../../assets/download.jpg';
import {toast} from 'react-toastify'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const url = "http://localhost:5000";
    e.preventDefault();
    try {
      const response = await axios.post(url + '/api/user/login', { email, password });
      console.log(response)
      if (response.data.success) {
        const username = response.data.data.name; 
        localStorage.setItem("username", username);
        toast.success(`welcome ${username}`)
        navigate('/admin');
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
      navigate('/');
      setEmail('');
      setPassword('')
    }
  };

  return (
    <div>
    <img className='imgg' src={downloadImage} alt='admin'/>
    <div className="cont">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='name'>
          <label>Email:</label>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button className='submit' type="submit">Login</button>
      </form>
      <div className='sig'>
        <p>Don't have an account? </p>
        <button className='signup' onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
    </div>
  );
}

export default Login;
