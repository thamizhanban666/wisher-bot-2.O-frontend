import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Home from './components/home/Home';
import React, {  useEffect, useState } from 'react';
import HotToaster from './components/Toaster';
import EmailVerify from './components/EmailVerify';

const myContext = React.createContext();
const MyProvider = myContext.Provider;

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <MyProvider value={{user, setUser}}>
        <div>
          <HotToaster/>
          <Routes >
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/user/:id/verify/:token' element={<EmailVerify/>} />
          </Routes>
        </div>
      </MyProvider>
    </BrowserRouter>   
  );
} 

export default App;
export {myContext};