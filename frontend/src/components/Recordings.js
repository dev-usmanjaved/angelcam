import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import VideoPlayer from './VideoPlayer';

const Recordings = () => {
  const [recordings, setRecordings] = useState({});
  const { cameraId } = useParams();

  useEffect(() => {
    getRecordings(cameraId);
  }, []);

  const getRecordings = async (cameraId) => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/cameras/${cameraId}/recordings/`, {
        headers: {
          Authorization: token,
        },
      });

      setRecordings(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <VideoPlayer src={recordings?.url} />
    </>
  );
};

export default Recordings;
