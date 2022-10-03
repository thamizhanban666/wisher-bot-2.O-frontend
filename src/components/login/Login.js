import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import './login.css'
import { myContext } from '../../App';
import toast from 'react-hot-toast';

function Login() {
  const { user, setUser } = useContext(myContext);
  let navigate = useNavigate();
  const formik = useFormik({
         initialValues: {
            email: "",
            password: "",
         },
         validate: (values) => {
            const errors = {};
            if (!values.email) {
                  errors.email="Email cannot be blank"
            }
            if (!values.password) {
                  errors.password="Password cannot be blank"
            }            
            return errors;
         },
         onSubmit: async (values) => {         
            
            try {
              const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };

              const { data } = await axios.post(
                `${process.env.REACT_APP_SERVER}/api/user/login`,
                { email : values.email, password : values.password },
                config
              );

              // console.log(JSON.stringify(data));
              toast.success("Successfully logged in");

              localStorage.setItem("userInfo", JSON.stringify(data));
              setUser(JSON.parse(localStorage.getItem("userInfo")))
              navigate("/home");

            } catch (error) {
              // console.log(error)
              toast.error(error.response.data.message);
            }     
         }
   })
  return (
    <div id='log-body'>
      <section id='log-section' className="text-center mx-auto ">
        <h2 className='text-secondary'>LOGIN</h2>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex'>
              <label className='justify-self-start fw-bold'>Email</label>
            </div >
            <input id='email' className='log-inp' name="email" onChange={formik.handleChange} value={formik.values.email}></input>
            <div className='d-flex justify-content-between align-items-baseline mt-4'>
              <label className='fw-bold'>Password</label>
            </div>
            <input id='password' className='log-inp' name="password" onChange={formik.handleChange} value={formik.values.password}></input>
            <button type='submit' className={`login-btn mt-4 ${Object.keys(formik.errors).length>0? "bg-secondary" : "bg-primary"}`} disabled={Object.keys(formik.errors).length>0? true:false}>Log in</button>
          </form>
        </div>
        <p className='font-md mt-4'>Don't have an account? <b> <Link to='/signup' className='text-primary text-decoration-none'>Signup</Link></b></p>
      </section>
    </div>
  )
}

export default Login