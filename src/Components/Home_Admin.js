import React from 'react'
import Sidebar from './Sidebar'
import {ReactComponent as Error} from '../images/Error.svg'
import {ReactComponent as ErrorText} from '../images/errortext.svg'

function Home_Admin() {
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
                        <button className='GenButton'></button>
                        </div>
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
                <div className='ErrorSign'>
                    <Error />
                </div>
                <div className='ErrorSign Errortext'>
                    <ErrorText />
                </div>
            </div>
        </div>
  )
}

export default Home_Admin