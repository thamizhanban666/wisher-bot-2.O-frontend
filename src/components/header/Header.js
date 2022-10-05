import React from 'react'
import { useNavigate } from 'react-router-dom';

function Header() { 
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand font-xl fw-bolder font-lg text-center mx-auto text-light">Wisher-Bot</div>
          <div><button className='btn btn-sm btn-outline-danger' onClick={handleLogout}>Logout</button></div>
        </div>
      </nav>
    </>
  )
}

export default Header