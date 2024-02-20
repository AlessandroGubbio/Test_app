import BackAnim from './BackAnim'
import Nabar from './Navbar'
import React, { useState } from 'react'
import axios from 'axios';
import './admin.css'

const Admin = () => {
  const [title, setTitle] = useState('Show')
  const [accounts, setAccounts] = useState("");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [n_user, setN_user] = useState("");
  const [n_mail, setN_Mail] = useState("");
  const [n_pass, setN_pass] = useState("");

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [hide, setHide] = useState(false);
  const [hideU, setHideU] = useState(false);

  const showAccounts = () =>{
    axios.get('/admin')
    .then(res =>{
      handleClick()
      setAccounts(res.data)
      setHide(!hide)
    }).catch(err=>{   
      console.log(err)
    })
  }

  function handleClick (){
    setTitle(title === 'Show' ? 'Hide' : 'Show');
  }

  const create = () =>{
    try {
      axios.post("/signup", {username, mail, password}).then(
        setUsername(''),
        setPassword(''),
        setMail(''),
        setSuccess('User successfully Created')
      )
      .catch(err => {
        setError('Username not available. Please try a different one')
        console.log(err);
      });
    } catch (error) {
      setError('This Account already exists');
      console.log(error)
    } 
  }

  const modify = async () =>{
    setHideU(!hideU)
  }

  const update = async ()=>{
    try {
      await axios.post("/update", {username, mail, password, n_user, n_mail, n_pass}).then(
      setUsername(''),
      setMail(''),
      setPassword(''),
      setN_pass(''),
      setN_Mail(''),
      setN_user(''),
      setSuccess('Update successful')
      )
    } catch (error) {
      setError('Invalid email or password. Modification unsuccesfull');
      console.log(error);
    }
    
  }

  const deleteU = () =>{
    try {
      axios.post("/delete", {username}).then(
        setUsername(''),
        setPassword(''),
        setMail(''),
        setSuccess('The User has been Successfully Deleted')
      ).catch(err =>{
        setError('Error deleting account')
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
    
    <Nabar />
    <div className='users_info'>
      <p className='users_description'>Click here to view all users currently registered to our website</p>
      <button className='btn_users' onClick={showAccounts}>{title} Users</button>
      {hide && accounts &&(
        <div className='users_div'>
          <ul className='users'>
            {accounts.map(accounts => (
            <li className='list_users'>
              <div className='div_user_info'>
                <div className='div_users'>Username:  {accounts.username} </div>
                <div className='div_users'>Email: {accounts.email}</div>
                <div>Password: {accounts.password}</div>
              </div>
            </li>            
              ))}
          </ul>
        </div>
        )}
      <div className='form_crud'>
        <div style={{color: 'red'}}>{error}</div>
        <div style={{color: 'rgb(0, 239, 68)'}}>{success}</div>
        <div>Insert information to create, modify or delete a user </div>
        <span class="material-symbols-outlined">
          person
        </span>
        <input className='username_input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>   
        <span class="material-symbols-outlined">
          email
        </span>         
        <input className='mail_input' type='text' placeholder='Email' value={mail} onChange={(e) => setMail(e.target.value)}></input>      
        <span class="material-symbols-outlined">
          lock
        </span>      
        <input className='password_input' type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input> 
        <br/>  
        {hideU &&(
          <>
          <p className='update_description'>Insert the NEW user Information</p>
          <div className='new_info'>
            <input className='username_input'placeholder='New Username' value={n_user} onChange={(e) => setN_user(e.target.value)}></input>
            <input className='username_input'placeholder='New Email' value={n_mail} onChange={(e) => setN_Mail(e.target.value)}></input>
            <input className='username_input' placeholder='New Password'value={n_pass} onChange={(e) => setN_pass(e.target.value)}></input>
            <button className='up_btn' onClick={update} >SUBMIT</button>
          </div>
          </>
          )}          
      </div>
      <div className='buttons'>
          <button className='crud_c' onClick={create}>CREATE</button>
          
          <button className='crud_u' onClick={modify}>UPDATE</button>
          
          <button className='crud_d' onClick={deleteU}>DELETE</button>
          
        </div>
    </div>
    
    <BackAnim/>
    </>
  )
}

export default Admin