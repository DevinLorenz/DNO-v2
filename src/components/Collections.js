import React, { useState } from 'react';
import './styling/Collections.css';
import addRealmModal from './modals/AddRealmModal';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../store/slices/loadingSlice';
import {
  setAddRealmFalse,
  setAddRealmTrue,
} from '../store/slices/addRealmSlice';

const Collections = () => {
  let dispatch = useDispatch();

  const addRealmHandler = () => {
    dispatch(setAddRealmTrue());
  };

  const createRealmCards = (realm) => {
    const url = `http://localhost:5000/user`;
    axios
      .get(`${url}/realm/retrieve`)
      .then(dispatch(setLoadingTrue()))
      .then((res) => {
        dispatch(setLoadingFalse());
        console.log('AFTER GET REALM', res.data);
        const realmCards = res.data.map((realm) => {
          return (
            <div className="realm-card">
              <div className="realm-card-title">
                <h3>{realm.name}</h3>
                <button className="realm-card-option-btn">...</button>
              </div>
              <button className="realm-card-btn">View</button>
            </div>
          );
        });
      })
      .catch((err) => {
        dispatch(setLoadingFalse());
        console.log(err);
      });
  };

  return (
    <div className="collections-bg">
      <div className="collections-box">
        <div className="collections-title">My Realms</div>
        <div className="collections-content" onLoad={createRealmCards}>
          <button className="add-new-btn" onClick={addRealmHandler}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collections;
