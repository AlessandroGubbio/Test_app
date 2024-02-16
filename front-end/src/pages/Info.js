import React from 'react'
import Nabar from './Navbar'
import BackAnim from './BackAnim'
import './info.css'

const Info = () => {
  return (
    <>
        <Nabar /> 
        <div className='files_container'>
            <div className='file_form'>
                <p className='file_des'>- Type the name of a File you'd like to know the contents of (text files) </p>
                <input className='file_input' type='text'></input>
                <button className='file_btn'>SUBMIT</button>
            </div>
            <div className='file_form'>
                <p className='file_des'>- Type the name of a Directory you'd like to know the contents of</p>
                <input className='file_input' type='text'></input>
                <button className='file_btn'>SUBMIT</button>
            </div>
        </div>
        <BackAnim />
        
    
    </>
  )
}

export default Info