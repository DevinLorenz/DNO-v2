import React, { useState, useEffect } from 'react'
import './AddRegionModal.css'
import { useDispatch } from 'react-redux'
import { setAddRegionFalse, setAddRegionTrue } from '../../store/slices/addRegionSlice'
import { setLoadingFalse, setLoadingTrue } from '../../store/slices/loadingSlice'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import { useContext } from 'react'



const AddRealmModal = () => {
    const authCtx = useContext(AuthContext)
    let dispatch = useDispatch()
    let [regionName, setRegionName] = React.useState('')
    let [regionNotes, setRegionNotes] = React.useState('')
    let userId = authCtx.userId
    let realmId = localStorage.getItem('realmId')


    
    const submitHandler = e => {
        e.preventDefault()
        
        const body = {
            name: regionName,
            notes: regionNotes,
            realmId: realmId
        }
        
        
    
        const url = `http://localhost:5000/user`
    
        axios.post(`${url}/regions/${realmId}/create`, body)
        .then(dispatch(setLoadingTrue()))
        .then((res) => {
            dispatch(setAddRegionFalse())
            console.log('AFTER ADD REGION', res.data.body)
            window.location.reload()
            localStorage.removeItem('regionId')
            localStorage.removeItem('townId')
            dispatch(setLoadingFalse())
        })
        .catch(err => {
            dispatch(setLoadingFalse())
            console.log(body)
            
            console.log(err)
            setRegionName('')
            setRegionNotes('')
            console.log(`hey im breaking here boss`)
        })

    }
    
    

  return (
    <div className='add-region-modal'>
        <div className='add-region-bg' >
                <div className='add-region-content'>
                    <div className='add-region-title'>
                        <button className='add-region-close-btn' onClick={() => dispatch(setAddRegionFalse())}>X</button>
                    </div>

                    <form className='add-region-input' onSubmit={submitHandler}>

                        <input 
                            type='text' 
                            placeholder='Region Name' 
                            value={regionName} 
                            onChange={(e) => setRegionName(e.target.value)} 
                            required
                            id='region-name'
                        />


                        <textarea 
                             
                            placeholder='Region Notes (optional)' 
                            value={regionNotes}
                            onChange={(e) => setRegionNotes(e.target.value)} 
                            id='region-notes'
                        />
                        
                        <button type='submit' className='add-region-btn'>Add</button>
                    </form>


                </div>
            </div>
        </div>
   
  )
}

export default AddRealmModal
