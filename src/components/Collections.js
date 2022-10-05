import React, { useState, useContext, useEffect } from 'react';
import './styling/Collections.css';
import addRealmModal from './modals/AddRealmModal';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import ViewRealm from './subcomponents/ViewRealm';

import AuthContext from '../store/authContext';
import { useDispatch } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../store/slices/loadingSlice';
import {
  setAddRealmFalse,
  setAddRealmTrue,
} from '../store/slices/addRealmSlice';

const Collections = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const [realmData, setRealmData] = useState([]);

  const addRealmHandler = () => {
    dispatch(setAddRealmTrue());
  };
  
 
  const getRealms = () => {
    dispatch(setLoadingTrue());
    axios
    .get(`http://localhost:5000/user/realms/${userId}/retrieve`)
    .then((res) => {
      setRealmData(res.data);
      console.log(res.data);
      dispatch(setLoadingFalse());
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoadingFalse());
    });
  };
  
  useEffect(() => {
    getRealms();
  }, []);
  
  
  const viewRealmHandler = (id) => {
    const realmId = id;
    localStorage.setItem('realmId', realmId);
    console.log(realmId);
    
  navigate(`/collections/view/${realmId}`)
    
  };

 if(realmData.length >= 4) {
  document.querySelector('.add-new-btn').setAttribute('disabled', 'disabled')
 }



  

  return (
    <div className="collections-bg">
      <div className="collections-box">
        <div className="collections-title">My Realms</div>
        <div className="collections-content"  >
          {realmData.map((realm) => {
            return (
              <div className="realm-card">
                <div className="realm-card-title">
                  <button className='options-button'>•••</button>
                  <div className="realm-card-title-text">{realm.name}</div>
                </div>
                <div className="realm-card-content">
                  <button className='view-button' 
                  onClick={viewRealmHandler.bind(null, realm.id)}
                  key={realm.id}
                  >
                    View
                  </button>
                </div>
              </div>
            )
          }  
          )}

          <button className="add-new-btn" onClick={addRealmHandler}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};




export default Collections;
