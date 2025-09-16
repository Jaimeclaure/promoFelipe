import React, { useRef } from 'react'; // Ya no necesitamos useState
import placeholder from '../../assets/images/video-thumbnail-placeholder.jpg';

const VideoThumbnail = ({ video, onSelect, isActive }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <div 
      className={`video-thumbnail ${isActive ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(video)}
    >
      <video
        // ✅ CORRECCIÓN CRÍTICA: Cambiado 'ief' a 'ref'
        ref={videoRef}
        src={video.url}
        poster={video.thumbnail || placeholder}
        muted
        loop
        playsInline
      />
      <div className="thumbnail-overlay">
        <p>{video.name}</p>
      </div>
    </div>
  );
};

export default VideoThumbnail;