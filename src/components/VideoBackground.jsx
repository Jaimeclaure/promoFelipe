// src/components/VideoBackground.jsx
import React, { useState, useRef, useEffect } from 'react';
import VideoLoader from './layout/VideoLoader';

// ✅ PASO 1: El componente ahora recibe la nueva prop 'onVideoEnd'
const VideoBackground = ({ videoUrl, isMuted, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode) return;
    
    // Reiniciamos el estado de carga y progreso cada vez que cambia el video
    setIsLoading(true);
    setProgress(0);

    const handleProgress = () => {
      if (videoNode.duration > 0) {
        const bufferedEnd = videoNode.buffered.length > 0 ? videoNode.buffered.end(0) : 0;
        const percent = (bufferedEnd / videoNode.duration) * 100;
        setProgress(percent);
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    videoNode.addEventListener('progress', handleProgress);
    videoNode.addEventListener('canplay', handleCanPlay);

    return () => {
      videoNode.removeEventListener('progress', handleProgress);
      videoNode.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!videoUrl) {
    return null;
  }

  return (
    <>
      {isLoading && <VideoLoader progress={progress} />}
      <div className="video-background-container">
        <video
          ref={videoRef}
          key={videoUrl}
          autoPlay
          // ✅ PASO 2: Eliminamos el atributo 'loop'
          // loop 
          muted
          playsInline
          // ✅ PASO 3: Añadimos el evento onEnded, que ejecuta la función del padre
          onEnded={onVideoEnd}
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      </div>
    </>
  );
};

export default VideoBackground;