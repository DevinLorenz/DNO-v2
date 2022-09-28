import React from 'react'
import './LoadingModal.css'
import '../../assets/D20-dno.png'


const loadingModal = () => {
  return (
    <div className='loading-modal'>
        <div className='loading-background'>
            
                <img className='loader' src={require('../../assets/D20-dno.png')} />
        </div>
    </div>
  )
}

export default loadingModal