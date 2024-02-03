import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



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
  
  const home = ()=>{
    window.location.reload();
  }
  const logout= ()=>{
    alert('you need to be logged in to logout')
  }
  const register = ()=>{
    navigate('/Register')
  }
  
  
  return (
    <>
    <div className='navbar'>
      <a className='home_btn'>
      <span onClick={home} class="material-symbols-outlined">
        home
      </span>
      </a>
      <h4 className='nav_title'>WELCOME TO OUR SITE</h4>
      <a className='logout_btn'>
      <span onClick={logout} class="material-symbols-outlined">
        logout
      </span>
      </a>
    </div>
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
    </>
  )
}

export default Login