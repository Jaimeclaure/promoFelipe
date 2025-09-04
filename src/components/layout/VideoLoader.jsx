// src/components/layout/VideoLoader.jsx
import React from 'react';

const VideoLoader = ({ progress }) => {
  return (
    <div className="video-loader-overlay">
      <div className="loader-content">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">Cargando Video... {Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default VideoLoader;