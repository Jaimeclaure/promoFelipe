import React from 'react';
import VideoThumbnail from '../../ui/VideoThumbnail';

const VideoWall3D = ({ videos, onSelect, activeVideoUrl }) => {
  return (
    <div className="video-wall-container">
      <div className="video-wall-3d">
        {videos.map((video) => (
          <VideoThumbnail 
            key={video.id}
            video={video}
            onSelect={onSelect}
            isActive={video.url === activeVideoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoWall3D;