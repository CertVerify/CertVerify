import React from 'react'
import Sidebar from './Sidebar'
import { ReactComponent as GenIcon } from '../images/icongen.svg'
import { ReactComponent as DateIcon } from '../images/dategen.svg'
import { ReactComponent as MarksIcon } from '../images/marksgen.svg'
import { useState } from 'react'

function CreateCertficate() {
  const [user, Setuser] = useState({
    name: "", Dob: "", Marks: "",file:""
  });

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    Setuser((prev)=>{
        return {...prev , [name]: value}
    })
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(user);
  }
  return (
    <div className='Home_Admin'>
        <Sidebar />
        <form className='test' onSubmit={handleSubmit}>
            <div className='GenText1 textft gentext'>
                Create a Certificate
            </div>
            <div className='PortalText3'>
                <div className='namename'>
                  Full Name
                </div>
                  <GenIcon />
                <input type='name' className='Nameinput' name='name'  onChange={handleChange} placeholder='Enter your full Name'>
                </input>
            </div>
            <div  className='flexit PortalText3 dategen'>
              <div className='flexset'>
                <div className='namename'>
                  Date of Birth
                </div>
                  <DateIcon />
                <input type='date' className='datedate' name='Dob'  onChange={handleChange}placeholder='Enter your full Name'>
                </input>
                
              </div>
              <div className='flexset2'>
                <div className='namename marginset'>
                  Enter Total Marks
                </div>
                  <MarksIcon />
                <input type='number' className='marksmarks' name='Marks' onChange={handleChange} placeholder='Marks'>
                </input>
              </div>
            </div>
            <div>
              <input type='file' name='file' onChange={handleChange}>
              </input>
            </div>
            <div className='Buttondiv'>
              <button type='Submit' className='Create'></button>
            </div>
        </form>
    </div>

  )
}

export default CreateCertficate