// src/App.jsx

import React, { useState, useEffect } from 'react';
import VideoBackground from './components/VideoBackground';
import logo from './assets/promo2000-logo.png';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const videoList = [
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934615/zack_snyder_continuidad_chvhdq.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934611/perrita_lleva_a_su_cachorro_phvsqz.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934611/gato_cam1_kaweyb.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756934610/video_2024-09-01_00-53-37_jtycbz.mp4',
];

function App() {
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    setCurrentVideo(videoList[randomIndex]);
  }, []);

  return (
    <>
    <div className="video-overlay"></div>
      <VideoBackground videoUrl={currentVideo} />

      {/* Contenedor principal que abarca toda la pantalla y usará Grid para posicionar */}
      <div className="layout-container">

        {/* Logo en la esquina superior derecha */}
        <div className="section section-top-right">
          <img src={logo} alt="Logo Promoción 2000" className="logo-promo" />
        </div>

        {/* Contenido principal (títulos y descripción) en la esquina inferior izquierda */}
        <div className="section section-bottom-left">
          <h1 className="main-title">Promo 2000</h1> {/* Este será el más grande */}
          <p className="sub-title-small">Colegio Hno. Felipe Palazón</p> {/* Este será más pequeño */}
          <p className="description-left-justified">
            Recordando los mejores momentos. Un reencuentro para celebrar más de dos décadas de amistad e historias inolvidables.
          </p>
        </div>

        {/* Íconos de redes sociales en la esquina inferior derecha */}
        <div className="section section-bottom-right">
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="https://www.whatsapp.com"><FaWhatsapp /></a>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;