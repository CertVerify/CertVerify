import React from 'react'
import '../App.css';
import {SidebarData} from "./SidebarData"
import {ReactComponent as CertVerify} from "../images/certVerify.svg"
function Sidebar() {
  return (
    <div className="Sidebar">
        <div className='Logo'><CertVerify /></div>
        <ul className='SidebarList'>

        {SidebarData.map((value, key) =>{
            return(
                <li key={key} className="elemnt" onClick= { () => {window.location.pathname = value.link;}}>
                {" "}
                <div id="hov">{value.hov}</div>{" "}
                <div id="icon">{value.icon}</div>{" "}
                <div id="title">{value.title}</div>
                </li>
            );   
            })}
        </ul>
    </div>
  )
}

export default Sidebar