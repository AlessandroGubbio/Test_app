import React from 'react'
import './main.css'
import BackAnim from './BackAnim'
import Navbar from './Navbar'
import cpu from './cpu.png'
import axios from 'axios';
import { useState } from 'react';



const Main = () => {
  const [beData,setBeData] = useState() 
  const [btnText,setBtnText] = useState('Show') 

  const [hide, setHide] = useState(false) 

  function handleClick (){
    setBtnText(btnText === 'Show' ? 'Hide' : 'Show');
};



  function cpuInfo(){
    axios.get("/cpu") // call to the backend api where the info is stored
    .then(res =>{     // if the callback is succesfull (res.data to get the json received from the backend)
      setBeData(res.data)
      setHide(!hide)  // set the useState to true so that the info gets shown
      console.log(res.data)
    }).catch(err=>{   // if there's an error in the callback
      console.log(err)
    })
  }

  function renderCPU(){
    cpuInfo();
    handleClick()
  }



  return (
    <>
    <Navbar />
    <div className='cards_container'>
      <div className='info_container'>
        <div className='image_container'>
          <img className='image' src={cpu} alt='cpu'></img>
        </div>
        <div className='text_container'>
          <p className='card_title'>The CPU</p>
          <p className='description'>
            The CPU is a complex set of electronic circuitry that runs the machine's 
            operating system and apps. The CPU interprets, processes and executes instructions, most often from the hardware and software
            programs running on the device.
          </p>
        </div>
        <p className='description'> Click here to view the Server's cpu information </p>
        <div className='btn_container'>
          <button className='show_btn' onClick={renderCPU}>{btnText}</button>
        </div>
      </div>
      {hide && beData && ( 
        <div className='box'>
          <div className='cpu_info'>
            <p className='info'>Number of Cpus available:</p>
            <p className='info_n'>{beData.numberCpu}</p>
            <br/>
            <p className='info'>Total number Cpu available: </p>
            <p className='info_n'>{beData.totCpus}</p>
            <br/>
            <p className='info'>Percentage of Cpu being used :</p>
            <p className='info_n'>{beData.cpuUsage}%</p>
            <br/>
          </div>
        </div>
        )
      }

    </div>
    <BackAnim />
    </>
  )
}

export default Main