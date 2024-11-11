import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import downloadImage from '../../assets/download.jpg';
import './Signup.css';
import {toast} from 'react-toastify'

function SignUp() {
  const url = "http://localhost:5000";
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url + '/api/user/register', { name, password, email });
      toast.success("Account Created Login!")
      navigate('/');
    } catch (error) {
      console.error("Sign up failed", error);
      toast.error("Error Try again!!")
      setUsername('')
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>
      <img className='img' src={downloadImage} alt='admin'/>
      <div className="contain">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Username:</label>
            <input type="text" name='name' value={name} onChange={(e) => setUsername(e.target.value)} required/>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div> 
          <button type="submit">Sign Up</button>
        </form>
        <div className='login'>
            <p>already have an account?</p>
            <button className='log' onClick={() => navigate('/')}>Login</button>
          </div>
      </div>
    </div>
  );
}

export default SignUp;
