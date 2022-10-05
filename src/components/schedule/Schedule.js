import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { myContext } from '../../App';
import "./schedule.css"
function Schedule({ selectedImg }) {
  const { user } = useContext(myContext);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = async () => {
    if(!date) return toast.error("Select the date")
    if(!time) return toast.error("Select the time")
    if(!email) return toast.error("Enter the email")
    if(!name) return toast.error("Enter the name")
    if (!subject) return toast.error("Enter the subject")
    
    const diff = (new Date(date)) - (new Date()) + (time.slice(0, 2) * 60 * 60 * 1000) + (time.slice(3, 5) * 60 * 1000) - 19800000
    
    if (diff < 0) return toast.error("Select a future time");

    const arr = (new Date(date)).toDateString().toString().split(" ");

    const month = arr[1];
    const day = arr[2];
    const hour = time.slice(0, 2);
    const minute = time.slice(3, 5);
    
    console.log(month, day, hour, minute)

    try {
      const bodyJSON = {
        email,
        name,
        subject,
        message,
        imgUrl: selectedImg.url,
        minute,
        hour,
        day,
        month
      }
      const config = {
        headers: {
          Authorization: user.token,
        }
      }
      toast.success("Scheduled your wish");
      axios.post(`${process.env.REACT_APP_SERVER}/api/scheduleemail`, bodyJSON, config);

      setDate("")
      setTime("")
      setEmail("")
      setName("")
      setSubject("")
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalToggleLabel2">Schedule Email</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" id='schedule'>
            <form>
            <div className='row'>
              <div className='col-xs-12 col-sm-6'>
                <label>Date : </label>
                <input type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                <br />
                <label>To email : </label>
                <input type='email' placeholder="Receiver's  email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Name : </label>
                <input type='text' placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className='col-xs-12 col-sm-6'>
                <label>Time : </label>
                <input type='time' value={time} onChange={(e)=>setTime(e.target.value)}/>
                <br />
                <label>Subject : </label>
                <input type='text' placeholder='Subject of email' value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                <br />
                <label>Message : </label>
                <input id='schedule-text' type='text' placeholder='Message (optional)' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                </div>
              </div>
            </form>
            
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule;