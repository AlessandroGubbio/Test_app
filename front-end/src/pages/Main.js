import React, { useEffect, useState } from 'react'
import './main.css'
import BackAnim from './BackAnim'
import Navbar from './Navbar'
import cpu from '../images/cpu.png'
import ram from '../images/ram.jpg'
import Card from './Card'
import axios from 'axios'



const Main = (props) => {


  const [beData, setBeData] = useState(null);
  const cpu_desc = "The CPU is a complex set of electronic circuitry that runs the machine's operating system and apps. "
  +"The CPU interprets, processes and executes instructions, most often from the hardware and softwareprograms running on the device."

  const ram_desc = " The term RAM stands for random-access memory. In essence, it is a computer's short-term memory. "
  +" It's where the data is stored that your computer processor needs to run your applications and open your files."

  useEffect(() => {
    axios.get("/cpu")
      .then(res => setBeData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
    <Navbar />  
    <div className='cards_container'>
      <Card img={cpu} title="The CPU" description={cpu_desc} name="cpu" click="cpu_fun" beData={beData} />
      {/* <Card img={ram} title="The RAM" description={ram_desc} name="ram" click="ram_fun"/> */}
    </div>
    <BackAnim />
    </>
  )
}

export default Main