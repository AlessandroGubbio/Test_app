import React from 'react'
import './navbar.css'

const Nabar = () => {
  const home = ()=>{
    window.location.reload();
  }
  const logout= ()=>{
    alert('you need to be logged in to logout')
  }
 
  return (
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
  )
}

export default Nabar