import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Context, { myContext } from './pages/Context';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

function App() {
    const ctx = useContext(myContext)
    return (
        <BrowserRouter>
                <NavBar />
                <Routes>
                  <Route path='/' element={<HomePage />}></Route>
                    { ctx ? (
                      <>
                        <Route path='/profile' element={<Profile />}></Route>
                      </>
                    ) : (
                      <>
                      <Route path='/login' element={<Login />}></Route>
                      <Route path='/register' element={<Register />}></Route>
                      <Route path='/reset/:token' element={<ResetPassword />}></Route>
                      <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
                      </>
                    )}
                    
                   
                </Routes>
              
        </BrowserRouter>
    );
}

export default App;
