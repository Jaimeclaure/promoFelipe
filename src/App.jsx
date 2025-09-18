import React, { useState, useEffect, useCallback } from 'react';
import MainVideoPlayer from './components/layout/MainVideoPlayer';
import YearbookView from './components/features/yearbook/YearbookView';
import ProfileCard from './components/features/yearbook/ProfileCard';
import BookLibraryView from './components/features/library/BookLibraryView';
import BookDetailModal from './components/features/library/BookDetailModal';
import ControlButton from './components/ui/ControlButton';
import logo from './assets/images/promo2000-logo.png';
import { FaBookOpen, FaVolumeMute, FaVolumeUp, FaForward, FaBackward, FaFacebook, FaInstagram, FaWhatsapp, FaBook } from 'react-icons/fa';

import { bookList } from './data/books';

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
  
  // ✅ Estados para la nueva biblioteca de libros
  const [isBookLibraryOpen, setIsBookLibraryOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Lógica de reproducción de videos (sin cambios)
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

  const openGallery = () => { setIsGalleryOpen(true); setIsMainVideoPlaying(false); };
  const closeGallery = () => { setIsGalleryOpen(false); setIsMainVideoPlaying(true); };
  const openProfile = (video) => setActiveProfile(video);
  const closeProfile = () => setActiveProfile(null);

  // ✅ Funciones para abrir y cerrar la biblioteca
  const openBookLibrary = () => {
    setIsBookLibraryOpen(true);
    setIsMainVideoPlaying(false); // Pausamos el video
  };

  const closeBookLibrary = () => {
    setIsBookLibraryOpen(false);
    setIsMainVideoPlaying(true); // Reanudamos el video
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
            <a href="https://wa.me/+59167806989?text=Nos%20interesa%20el%20proyecto" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="bottom-ui-container">
          <div className="quote-container" style={{ textAlign: 'center' }}>
            <p>Hno. Felipe Palazón | Anuario Digital Interactivo | Promo 2000<br />Celebrando 25 años de amistad y momentos inolvidables.</p> 
          </div>
          <div className="main-controls">
            <ControlButton onClick={() => handleNavigation('prev')} ariaLabel="Video anterior"><FaBackward /></ControlButton>
            <ControlButton onClick={() => setIsMuted(prev => !prev)} ariaLabel="Sonido">{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</ControlButton>
            <ControlButton onClick={() => handleNavigation('next')} ariaLabel="Siguiente video"><FaForward /></ControlButton>
            <ControlButton onClick={openGallery} ariaLabel="Abrir anuario"><FaBookOpen /></ControlButton>
            {/* ✅ NUEVO BOTÓN para la biblioteca */}
            <ControlButton onClick={openBookLibrary} ariaLabel="Abrir biblioteca de libros"><FaBook /></ControlButton>
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

      {/* ✅ NUEVOS COMPONENTES renderizados condicionalmente */}
      {isBookLibraryOpen && (
        <BookLibraryView 
          books={bookList}
          onSelectBook={setSelectedBook}
          onClose={closeBookLibrary}
        />
      )}

      <BookDetailModal 
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
}

export default App;