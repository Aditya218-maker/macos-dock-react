import React from 'react'
import "./nav.scss"
import DateTime from './DateTime'
const Navbar = () => {
  return (
    <nav>
        <div className="left">
            <div className="appleicon">
                <img src="./nav_icons/apple.svg" alt="" />
            </div>
            <div className="navitem">
                <p>Aditya Anand</p>
            </div>
            <div className="navitem">
                <p>File</p>
            </div>
            <div className="navitem">
                <p>Window</p>
            </div>
            <div className="navitem">
                <p>Terminal</p>
            </div>
        </div>
        <div className="right">
            <div className="nav-icon">
                <img src="./nav_icons/wifi.svg" alt="" />
            </div>
            <div className="navitem">
                <DateTime/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
