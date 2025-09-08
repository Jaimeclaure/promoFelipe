// src/App.jsx

import React, { useState, useEffect } from 'react';
import VideoBackground from './components/VideoBackground';
import logo from './assets/promo2000-logo.png';
import { FaFacebook, FaInstagram, FaWhatsapp, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const videoList = [
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756956370/ABRIR_ESTE_ARCHIVO_1_wjpmty.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756958792/promo2_l60cn2.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756958807/promo3_cuumgp.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756958783/promo4_rqnriw.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757107659/Chino_style_amdbde.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757284006/VID-20250907-WA0018_wtw9kk.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352857/ivanvaca_lh9czb.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352513/felixgutierrez_hmpzdd.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352482/mikichonavajas_pwnhz4.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757368393/juanpabloveizaga_ocei8d.mp4',


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
      <VideoBackground videoUrl={currentVideo} isMuted={isMuted} />

      <div className="layout-container">
        {/* --- CONTENIDO SUPERIOR --- */}
        <div className="section section-top-right">
          <img src={logo} alt="Logo Promoción 2000" className="logo-promo" />
        </div>

        {/* ✅ CORRECCIÓN 1: Usamos la clase correcta y la estructura correcta para los iconos */}
        <div className="section section-top-left-social">
          <div className="social-icons">
            <a href="https://www.facebook.com/Colegio.Hno.Felipe.Palazon" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com/colegiofelipepalazon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/+59167806989?text=me%20gusta%20tu%20proyecto" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        {/* --- CONTENIDO INFERIOR --- */}
        <div className="bottom-content-wrapper">
          <div className="section section-bottom-left">
            <div className="sound-toggle-button" onClick={handleSoundToggle}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
            <div className="text-container">
              <h1 className="main-title">Promo 2000</h1>
              <p className="sub-title-small">Colegio Hno. Felipe Palazón</p>
              <p className="description-left-justified">
                Recordando los mejores momentos. Un reencuentro para celebrar más de dos décadas de amistad e historias inolvidables.
              </p>
            </div>
          </div>
        </div> 

      </div>
    </>
  );
}

export default App;