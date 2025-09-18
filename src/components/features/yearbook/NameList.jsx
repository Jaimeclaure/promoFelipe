import React from 'react';

const NameList = ({ videos, onSelect, activeVideoUrl }) => {
  return (
    <div className="name-list-container">
      <h2>Hno. Felipe Palazón</h2>
      <ul>
        {videos.map((video) => (
          <li 
            key={video.id} 
            className={video.url === activeVideoUrl ? 'active' : ''}
            onClick={() => onSelect(video)}
          >
            {video.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;