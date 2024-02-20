import React from 'react'
import './navbar.css'
import { useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

const Nabar = () => {
  
  const location = useLocation().pathname
  const navigate = useNavigate()
  
  const home = ()=>{
    if(location==="/Login" || location==="/Main"){
      window.location.reload();
    }else if(location=== "/Info"){
      navigate("/Main");
    }else{
      navigate('/Login')
    }
  }

  const logout= ()=>{
    if(location==="/Login"){
      alert('you need to be logged in to logout')
    }else{
      localStorage.removeItem("auth-token")
      navigate('/Login')
  }}
  
  
  function Title(){
    if(location === '/Login'){
      return "Welcome to our site"
    }else if(location ==='/Register'){
      return "Join our family"
    }else if(location === '/Info'){
      return "Files Info"
    }else if(location === "/Admin"){
      return "Admin Privileges"
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
      <h4 className='nav_title' style={{cursor:"default"}}>{Title()}</h4>
      <a className='logout_btn'>
      <span onClick={logout} class="material-symbols-outlined">
        logout
      </span>
      </a>
    </div>
  )
}

export default Nabar