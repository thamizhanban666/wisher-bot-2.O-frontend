import React, { useContext, useEffect, useState } from 'react';
import "./home.css";
import { Link, } from "react-router-dom";
import axios from 'axios';
import Header from '../header/Header';
import { myContext } from '../../App';
import CardSlider from '../cardSlider/CardSlider';
import toast from 'react-hot-toast';
import ViewImage from '../viewImage/ViewImage';
import Schedule from '../schedule/Schedule';

function Home() {
  const { user, setUser } = useContext(myContext);
  const [imgUrl, setImgUrl] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(undefined);

  // console.log(user)
  const changeImage = (pics) => {
    if (pics === undefined) {
      toast.error("Please select image")
      return;
    }
    // console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "wisher-bot");
      data.append("cloud_name", "dbhscgfm7");
      fetch("https://api.cloudinary.com/v1_1/dbhscgfm7/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImgUrl(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Select an Image");
    }
  };

  const addImage = async (e) => {
    if(!imgUrl) toast.error("choose an image")
    try {
      const bodyJSON = {
        userId: user._id,
        url: imgUrl
      }
      const config = {
        headers: {
          Authorization: user.token,
        }
      }
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/image`, bodyJSON, config)
      // console.log(data);
      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
    setImgUrl("")
  }

  const onClickImg = (img) => {
    setSelectedImg(img);
  }

  useEffect(() => {
    if (user.token) {      
      async function getImages() {
        const config = {
          headers: {
            Authorization: user.token,
          }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/image`, config);
        setImages(data.reverse())
      }
      getImages();
    }
  }, [imgUrl]);

    return (
      <div>
        <Header />
        <CardSlider images={images} onClickImg={onClickImg} />
        <div className='d-flex align-items-center flex-wrap mt-3'>
          <div className='mx-3 fw-bold'>Upload your wish card</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => changeImage(e.target.files[0])}
            className="my-2"
          />
          <button className='btn btn-primary ms-2' onClick={addImage} disabled={!imgUrl} >Add</button>
        </div>
        <ViewImage selectedImg={selectedImg} />
        <Schedule selectedImg={selectedImg} />
      </div>
    );
}

export default Home;