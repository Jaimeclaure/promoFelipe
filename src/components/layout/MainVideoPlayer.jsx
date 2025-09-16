import React, { useRef, useEffect, useState } from 'react';
import VideoLoader from './VideoLoader';
import AudioVisualizer from '../visualization/AudioVisualizer';

const MainVideoPlayer = ({ videoUrl, isMuted, onVideoEnd, isPlaying }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode || !videoUrl) return;

    setIsLoading(true);
    setProgress(0);
    
    const handleProgress = () => {
      if (videoNode.duration > 0) {
        const bufferedEnd = videoNode.buffered.length > 0 ? videoNode.buffered.end(0) : 0;
        const percent = (bufferedEnd / videoNode.duration) * 100;
        setProgress(percent);
      }
    };
    const handleCanPlay = () => setIsLoading(false);
    
    videoNode.addEventListener('progress', handleProgress);
    videoNode.addEventListener('canplay', handleCanPlay);
    videoNode.load();

    return () => {
      videoNode.removeEventListener('progress', handleProgress);
      videoNode.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoUrl]);
  
  // Este useEffect se mantiene para controlar el sonido
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Este useEffect se mantiene para pausar/reanudar
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        // Le pedimos al video que intente reproducirse
        videoRef.current.play().catch(error => {
          // A veces los navegadores bloquean la reproducción, esto evita un error en la consola
          console.log("El navegador impidió la reproducción automática:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, videoUrl]); // Añadimos videoUrl para que se ejecute al cambiar de video

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
          // ✅ CORRECCIÓN: Se restaura el atributo autoPlay
          autoPlay 
          muted={isMuted}
          playsInline
          onEnded={onVideoEnd}
          crossOrigin="anonymous"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {!isMuted && <AudioVisualizer videoRef={videoRef} />}
      </div>
    </>
  );
};

export default MainVideoPlayer;