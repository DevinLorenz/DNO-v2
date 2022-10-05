import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Collections from './components/Collections';
import Auth from './components/Auth';
import Profile from './components/Profile';
import ViewRealm from './components/subcomponents/ViewRealm';

import { useContext, useEffect, useState } from 'react';
import AuthContext from './store/authContext';

import { useSelector } from 'react-redux';

import { selectLoading } from './store/slices/loadingSlice';
import { selectAddRealm } from './store/slices/addRealmSlice';
import { selectAddRegion } from './store/slices/addRegionSlice';
import { selectAddTown } from './store/slices/addTownSlice';
import { selectAddNpc } from './store/slices/addNpcSlice';

import LoadingModal from './components/modals/LoadingModal';
import AddRealmModal from './components/modals/AddRealmModal';
import AddRegionModal from './components/modals/AddRegionModal';
import AddTownModal from './components/modals/AddTownModal';
import AddNpcModal from './components/modals/AddNpcModal';




function App() {
  const authCtx = useContext(AuthContext);
  let isLoading = useSelector(selectLoading);
  let isAddingRealm = useSelector(selectAddRealm);
  let isAddingRegion = useSelector(selectAddRegion);
  let isAddingTown = useSelector(selectAddTown);
  let isAddingNpc = useSelector(selectAddNpc);

  let userId = authCtx.userId;

  return (
    <div className="App">
      {isAddingRealm && <AddRealmModal />} 
      {isLoading && <LoadingModal />}
      {isAddingRegion && <AddRegionModal />}
      {isAddingTown && <AddTownModal />}
      {isAddingNpc && <AddNpcModal />}


      <Header />
      <Routes>
        <Route
          path="/"
          element={authCtx.token ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/collections"
          element={authCtx.token ? <Collections /> : <Navigate to="/auth" />}
        />
        <Route
          path="/profile"
          element={authCtx.token ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="collections/view/:realmId" element={authCtx.token ? <ViewRealm /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
