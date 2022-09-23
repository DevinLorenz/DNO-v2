import React from 'react'
import '../assets/DNO-LOGO.2.png'
import '../assets/D20-dno.png'
import './styling/Footer.css'

const Footer = () => {
  return (
    <div>
        <footer>
            <div className='footer-container'>
                <div className='footer-logo'>
                    {/* <img src={require('../assets/DNO-LOGO.2.png')} alt="Dev's NPC Organizer Logo" /> */}
                    <img src={require('../assets/D20-dno.png')} alt="D20" />
                </div>

            </div>
        </footer>
    </div>
  )
}

export default Footer