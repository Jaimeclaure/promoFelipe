import React from 'react';

// Recibe la URL del video como una propiedad (prop)
const VideoBackground = ({ videoUrl }) => {
  if (!videoUrl) {
    return null; // No renderizar nada si no hay URL
  }

  return (
    <div className="video-background-container">
      {/* La prop 'key' es un truco para que React re-monte el componente
          cuando la URL cambia, forzando la carga del nuevo video. */}
      <video key={videoUrl} autoPlay loop playsInline>
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
    </div>
  );
};

export default VideoBackground;