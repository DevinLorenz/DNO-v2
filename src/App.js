import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Collections from './components/Collections';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { useContext }  from 'react';
import AuthContext from './store/authContext';
import { useSelector } from 'react-redux'
import LoadingModal from './components/modals/LoadingModal';
import { selectLoading } from './store/slices/loadingSlice';
import { selectAddRealm } from './store/slices/addRealmSlice';
import AddRealmModal from './components/modals/AddRealmModal'

function App() {
  const authCtx = useContext(AuthContext);
  let isLoading = useSelector(selectLoading)
  let isAddingRealm = useSelector(selectAddRealm)
  return (
    <div className="App">
      {isAddingRealm && <AddRealmModal />}
      {isLoading && <LoadingModal />}

    <Header />
      <Routes>
        <Route path='/' element={authCtx.token ? <Home/> : <Navigate to='/auth'/>} />
        <Route path='/collections' element={authCtx.token ? <Collections /> : <Navigate to='/auth' /> } />
        <Route path='/profile' element={authCtx.token ? <Profile /> : <Navigate to='/auth' /> } />     
        <Route path='/auth' element={!authCtx.token ? <Auth /> : <Navigate to='/'/>} />
        <Route path='*' element={<Navigate to='/' />} />

        
      </Routes>      
      <Footer />
    </div>
  );
}

export default App;
