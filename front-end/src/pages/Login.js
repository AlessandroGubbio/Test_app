import React, { useState } from 'react'
import Navbar from './Navbar';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import BackAnim from './BackAnim';



const Login = () => {
  const navigate = useNavigate()
  const[username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const verify = async()=>{
    try {
      await axios.post("/login", {username, password})
        navigate("/Main")
    } catch (err) {
      console.log(err)
    }
  }
  
  const register = ()=>{
    navigate('/Register')
  }
  
  
  return (
    <>
    <Navbar/>
    <div className='login'>
        <div className='container'>
          <div className='card'>
              <div className='title'>
                <h1>Sign In</h1>
              </div>
              <div className='form'>
                <span class="material-symbols-outlined">
                person
                </span>
                <input type='text' value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
                <br/>
                <span class="material-symbols-outlined">
                lock
                </span>
                <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
              </div> 
              <div>
                <button className='submit_button' onClick={verify}>Submit</button>
              </div> 
              <div className='register_link'>
                <a onClick={register}>Register</a>
              </div>        
          </div>
        </div>
    </div>
    <BackAnim />

    </>
  )
}

export default Login