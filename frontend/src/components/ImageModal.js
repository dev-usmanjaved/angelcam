import React from 'react';

const ImageModal = ({ showModal, camera, handleCloseModal }) => {
  return (
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? 'block' : 'none' }}
      onClick={handleCloseModal}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{camera.name} Live Stream</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <iframe
              src={camera.streams[1]?.url || camera.streams[0]?.url}
              className="embed-responsive-item w-100"
              title={`${camera.name} Stream`}
              style={{ height: '60vh', border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
