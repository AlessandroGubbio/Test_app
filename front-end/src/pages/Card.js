import React, { useEffect } from 'react'

import axios from 'axios';
import { useState } from 'react';

const Card = (props) => {
    const [isLoading, setIsLoading] = useState(false); 

    const [beData,setBeData] = useState() 
    const [btnText,setBtnText] = useState('Show') 

    const [hide, setHide] = useState(false) 

    function handleClick (){
        setBtnText(btnText === 'Show' ? 'Hide' : 'Show');
    }
    
    async function cpuInfo(){
        setIsLoading(true); // Set loading indicator while fetching data
        try {
        const response = await axios.get('/cpu');
        setBeData(response.data);
        setHide(!hide); // Update hide state after data is fetched
        } catch (err) {
        console.error(err);
        // Handle error appropriately, e.g., display an error message
        } finally {
        setIsLoading(false); // Remove loading indicator
        }
      }

    function btn_click(){
        setHide(!hide);
        handleClick();
        if (props.click ==="cpu_fun"){
            cpuInfo()
        }else if(props.click==='ram_fun'){
            ramInfo()
        }
    }

    
    const CpuView = (props) => {
        const { beData } = props; // Access beData passed as props
      
        if (!beData) {
          return null; // Handle case where beData is not available
        }
      
        return (
          <div style={{ visibility: props.hide ? 'visible' : 'hidden' }} className='box'>
            <div className='cpu_info'>
              <p className='info'>- Number of Cpus available:</p>
              <p className='info_n'>{beData.numberCpu}</p>
              <br/>
              <p className='info'>- Total number Cpu available: </p>
              <p className='info_n'>{beData.totCpus}</p>
              <br/>
              <p className='info'>- Percentage of Cpu being used :</p>
              <p className='info_n'>{beData.cpuUsage}%</p>
              <br/>
            </div>
          </div>
        );
      };

    const ramInfo = () =>{
        axios.get('/ram')
        .then(res =>{
          setBeData(res.data);
          setHide(!hide)
          console.log(res.data)
        }).catch(err=>{   
          console.log(err)
        })
      }
    
    

  return (
    <>
    <div className='info_container'>
        <div className='image_container'>
          <img className='image' src={props.img} alt='cpu'></img>
        </div>
        <div className='text_container'>
          <p className='card_title'>{props.title}</p>
          <p className='description'>{props.description}
          </p>
        </div>
        <p className='description'> Click here to view the Server's {props.name} information </p>
        <div className='btn_container'>
          <button className='show_btn' onClick={btn_click}>{btnText}</button>
        </div>
      </div>
      {hide && beData && (
        props.click === 'cpu_fun' ? (
        <CpuView beData={beData} hide={hide} />
        ) : (
        <RamView beData={beData} hide={hide} />
        ))}
    </>
  )
}

export default Card