import React from 'react'
import './styling/Auth.css'
import { useState, useContext } from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
import { setLoadingFalse, setLoadingTrue } from '../store/slices/loadingSlice'
import { useDispatch } from 'react-redux'



const Auth = () => {
  const [register, setRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  

  const authCtx = useContext(AuthContext)
  let dispatch = useDispatch()

  const submitHandler = e => {
      e.preventDefault()
      const body = {
          username,
          email,
          password
      }
  
      const url = `http://localhost:5000/user`

      axios.post(register ? `${url}/register` : `${url}/login`, body)
      .then(dispatch(setLoadingTrue()))
      .then((res) => {
            dispatch(setLoadingFalse())
              console.log('AFTER AUTH', res.data)
              authCtx.login(res.data.token, res.data.exp, res.data.userId)
          })
          .catch(err => {
            dispatch(setLoadingFalse())
              console.log(err)
              setPassword('')
              setUsername('')
              setEmail('')
          })
        }

    return (
      <div className='auth-bg'>
        <div className='auth-container'>
          <form className='signin-form' onSubmit={submitHandler}>
            <h1>Welcome to Dev's NPC Organizer!</h1>

            <input 
            type='text' 
            placeholder='Username' 
            value={username}
            minLength='6'
            maxLength='20'
            require={true}
            onChange={(e) => setUsername(e.target.value)}
            />

            {register ? (<input
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              require={true}
            />)
            : null
            }
              

            <input 
            type='password' 
            placeholder='Password' 
            value={password}
            minLength='7'
            maxLength='20'
            onChange={(e) => setPassword(e.target.value)}
            require={true}
            />

          
            

            <button className='form-btn'>{!register ? 'Login' : 'Sign Up'}</button>
            
            <p className='form-text' onClick={() => setRegister(!register)}>{!register ? 'Need an account?' : 'Already have an account?'}</p>
          </form>
            
        </div>
      </div>
    )
  }


export default Auth