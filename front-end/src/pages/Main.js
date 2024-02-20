import React, { useEffect, useState } from 'react'
import './main.css'
import BackAnim from './BackAnim'
import Navbar from './Navbar'
import cpu from '../images/cpu.png'
import ram from '../images/ram.jpg'
import disk from '../images/disk.jpg'
import Card from './Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Main = (props) => {

  const navigate = useNavigate()
  const [beData, setBeData] = useState(null);
  const [beRam, setBeRam] = useState(null);
  const [beDisk, setBeDisk] = useState(null);
  const cpu_desc = "The CPU is a complex set of electronic circuitry that runs the machine's operating system and apps. "
  +"The CPU interprets, processes and executes instructions, most often from the hardware and softwareprograms running on the device."

  const ram_desc = "The term RAM stands for random-access memory. In essence, it is a computer's short-term memory. "
  +" It's where the data is stored that your computer processor needs to run your applications and open your files."

  const disk_desc = "A hard disk drive (HDD) is a computer component that stores data, such as the operating"
  + "system, applications, and user files. HDDs are “non-volatile” storage devices, meaning they retain stored data even when power isn't being supplied."

  useEffect(() => {
    axios.get("/cpu")
      .then(res => setBeData(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("/ram")
      .then(res => setBeRam(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("/disk")
      .then(res => setBeDisk(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        navigate('/Login');
    }
  });

  const getfile =()=>{
    navigate('/Info')
  }

  return (
    <>
    <Navbar />  
    <div className='getfile' onClick={getfile}>
      <span class="material-symbols-outlined">
        description
      </span>
      Get Info
    </div>
    <div className='cards_container'>
      <Card img={cpu} title="The CPU" description={cpu_desc} name="cpu" click="cpu_fun" beData={beData} />
      <Card img={ram} title="The RAM" description={ram_desc} name="ram" click="ram_fun" beData={beRam}/>
      <Card img={disk} title="The Disk" description={disk_desc} name="disk" click="disk_fun" beData={beDisk}/>
    </div>
    <BackAnim />
    </>
  )
}

export default Main