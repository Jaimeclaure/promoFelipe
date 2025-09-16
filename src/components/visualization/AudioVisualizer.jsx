import React, { useRef, useEffect } from 'react';

const AudioVisualizer = ({ videoRef }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const mediaElement = videoRef.current;
    if (!mediaElement) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
    }
    
    const audioContext = audioContextRef.current;
    const analyser = analyserRef.current;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    
    try {
      sourceRef.current = audioContext.createMediaElementSource(mediaElement);
      sourceRef.current.connect(analyser);
      analyser.connect(audioContext.destination);
    } catch {
      // Evita errores si la fuente ya está conectada
      return;
    }
    
    analyser.fftSize = 128;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const renderFrame = () => {
      animationFrameId = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2.5;
        ctx.fillStyle = `rgba(22, 164, 107, ${barHeight / 200})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    
    renderFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
    };
    // ✅ CORRECCIÓN: Se elimina 'mediaElement' de las dependencias.
  }, [videoRef]); 

  return <canvas ref={canvasRef} className="audio-visualizer-canvas" />;
};

export default AudioVisualizer;