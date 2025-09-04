import React, { useRef, useEffect } from 'react';

import posterImage from '../assets/cargando.png'; 
// Recibe la URL del video como una propiedad (prop)
const VideoBackground = ({ videoUrl, isMuted }) => {
  const videoRef = useRef(null);


// 3. Este efecto se ejecuta cada vez que el estado 'isMuted' cambia
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!videoUrl) {
    return null;
  }

  return (
    <div className="video-background-container">
    <video
        // 4. Asignamos la referencia al elemento
        ref={videoRef}
        key={videoUrl}
        autoPlay
        loop
        // El video siempre inicia silenciado por defecto para que funcione el autoplay
        muted 
        playsInline
        poster={posterImage}
      >
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
    </div>
  );
};

export default VideoBackground;