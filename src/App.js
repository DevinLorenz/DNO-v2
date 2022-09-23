import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Collections from './components/Collections';
import Auth from './components/Auth';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/profile' element={<Profile />} />     
        <Route path='/login' element={<Auth />} />
        <Route path='*' element={<Navigate to='/' />} />

        
      </Routes>      
      <Footer />
    </div>
  );
}

export default App;
