import React from 'react'
import Sidebar from './Sidebar'
import {ReactComponent as Error} from '../images/Error.svg'
import {ReactComponent as ErrorText} from '../images/errortext.svg'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {ethers} from "ethers";

function Home_Admin() {
  const [connected, toggleConnect] = useState(false);
  const [currAddress, updateAddress] = useState('0x');

  async function getAddress() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
    console.log(addr);
  }

  async function connectWebsite() {
    await window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
      console.log('here');
      getAddress();
      window.location.reload();
    });
  }

  useEffect(() => {
    if (window.ethereum == undefined) return;
    let val = window.ethereum.isConnected();
    console.log("Connected");
    if (val) {
      console.log('here');
      getAddress();
      toggleConnect(val);
    }

    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    });
  }, []);

  return (
    <div className="Home_Admin">
      <Sidebar />
      <div className="test">
        <div className="PortalText1 textft">
          <div className="Admin_Text">
            Admin Portal
            <div className="PortalText2">Welcome, Rakesh! 👋 </div>
          </div>
          <div className="Admin_Button">
            <button className="GenButton" onClick={connectWebsite}>
              {connected ? 'Connected' : 'Connect Wallet'}
            </button>
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
  );
}

export default Home_Admin;
