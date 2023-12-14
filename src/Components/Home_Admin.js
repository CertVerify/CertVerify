import React from 'react'
import Sidebar from './Sidebar'

function Home_Admin() {
  return (
        <div className='Home_Admin'>
            <Sidebar />
            <div className='test' >
                <div className='PortalText1 textft'>
                        Admin Portal
                        <button className='GenButton'>Connect to MetaMask</button>
                </div>
                <div className='PortalText2'>
                    Welcome, Rakesh! 👋 
                </div>
                <div className='PortalText3 textft'>
                    Generated Certificates
                    <select className='SelectButton'>
                    <option selected="">Issued On</option>
                    <option value="1">2023</option>
                    <option value="2">2022</option>
                    <option value="3">2021</option>
                    </select>
                </div>
            </div>
        </div>
  )
}

export default Home_Admin