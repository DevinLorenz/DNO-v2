import React, { useState, useEffect } from 'react'
import './AddTownModal.css'
import { useDispatch } from 'react-redux'
import { setAddTownFalse, setAddTownTrue } from '../../store/slices/addTownSlice'
import { setLoadingFalse, setLoadingTrue } from '../../store/slices/loadingSlice'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import { useContext } from 'react'



const AddTownModal = () => {
    const authCtx = useContext(AuthContext)
    let dispatch = useDispatch()
    let [townName, setTownName] = React.useState('')
    let [townNotes, setTownNotes] = React.useState('')
    let userId = authCtx.userId
    let regionId = localStorage.getItem('regionId')


    
    const submitHandler = e => {
        e.preventDefault()
        
        const body = {
            name: townName,
            notes: townNotes,
            regionId: regionId,
        }
        
        
    
        const url = `http://localhost:5000/user`
    
        axios.post(`${url}/towns/${regionId}/create`, body)
        .then(dispatch(setLoadingTrue()))
        .then((res) => {
            dispatch(setAddTownFalse())
            console.log('AFTER ADD Town', res.data.body)
            window.location.reload()
            localStorage.removeItem('regionId')
            localStorage.removeItem('townId')
            dispatch(setLoadingFalse())
        })
        .catch(err => {
            dispatch(setLoadingFalse())
            console.log(body)
            
            console.log(err)
            setTownName('')
            setTownNotes('')
            console.log(`hey im breaking here boss`)
        })

    }
    
    

  return (
    <div className='add-town-modal'>
        <div className='add-town-bg' >
                <div className='add-town-content'>
                    <div className='add-town-title'>
                        <button className='add-town-close-btn' onClick={() => dispatch(setAddTownFalse())}>X</button>
                    </div>

                    <form className='add-town-input' onSubmit={submitHandler}>

                        <input 
                            type='text' 
                            placeholder='Town Name' 
                            value={townName} 
                            onChange={(e) => setTownName(e.target.value)} 
                            required
                            id='town-name'
                        />


                        <input 
                            type='text' 
                            placeholder='Town Notes (optional)' 
                            value={townNotes}
                            onChange={(e) => setTownNotes(e.target.value)} 
                            id='town-notes'
                        />
                        
                        <button type='submit' className='add-town-btn'>Add</button>
                    </form>


                </div>
            </div>
        </div>
   
  )
}

export default AddTownModal
