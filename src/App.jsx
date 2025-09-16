import React, { useState, useEffect, useCallback } from 'react';
import MainVideoPlayer from './components/layout/MainVideoPlayer';
import YearbookView from './components/features/yearbook/YearbookView';
import ProfileCard from './components/features/yearbook/ProfileCard';
import ControlButton from './components/ui/ControlButton';
import logo from './assets/images/promo2000-logo.png';
import { FaBookOpen, FaVolumeMute, FaVolumeUp, FaForward, FaBackward, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// Función para barajar un array (algoritmo Fisher-Yates)
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const videoList = [
   { id: 1, name: "Los Años  90s", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756956370/ABRIR_ESTE_ARCHIVO_1_wjpmty.mp4', quote: "Donde todo comenzó." },
    { id: 2, name: "Recreos", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1756958807/promo3_cuumgp.mp4', quote: "Nuestros mejores momentos." },
    { id: 3, name: "María René Blacud", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456586/mariareneblacud_c2ysne.mp4', quote: "" },
    { id: 4, name: "Liseth Bustamante", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757373026/lissethbustamante_ytcmqk.mp4', quote: "" },
    { id: 5, name: "Maria Nelly Castillo", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757609111/marianelacastillo_tjrfks.mp4', quote: "" },
    { id: 6, name: "Carlos Gómez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456704/carlozgomez_hzi9wj.mp4', quote: "" },    
    { id: 7, name: "Félix Gutierrez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352513/felixgutierrez_hmpzdd.mp4', quote: "" },
    { id: 8, name: "Adriana Narváez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757977534/adriananarvaez_qhnrg8.mp4', quote: "" },
    { id: 9, name: "Miguel Navajas", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352482/mikichonavajas_pwnhz4.mp4', quote: "" },
    { id: 10, name: "Andres Pacheco", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456703/andrespacheco_awctsn.mp4', quote: "" },
    { id: 11, name: "Paul Pelaez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757456687/paulpelaez_koz2eb.mp4', quote: "" },
    { id: 12, name: "Silvia Sanjinez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1758043970/silviasanjinez_wvvyvj.mp4', quote: "" },
    { id: 13, name: "Salma Tórrez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757377883/salmatorrez_ay32j9.mp4', quote: "" },
    { id: 14, name: "Iván Vaca", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757352857/ivanvaca_lh9czb.mp4', quote: "" },
    { id: 15, name: "Nadia Vásquez", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1758000910/nadiavasquez_bopy70.mp4', quote: "" },
    { id: 16, name: "Juan Pablo Veizaga", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757368393/juanpabloveizaga_ocei8d.mp4', quote: "" },
    { id: 17, name: "Mariana Zamora", url: 'https://res.cloudinary.com/dru7b7n4j/video/upload/v1757384933/marianazamora_rfxxam.mp4', quote: "" },
];

function App() {
  const [mainVideo, setMainVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [isMainVideoPlaying, setIsMainVideoPlaying] = useState(true);

  // ✅ NUEVOS ESTADOS para la lógica de reproducción sin repetir
  const [playQueue, setPlayQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Función para avanzar al siguiente video
  const playNextVideo = useCallback(() => {
    // Si hay videos "adelante" en el historial (porque se retrocedió), los usamos
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setMainVideo(history[nextIndex]);
      return;
    }

    // Si la cola está vacía, la regeneramos
    let currentQueue = playQueue;
    if (currentQueue.length === 0) {
      currentQueue = shuffleArray([...videoList]);
    }
    
    const nextVideo = currentQueue[0];
    const remainingQueue = currentQueue.slice(1);
    
    setMainVideo(nextVideo.url);
    setPlayQueue(remainingQueue);
    
    // Actualizamos el historial
    const newHistory = [...history, nextVideo.url];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, playQueue]);

  // Función para retroceder
  const playPreviousVideo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setMainVideo(history[prevIndex]);
    }
  };

  // Efecto para la carga inicial
  useEffect(() => {
    if (videoList.length > 0) {
      const initialQueue = shuffleArray([...videoList]);
      const firstVideo = initialQueue[0];
      
      setPlayQueue(initialQueue.slice(1));
      setMainVideo(firstVideo.url);
      setHistory([firstVideo.url]);
      setHistoryIndex(0);
      setIsMainVideoPlaying(true);
    }
    
  }, []);

  const handleExpandToMain = (videoUrl) => {
    setMainVideo(videoUrl);
    setActiveProfile(null);
    setIsGalleryOpen(false);
    setIsMainVideoPlaying(true);
  };
  
  const openGallery = () => { setIsGalleryOpen(true); setIsMainVideoPlaying(false); };
  const closeGallery = () => { setIsGalleryOpen(false); setIsMainVideoPlaying(true); };
  const openProfile = (video) => setActiveProfile(video);
  const closeProfile = () => setActiveProfile(null);

  return (
    <>
      <MainVideoPlayer 
        videoUrl={mainVideo} 
        isMuted={isMuted}
        onVideoEnd={playNextVideo} // Al terminar, siempre va al siguiente
        isPlaying={isMainVideoPlaying}
      />

      <div className="layout-container">
        {/* ... (sección superior sin cambios) ... */}
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
            <ControlButton onClick={playPreviousVideo} ariaLabel="Video anterior" disabled={historyIndex <= 0}><FaBackward /></ControlButton>
            <ControlButton onClick={() => setIsMuted(prev => !prev)} ariaLabel="Sonido">{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</ControlButton>
            <ControlButton onClick={playNextVideo} ariaLabel="Siguiente video"><FaForward /></ControlButton>
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