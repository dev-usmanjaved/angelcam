import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ src, controls }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!src || typeof src !== 'string') {
      console.error('Invalid video source:', src);
      return;
    }

    const hls = new Hls();

    if (Hls.isSupported()) {
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isPlaying) {
          video.play().catch(err => {
            console.error('Error trying to play video:', err);
          });
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      if (isPlaying) {
        video.play().catch(err => {
          console.error('Error trying to play video:', err);
        });
      }
    }

    return () => {
      hls.destroy();
    };
  }, [src, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (controls?.play) {
      fetch(controls.play);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (controls?.pause) {
      fetch(controls.pause);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: 'auto' }}
      />
      <div>
        <button className='btn btn-primay' onClick={handlePlay}>Play</button>
        <button className='btn btn-primay' onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
