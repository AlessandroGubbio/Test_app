import BackAnim from './BackAnim'
import Nabar from './Navbar'
import React, { useState } from 'react'
import axios from 'axios';
import './admin.css'

const Admin = () => {
  const [accounts, setAccounts] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [n_user, setN_user] = useState("");
  const [n_pass, setN_pass] = useState("");

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [hide, setHide] = useState(false);
  const [hideU, setHideU] = useState(false);

  const showAccounts = () =>{
    axios.get('/admin')
    .then(res =>{
      setAccounts(res.data)
      setHide(!hide)
    }).catch(err=>{   
      console.log(err)
    })
  }



  return (
    <>
    
    <Nabar />
    <div className='users_info'>
      <p className='users_description'>Click here to view all users currently registered to our website</p>
      <button className='btn_users' onClick={showAccounts}>Show Users</button>
      {hide && accounts &&(
        <div className='users_div'>
          <ul className='users'>
            {accounts.map(accounts => (
            <li className='list_users'>
              <div className='div_user_info'>
                <div className='div_users'>Username:  {accounts.username} </div>
                <div></div>
                <div> Password: {accounts.password}</div>
              </div>
            </li>            
              ))}
          </ul>
        </div>
        )}
      <div>
        
      </div>
    </div>
    
    <BackAnim/>
    </>
  )
}

export default Admin