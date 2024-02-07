import React, { useState } from 'react'
import './navbar.css'
import {  useLocation } from 'react-router-dom'

const Nabar = () => {
  
  const [title, setTitle] = useState('');
  
  const home = ()=>{
    window.location.reload();
  }
  const logout= ()=>{
    alert('you need to be logged in to logout')
  }
  
  const location = useLocation().pathname
  
  function Title(){
    if(location === '/Login'){
      return "Welcome to our site"
    }else if(location ==='/Register'){
      return "Join our family"
    }else{
      return 'Home'
    }
  }
   
  
  return (
    <div className='navbar'>
      <a className='home_btn'>
      <span onClick={home} class="material-symbols-outlined">
        home
      </span>
      </a>
      <h4 className='nav_title'>{Title()}</h4>
      <a className='logout_btn'>
      <span onClick={logout} class="material-symbols-outlined">
        logout
      </span>
      </a>
    </div>
  )
}

export default Nabar