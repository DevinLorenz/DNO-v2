import React from 'react'
import { NavLink } from 'react-router-dom'
import './styling/Header.css'

const Header = () => {
  return (
    <header className='header-comp'>
      <div className='header-logo'>
        <img src={require('../assets/DNO-LOGO.2.png')} alt="Dev's NPC Organizer Logo" />
        Dev's NPC Organizer
      </div>
            <nav>
                <NavLink to='/'><button className='header-btn' id='header-btn'>Home</button></NavLink>
                <NavLink to='/collections'><button className='header-btn' id='header-btn'>Collections</button></NavLink>
                <NavLink to='/profile'><button className='header-btn' id='header-btn'>My Account</button></NavLink>
                <NavLink to='/login'><button className='header-btn' id='logoutbtn'>Logout</button></NavLink>
            </nav>

    </header>
  )
}

export default Header