// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import VideoBackground from './components/VideoBackground';
import logo from './assets/promo2000-logo.png';
// ✅ NUEVOS ICONOS: FaForward y FaBackward
import { FaFacebook, FaInstagram, FaWhatsapp, FaVolumeMute, FaVolumeUp, FaForward, FaBackward } from 'react-icons/fa';

const videoList = [
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756956370/ABRIR_ESTE_ARCHIVO_1_wjpmty.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756958807/promo3_cuumgp.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757107659/Chino_style_amdbde.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757284006/VID-20250907-WA0018_wtw9kk.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352857/ivanvaca_lh9czb.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352513/felixgutierrez_hmpzdd.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352482/mikichonavajas_pwnhz4.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757368393/juanpabloveizaga_ocei8d.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757377883/salmatorrez_ay32j9.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757384933/marianazamora_rfxxam.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456586/mariareneblacud_c2ysne.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456687/paulpelaez_koz2eb.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456703/andrespacheco_awctsn.mp4',
    'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456704/carlozgomez_hzi9wj.mp4',
];

function App() {
  const [currentVideo, setCurrentVideo] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  // ✅ NUEVO ESTADO: Para mantener un historial de videos vistos
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // ✅ MODIFICACIÓN: selectNextVideo ahora puede ir hacia adelante o elegir aleatorio
  const selectNextVideo = useCallback(() => {
    if (videoList.length === 0) {
      setCurrentVideo('');
      setHistory([]);
      setHistoryIndex(-1);
      return;
    }

    let nextVideo;
    if (historyIndex < history.length - 1) {
      // Si hay videos en el historial hacia adelante, los usamos
      nextVideo = history[historyIndex + 1];
    } else {
      // Si no, elegimos un nuevo video aleatorio que no sea el actual
      do {
        const randomIndex = Math.floor(Math.random() * videoList.length);
        nextVideo = videoList[randomIndex];
      } while (nextVideo === currentVideo && videoList.length > 1);
    }

    setCurrentVideo(nextVideo);
    // ✅ Actualizamos el historial
    setHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, historyIndex + 1); // Cortamos si retrocedimos
        return [...newHistory, nextVideo];
    });
    setHistoryIndex(prevIndex => prevIndex + 1);

  }, [currentVideo, history, historyIndex]);


  // ✅ NUEVA FUNCIÓN: Para ir al video anterior
  const selectPreviousVideo = useCallback(() => {
    if (historyIndex > 0) {
      const prevVideo = history[historyIndex - 1];
      setCurrentVideo(prevVideo);
      setHistoryIndex(prevIndex => prevIndex - 1);
    }
  }, [history, historyIndex]);


  // Al cargar la página por primera vez, seleccionamos el video inicial.
  useEffect(() => {
    if (videoList.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoList.length);
      const initialVideo = videoList[randomIndex];
      setCurrentVideo(initialVideo);
      setHistory([initialVideo]);
      setHistoryIndex(0);
    }
  }, []); // Se ejecuta solo una vez al inicio.

  const handleSoundToggle = () => {
    setIsMuted(prevState => !prevState);
  };

  return (
    <>
      <div className="video-overlay"></div>
      <VideoBackground 
        videoUrl={currentVideo} 
        isMuted={isMuted}
        onVideoEnd={selectNextVideo} // onVideoEnd siempre avanza
      />

      <div className="layout-container">
        <div className="section section-top-right">
          <img src={logo} alt="Logo Promoción 2000" className="logo-promo" />
        </div>

        <div className="section section-top-left-social">
          <div className="social-icons">
            <a href="https://www.facebook.com/Colegio.Hno.Felipe.Palazon" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com/colegiofelipepalazon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/+59167806989?text=me%20gusta%20tu%20proyecto" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="bottom-content-wrapper">
          <div className="section section-bottom-left">
            {/* ✅ NUEVO WRAPPER para los botones de control */}
            <div className="video-controls">
                <button
                    className="control-button"
                    onClick={selectPreviousVideo}
                    disabled={historyIndex <= 0} // Deshabilitar si no hay historial previo
                    aria-label="Video anterior"
                >
                    <FaBackward />
                </button>
                <div className="sound-toggle-button" onClick={handleSoundToggle} aria-label="Alternar sonido">
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </div>
                <button
                    className="control-button"
                    onClick={selectNextVideo}
                    aria-label="Siguiente video"
                >
                    <FaForward />
                </button>
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