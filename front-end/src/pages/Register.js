import React, { useState } from 'react'
import './register.css'
import axios from 'axios';
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import BackAnim from './BackAnim';

const Register = () => {
    const[username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mail, setMail] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const register = async () =>{
      try {
        axios.post("/signup", {username, mail, password}).then(()=>{
          navigate('/Main')
        }
        )
        .catch(err => {
          setError('Username not available. Please try a different one')
          console.log(err);
        });
      } catch (err) {
        console.log(err)
      }
    }

      
    return (
    <>
    <Navbar />
    <div className='login'>
        <div className='container'>
          <div className='card'>
              <div className='title'>
                <h1>Sign Up</h1>
              </div>
              <p style={{color: 'red'}}>{error}</p>
              <div className='form'>
              <span class="material-symbols-outlined">
                person
                </span>
                <input className='form_input' type='text' value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
                <br/>
                <span class="material-symbols-outlined">
                mail
                </span>
                <input className='form_input' type='text' value={mail} placeholder='Email' onChange={(e) => setMail(e.target.value)}></input>
                <br/>
                <span class="material-symbols-outlined">
                lock
                </span>
                <input className='form_input' type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
              </div> 
              <div>
                <button className='submit_button' onClick={register}>Submit</button>
              </div> 
                 
          </div>
        </div>
    </div>
    <BackAnim />
    </>
  )
}

export default Register