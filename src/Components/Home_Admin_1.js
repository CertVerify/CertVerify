import React from 'react'
import Sidebar from './Sidebar'
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import GeneratedCertificate from './GeneratedCertificate'


function Home_Admin_1() {
  return (
    <div className='Home_Admin'>
            <Sidebar />
            <div className='test' >
                <div className='PortalText1 textft'>
                        <div className='Admin_Text'>

                        Admin Portal
                        <div className='PortalText2'>Welcome, Rakesh! 👋 </div>
                        </div>
                        <div className='Admin_Button'>
                        <button className='CreateButton'></button>
                        <button className='MassCreateButton'></button>
                        </div>
                </div>
                <div className='PortalText3 textft'>
                    Generated Certificates
                </div>
                <GeneratedCertificate />
            </div>
        </div>
  )
}

export default Home_Admin_1