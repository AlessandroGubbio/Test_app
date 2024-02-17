import React from 'react'
import Nabar from './Navbar'
import BackAnim from './BackAnim'
import axios from 'axios';
import { useState } from 'react';
import './info.css'

const Info = () => {
  const [fileName, setfileName] = useState("")
  const [dirName, setdirName] = useState("")

  const [beFile, setBeFile] = useState()
  const [beDir, setBeDir] = useState()

  const [hide, setHide] = useState(false)
  const [hideDir, setHideDir] = useState(false)

  const readFile = ()=>{
    axios.post('/readFile', {fileName})
    .then(res =>{
      setBeFile(res.data)
      setHide(!hide)
    }).catch(err=>{   
      console.log(err)
    })
  }
  const readDir = ()=>{
    console.log("1")
    axios.post('/readDir', {dirName})
    .then(res =>{
      setBeDir(res.data)
      setHideDir(!hideDir)
    }).catch(err=>{   
      console.log(err)
    })
  }

  const notFound=()=>{
   ( typeof(beDir) === "object") ? (<p>hello</p>): (<p>no</p>)
  }

  return (
    <>
        <Nabar /> 
        <div className='files_container'>
            <div className='file_form'>
                <p className='file_des'>- Type the name of a File you'd like to know the contents of (text files) </p>
                <input className='file_input' type='text' placeholder='File name' value={fileName} onChange={(e)=>setfileName(e.target.value)}></input>
                <button className='file_btn' onClick={readFile}>SUBMIT</button>
                {hide && beFile && ( 
                <div className='file_box'>
                  <div className='file_info'>
                    {fileName} : {beFile} 
                  </div>
                </div>
                  )
                }
            </div>
            <div className='file_form'>
                <p className='file_des'>- Type the name of a Directory you'd like to know the contents of (C:\\Users\\agubb\\ + directory path)</p>
                <input className='file_input' type='text' placeholder='Directory name' value={dirName} onChange={(e)=>setdirName(e.target.value)}></input>
                <button className='file_btn' onClick={readDir}>SUBMIT</button>
                {hideDir && beDir && ( 
                <div className='file_box'>
                  <div className='dir_info'>
                    {dirName.slice(dirName.lastIndexOf('\\') + 1)} : 
                    <ul>
                      {beDir && beDir.map((info, index)=>(
                        <li key={index}>{info}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                )
              }
            </div>
        </div>
        <BackAnim />
        
    
    </>
  )
}

export default Info