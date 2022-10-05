import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
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
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // console.log(userInfo);
    if(userInfo) navigate("/home")
    if(!userInfo) navigate("/")
  }, []);
  
  return (
    
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
  );
} 

export default App;
export {myContext};