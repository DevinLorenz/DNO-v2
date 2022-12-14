import React, { useState, useEffect } from 'react'
import './AddRealmModal.css'
import { useDispatch } from 'react-redux'
import { setAddRealmFalse, setAddRealmTrue } from '../../store/slices/addRealmSlice'
import { setLoadingFalse, setLoadingTrue } from '../../store/slices/loadingSlice'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import { useContext } from 'react'



const AddRealmModal = () => {
    const authCtx = useContext(AuthContext)
    let dispatch = useDispatch()
    let [realmName, setRealmName] = React.useState('')
    let [realmNotes, setRealmNotes] = React.useState('')
    let [userId , setUserId] = React.useState()
    
    
    
    const submitHandler = e => {
        e.preventDefault()
        

        // let realmName = document.querySelector('#realm-name').value
        // let realmNotes = document.querySelector('#realm-notes').value
        const body = {
            name: realmName,
            notes: realmNotes,
            userId: authCtx.userId
        }
        
        
    
        const url = `http://localhost:5000/user`
    
        axios.post(`${url}/realm/:${userId}/create`, body)
        .then(dispatch(setLoadingTrue()))
        .then((res) => {
            dispatch(setAddRealmFalse())
            console.log('AFTER ADD REALM', res.data.body)
            window.location.reload()
            dispatch(setLoadingFalse())
        })
        .catch(err => {
            dispatch(setLoadingFalse())
            console.log(body)
            
            console.log(err)
            setRealmName('')
            setRealmNotes('')
            console.log(`hey im breaking here`)
        })

    }
    
    

  return (
    <div className='add-realm-modal'>
        <div className='add-realm-bg' >
                <div className='add-realm-content'>
                    <div className='add-realm-title'>
                        <button className='add-realm-close-btn' onClick={() => dispatch(setAddRealmFalse())}>X</button>
                    </div>

                    <form className='add-realm-input' onSubmit={submitHandler}>

                        <input 
                            type='text' 
                            placeholder='Realm Name' 
                            value={realmName} 
                            onChange={(e) => setRealmName(e.target.value)} 
                            required
                            id='realm-name'
                        />


                        <textarea 
                            
                            placeholder='Realm Notes (optional)' 
                            value={realmNotes}
                            onChange={(e) => setRealmNotes(e.target.value)} 
                            id='realm-notes'
                        />
                        
                        <button type='submit' className='add-realm-btn'>Add Realm</button>
                    </form>


                </div>
            </div>
        </div>
   
  )
}

export default AddRealmModal
