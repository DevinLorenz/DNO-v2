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

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
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
