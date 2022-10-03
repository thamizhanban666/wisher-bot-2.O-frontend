import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'
import verifiedImg from '../assets/verified.svg'

function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER}/api/user/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);
        console.log(data)
        setValidUrl(true)
      } catch (error) {
        console.log(error);
        // toast.error(error.response.data.message);
        // setValidUrl(false)
      }
    }
    verifyEmailUrl();
  },[])  
  return (
    <div>
      {
        validUrl ? (
          <div className='container vw-100 vh-100 d-flex flex-column align-items-center justify-content-center '>
            <img src={verifiedImg} alt={"success"} />
            <h1>Email verified successfully</h1>
            <Link to='/login'>
              <button className='btn btn-lg btn-outline-success my-3 border border-3 border-success fw-bold'>Login</button>
            </Link>
          </div>
          ): (
          <div className='container vw-100 vh-100 d-flex align-items-center justify-content-center'>
            <h1>404 Not Found</h1>
          </div>
        )
      }
    </div>
  )
}

export default EmailVerify;