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
        const {data} = res
        if(data){
          if(data.message){
            navigate("/Admin")
          }else{
            localStorage.setItem("auth-token", data);
            axios.defaults.headers.common['auth-token'] = data.token;
            navigate('/Main')
          }
        }
      }
        // if(res.data.message.includes('admin')){
        //   navigate("/Admin")
        // }else{
        //   navigate("/Main")
        // }
      ).catch(err => {
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
      <div className='container'>
        <div className='card'>
            <div className='title'>
              <h1>Sign In</h1>
            </div>
            <p style={{color: 'rgb(255, 0, 55)'}}>{error}</p>
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