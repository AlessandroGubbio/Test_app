import React, { useState } from 'react'
import Navbar from './Navbar';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import BackAnim from './BackAnim';



const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const[username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const verify = async()=>{
    try {
      await axios.post("/login", {username, password}).then((res) => {
        if(res.data.message.includes('Login successful')){
          navigate("/Main")
        }else{
          navigate("/Admin")
        }
      }).catch(err => {
        setError('Username or password error')
        console.log(err)
      })
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
      <p style={{color: 'rgb(255, 0, 55)'}}>{error}</p>
      <div className='container'>
        <div className='card'>
            <div className='title'>
              <h1>Sign In</h1>
            </div>
            <div className='form'>
              <span class="material-symbols-outlined">
              person
              </span>
              <input className='form_input' type='text' value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
              <br/>
              <span class="material-symbols-outlined">
              lock
              </span>
              <input className='form_input' type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
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