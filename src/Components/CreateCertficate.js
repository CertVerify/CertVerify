import React from 'react'
import Sidebar from './Sidebar'
import { ReactComponent as GenIcon } from '../images/icongen.svg'
import { ReactComponent as DateIcon } from '../images/dategen.svg'
import { ReactComponent as MarksIcon } from '../images/marksgen.svg'
// import { ReactComponent as Check } from '../images/test.jpg'
import { useState } from 'react'



function CreateCertficate() {
  const [user, Setuser] = useState({
    name: "", Dob: "", Marks: "",file:null
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  
    if (name === 'file' && e.target.files.length) {
      Setuser((prev) => ({
        ...prev,
        [name]: e.target.files[0],
      }));
    } else {
      Setuser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = user.name;
    const marks = user.Marks;
    const dob = user.Dob;
    const img = user.file;
    // console.log(name);

    const form_send = {name,dob, marks, img};
    console.log(form_send);
    const response = await fetch('http://localhost:5000/generateCertificate',{
      method: 'POST',
      body: form_send
    });
    const responseDATA = await response.json();
      console.log(responseDATA);
    console.log(user);
  };
  
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
                <input type='name' className='Nameinput' name='name'  id='name' onChange={handleChange} placeholder='Enter your full Name'>
                </input>
            </div>
            <div  className='flexit PortalText3 dategen'>
              <div className='flexset'>
                <div className='namename'>
                  Date of Birth
                </div>
                  <DateIcon />
                <input type='date' className='datedate' name='Dob'  id='Dob' onChange={handleChange}placeholder='Enter your full Name'>
                </input>
                
              </div>
              <div className='flexset2'>
                <div className='namename marginset'>
                  Enter Total Marks
                </div>
                  <MarksIcon />
                <input type='number' className='marksmarks' id='marks' name='Marks' onChange={handleChange} placeholder='Marks'>
                </input>
              </div>
            </div>
            <div>
              <input type='file' name='file' id='file' onChange={handleChange}>
              </input>
            </div>
            <div className='Buttondiv'>
              <button type='Submit' className='Create'></button>
            </div>
        </form>
    </div>

  )
}

export default CreateCertficate;

