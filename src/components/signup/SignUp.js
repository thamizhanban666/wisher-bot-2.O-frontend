import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import './signup.css'
import { myContext } from '../../App';
import toast from 'react-hot-toast';

function SignUp() {
  const { setUser } = useContext(myContext);
  let navigate = useNavigate()
  const formik = useFormik({
         initialValues: {
            name: "", 
            email: "",
            password: "",
         },
         validate: (values) => {
            const errors = {};

            if (!values.name) {
                  errors.name="Name cannot be blank"
            }
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
                `${process.env.REACT_APP_SERVER}/api/user/signup`,
                {
                  name : values.name,
                  email : values.email,
                  password : values.password,
                },
                config
              );
              // console.log(data);
              toast.success(data.message);

              localStorage.setItem("userInfo", JSON.stringify(data));
              setUser(JSON.parse(localStorage.getItem("userInfo")));
              // navigate("/home");

            } catch (error) {
              toast.error(error.response.data.message);
            }   
         }
   })
  return (
    <div id='sign-body'>
      <section id='sign-section' className="text-center mx-auto ">
        <h2 className='text-secondary '>SIGN UP</h2>
        <div>
          <form onSubmit={formik.handleSubmit}>
          <div className='d-flex'>
            <label className='justify-self-start fw-bold'>Name</label>
          </div >
          <input id='signup-display-name' className='sign-inp' name="name" onChange={formik.handleChange} value={formik.values.name}></input>
          <div className='d-flex mt-4'>
            <label className='justify-self-start fw-bold'>Email</label>
          </div >
          <input id='signup-email' className='sign-inp' name="email" onChange={formik.handleChange} value={formik.values.email}></input>
          <div className='d-flex mt-4'>
            <label className='justify-self-start fw-bold'>Password</label>
          </div >
          <input id='signup-password' className='sign-inp' name="password" onChange={formik.handleChange} value={formik.values.password}></input>
          <button type='submit' className={`signup-btn mt-4 ${Object.keys(formik.errors).length>0? "bg-secondary" : "bg-primary"}`} disabled={Object.keys(formik.errors).length>0? true:false}>Sign up</button>
          
          </form>
        </div>
        <p className='font-xl mt-4'>Already have an account? <b> <Link to='/login' className=' text-primary text-decoration-none'>Login</Link></b></p>
        
        </section>
      </div>
  )
}

export default SignUp