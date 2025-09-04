// src/App.jsx

import React, { useState, useEffect } from 'react';
import VideoBackground from './components/VideoBackground';
import logo from './assets/promo2000-logo.png';
// ✅ CORRECCIÓN 1: Importar los íconos de volumen que faltaban
import { FaFacebook, FaInstagram, FaWhatsapp, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const videoList = [
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934615/zack_snyder_continuidad_chvhdq.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934611/perrita_lleva_a_su_cachorro_phvsqz.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934611/gato_cam1_kaweyb.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934610/video_2024-09-01_00-53-37_jtycbz.mp4',
];

function App() {
  const [currentVideo, setCurrentVideo] = useState('');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    setCurrentVideo(videoList[randomIndex]);
  }, []);

  const handleSoundToggle = () => {
    setIsMuted(prevState => !prevState);
  };

  return (
    <>
      <div className="video-overlay"></div>
      {/* Se añade un espacio entre las props para mayor claridad */}
      <VideoBackground videoUrl={currentVideo} isMuted={isMuted} />

      <div className="layout-container">
        <div className="section section-top-right">
          <img src={logo} alt="Logo Promoción 2000" className="logo-promo" />
        </div>

        <div className="section section-bottom-left">
          <h1 className="main-title">Promo 2000</h1>
          <p className="sub-title-small">Colegio Hno. Felipe Palazón</p>
          <p className="description-left-justified">
            Recordando los mejores momentos. Un reencuentro para celebrar más de dos décadas de amistad e historias inolvidables.
          </p>
        </div>

        <div className="section section-bottom-right">
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            {/* ✅ CORRECCIÓN 3: Corregido el enlace de WhatsApp */}
            <a href="https://wa.me/+59167806989" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* ✅ CORRECCIÓN 2: Se mueve el botón fuera del layout-container para un posicionamiento absoluto más fiable */}
      <div className="sound-toggle-button" onClick={handleSoundToggle}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        <span>{isMuted ? 'Activar Sonido' : 'Silenciar'}</span>
      </div>
    </>
  );
}

export default App;