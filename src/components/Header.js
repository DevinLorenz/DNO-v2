import React from 'react';
import { NavLink } from 'react-router-dom';
import './styling/Header.css';
import { useContext, useState } from 'react';
import AuthContext from '../store/authContext';
import { useDispatch } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../store/slices/loadingSlice';
import axios from 'axios';

const Header = () => {
  let dispatch = useDispatch();
  const authCtx = useContext(AuthContext); 

  const userId = authCtx.userId
  
  const logoutHandler = () => {
    dispatch(setLoadingTrue());
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('userId');
    window.location.reload();

    return setLoadingFalse();
  };

 
  
  
  




  return (
    <header className="header-comp">
      <div className="header-logo">
        <img
          src={require('../assets/DNO-LOGO.2.png')}
          alt="Dev's NPC Organizer Logo"
        />
        Dev's NPC Organizer
      </div>
      <nav>
        {authCtx.token ? (
          <NavLink to="/">
            <button className="header-btn" id="header-btn"
            onClick={() => {localStorage.removeItem('realmId')
            localStorage.removeItem('regionId')
            localStorage.removeItem('townId')
            localStorage.removeItem('npcId')
            }}>
              Home
            </button>
          </NavLink>
        ) : null}

        {authCtx.token ? (
          <NavLink to="/collections">
            <button className="header-btn" id="header-btn"
            onClick={() => {localStorage.removeItem('realmId')
            localStorage.removeItem('regionId')
            localStorage.removeItem('townId')
            localStorage.removeItem('npcId')
            }}>
              Collections
            </button>
          </NavLink>
        ) : null}

        {authCtx.token ? (
          <NavLink to="/profile">
            <button className="header-btn" id="header-btn"
            onClick={() => {localStorage.removeItem('realmId')
            localStorage.removeItem('regionId')
            localStorage.removeItem('townId')
            localStorage.removeItem('npcId')
            }}>
              My Account
            </button>
          </NavLink>
        ) : null}

        {authCtx.token ? (
          <NavLink to="/auth">
            <button
              className="header-btn"
              id="logoutbtn"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </NavLink>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
