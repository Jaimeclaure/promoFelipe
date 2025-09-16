import React, { useState, useEffect, useCallback } from 'react';
import MainVideoPlayer from './components/layout/MainVideoPlayer';
import YearbookView from './components/features/yearbook/YearbookView';
import ProfileCard from './components/features/yearbook/ProfileCard';
// ✅ CORRECCIÓN: Se cambia la ruta de './components-ui/...' a './components/ui/...'
import ControlButton from './components/ui/ControlButton'; 
import logo from './assets/images/promo2000-logo.png';
import { FaBookOpen, FaVolumeMute, FaVolumeUp, FaForward, FaBackward, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const videoList = [
    { id: 1, name: "LOS AÑOS 90s", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756956370/ABRIR_ESTE_ARCHIVO_1_wjpmty.mp4', quote: "Donde todo comenzó." },
    { id: 2, name: "RECREOS", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756958807/promo3_cuumgp.mp4', quote: "Nuestros mejores momentos." },
    { id: 3, name: "Maria Rene Blacud", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456586/mariareneblacud_c2ysne.mp4', quote: "" },
    { id: 4, name: "Lisseth Bustamante", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757373026/lissethbustamante_ytcmqk.mp4', quote: "" },
    { id: 5, name: "Marianela Castillo", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757609111/marianelacastillo_tjrfks.mp4', quote: "" },
    { id: 6, name: "Carlos Gomez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456704/carlozgomez_hzi9wj.mp4', quote: "" },    
    { id: 7, name: "Felix Gutierrez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352513/felixgutierrez_hmpzdd.mp4', quote: "" },
    { id: 8, name: "Adriana Narvaez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757977534/adriananarvaez_qhnrg8.mp4', quote: "" },
    { id: 9, name: "Miguel Navajas", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352482/mikichonavajas_pwnhz4.mp4', quote: "" },
    { id: 10, name: "Paul Pelaez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456687/paulpelaez_koz2eb.mp4', quote: "" },
    { id: 11, name: "Andres Pacheco", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456703/andrespacheco_awctsn.mp4', quote: "" },
    { id: 12, name: "Salma Torrez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757377883/salmatorrez_ay32j9.mp4', quote: "" },
    { id: 13, name: "Ivan Vaca", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352857/ivanvaca_lh9czb.mp4', quote: "" },
    { id: 14, name: "Nadia Vasquez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1758000910/nadiavasquez_bopy70.mp4', quote: "" },
    { id: 15, name: "Juan Pablo Veizaga", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757368393/juanpabloveizaga_ocei8d.mp4', quote: "" },
    { id: 16, name: "Mariana Zamora", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757384933/marianazamora_rfxxam.mp4', quote: "" },
];

function App() {
  const [mainVideo, setMainVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [isMainVideoPlaying, setIsMainVideoPlaying] = useState(true);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectNextVideo = useCallback(() => {
    if (videoList.length <= 1) return;
    let nextVideo;
    do {
      const randomIndex = Math.floor(Math.random() * videoList.length);
      nextVideo = videoList[randomIndex];
    } while (nextVideo.url === mainVideo);
    setMainVideo(nextVideo.url);
  }, [mainVideo]);

  const handleNavigation = (direction) => {
    const currentIndex = videoList.findIndex(v => v.url === mainVideo);
    if (currentIndex === -1) return;
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % videoList.length;
    } else {
      nextIndex = (currentIndex - 1 + videoList.length) % videoList.length;
    }
    setMainVideo(videoList[nextIndex].url);
  };

  useEffect(() => {
    if (videoList.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoList.length);
      setMainVideo(videoList[randomIndex].url);
      setIsMainVideoPlaying(true);
    }
  }, []);

  const handleExpandToMain = (videoUrl) => {
    setMainVideo(videoUrl);
    setActiveProfile(null);
    setIsGalleryOpen(false);
    setIsMainVideoPlaying(true);
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
    setIsMainVideoPlaying(false);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setIsMainVideoPlaying(true);
  };
  
  const openProfile = (video) => {
      setActiveProfile(video);
  };

  const closeProfile = () => {
      setActiveProfile(null);
  };

  return (
    <>
      <MainVideoPlayer 
        videoUrl={mainVideo} 
        isMuted={isMuted}
        onVideoEnd={selectNextVideo}
        isPlaying={isMainVideoPlaying}
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

        <div className="bottom-ui-container">
            <div className="quote-container" style={{ textAlign: 'center' }}>
            <p>HNO. FELIPE PALAZON - PROMO 2000 <br />Celebrando 25 años de amistad y momentos inolvidables.</p> 
          </div>
          <div className="main-controls">
            <ControlButton onClick={() => handleNavigation('prev')} ariaLabel="Video anterior"><FaBackward /></ControlButton>
            <ControlButton onClick={() => setIsMuted(prev => !prev)} ariaLabel="Sonido">{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</ControlButton>
            <ControlButton onClick={() => handleNavigation('next')} ariaLabel="Siguiente video"><FaForward /></ControlButton>
            <ControlButton onClick={openGallery} ariaLabel="Abrir anuario"><FaBookOpen /></ControlButton>
          </div>
        </div>
      </div>
      
      {isGalleryOpen && (
        <YearbookView 
          videos={videoList}
          onSelect={openProfile}
          onClose={closeGallery}
          activeVideoUrl={activeProfile?.url}
        />
      )}

      <ProfileCard 
        video={activeProfile}
        onClose={closeProfile}
        onExpand={handleExpandToMain}
      />
    </>
  );
}

export default App;