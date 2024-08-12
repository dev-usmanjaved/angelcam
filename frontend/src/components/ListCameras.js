import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ImageModal from "./ImageModal";

const ListCameras = () => {
  const navigate = useNavigate();

  const [cameras, setCameras] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCameras();
  }, []);

  const getCameras = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/cameras/', {
        headers: {
          Authorization: token,
        },
      });

      setCameras(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handelImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleRecordingsClick = (cameraId) => {
    navigate(`/camera/${cameraId}/recordings`);
  };

  const renderCameras = () => {
    return cameras.map((camera) => (
      <div key={camera.id} className="card mb-4">
        <div className="card-header text-center">
          <h3 className="card-title">{camera.name}</h3>
        </div>
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div><strong>Type:</strong> {camera.type}</div>
            <div><strong>Status:</strong> {camera.status}</div>
          </div>
          <div className="mb-3">
            {camera.snapshot ? (
              <img
                src={camera.snapshot.url}
                className="img-fluid"
                alt={`${camera.name} Snapshot`}
                style={{ maxHeight: '500px', width: '100%' }}
                onClick={camera?.streams.length > 0 ? handelImageClick : handleCloseModal}
              />
            ) : (
              <div className="alert alert-warning">No snapshot available</div>
            )}
          </div>
          <ImageModal showModal={showModal} camera={camera} handleCloseModal={handleCloseModal} />
          <button className="btn btn-primary" onClick={() => handleRecordingsClick(camera.id)}>Recordings</button>
        </div>
      </div>
    ));
  };
  return (
    <div>{renderCameras()}</div>
  );
};

export default ListCameras;
