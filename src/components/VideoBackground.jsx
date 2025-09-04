// src/components/VideoBackground.jsx
import React, { useState, useRef, useEffect } from 'react';
import VideoLoader from './layout/VideoLoader'; // Importamos el nuevo loader

const VideoBackground = ({ videoUrl, isMuted }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Nos aseguramos de que la referencia al video exista
    const videoNode = videoRef.current;
    if (!videoNode) return;

    const handleProgress = () => {
      if (videoNode.duration > 0) {
        // Calculamos el porcentaje del video que se ha bufferizado
        const bufferedEnd = videoNode.buffered.length > 0 ? videoNode.buffered.end(0) : 0;
        const percent = (bufferedEnd / videoNode.duration) * 100;
        setProgress(percent);
      }
    };

    const handleCanPlay = () => {
      // Cuando el video puede empezar a reproducirse, esperamos a que el progreso sea 100
      // o simplemente lo ocultamos para una experiencia más rápida.
      // Para un efecto más suave, ocultaremos el loader cuando pueda empezar.
      setIsLoading(false);
    };

    // Añadimos los event listeners
    videoNode.addEventListener('progress', handleProgress);
    videoNode.addEventListener('canplay', handleCanPlay);

    // Limpiamos los listeners cuando el componente se desmonte
    return () => {
      videoNode.removeEventListener('progress', handleProgress);
      videoNode.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoUrl]); // Volvemos a ejecutar si la URL del video cambia

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
      {/* Mostramos el loader si isLoading es true */}
      {isLoading && <VideoLoader progress={progress} />}
      <div className="video-background-container">
        <video
          ref={videoRef}
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      </div>
    </>
  );
};

export default VideoBackground;