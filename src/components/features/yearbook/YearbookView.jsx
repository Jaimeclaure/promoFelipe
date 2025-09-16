import React from 'react';
import NameList from './NameList';
import VideoWall3D from './VideoWall3D';
import { FaTimes } from 'react-icons/fa';

const YearbookView = ({ videos, onSelect, onClose, activeVideoUrl }) => {
  return (
    <div className="yearbook-view-overlay">
      <NameList videos={videos} onSelect={onSelect} activeVideoUrl={activeVideoUrl} />
      <VideoWall3D videos={videos} onSelect={onSelect} activeVideoUrl={activeVideoUrl} />
      <button className="yearbook-close-button" onClick={onClose}><FaTimes /></button>
    </div>
  );
};

export default YearbookView;