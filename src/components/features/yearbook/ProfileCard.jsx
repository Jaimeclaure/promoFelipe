import React from 'react';
import { FaTimes, FaExpand } from 'react-icons/fa';

const ProfileCard = ({ video, onClose, onExpand }) => {
  if (!video) return null;

  return (
    <div className="profile-card-overlay">
      <div className="profile-card">
        <video src={video.url} autoPlay controls playsInline />
        <div className="profile-info">
          <h3>{video.name}</h3>
          
        </div>
        <button className="profile-action close" onClick={onClose}><FaTimes /></button>
        <button className="profile-action expand" onClick={() => onExpand(video.url)}><FaExpand /></button>
      </div>
    </div>
  );
};

export default ProfileCard;