import React from 'react'
import './styling/Auth.css'
import { useState } from 'react'

const Auth = () => {
  const [register, setRegister] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  


  return (
    <div className='auth-bg'>
      <div className='auth-container'>
        <form className='signin-form'>
          <h1>Welcome to Dev's NPC Organizer!</h1>

          {register ? (<input 
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />) : null}

          {register ? (<input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />) : null}


            <input 
          type='text' 
          placeholder='Username' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />

          {register ? (<input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>)
          : null
          }
            

          <input 
          type='password' 
          placeholder='Password' 
          value={password}
          />

          {register ? (<input
          type='password'
          placeholder='Confirm Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />) : null}
          

          <button className='form-btn'>{!register ? 'Login' : 'Sign Up'}</button>
          
          
          <p className='form-text' onClick={() => setRegister(!register)}>{!register ? 'Need an account?' : 'Already have an account?'}</p>
        </form>
      </div>
    </div>
  )
}

export default Auth