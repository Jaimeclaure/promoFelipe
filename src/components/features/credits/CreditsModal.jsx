// src/components/features/credits/CreditsModal.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const CreditsModal = ({ onClose }) => {
  return (
    <div className="credits-modal-overlay" onClick={onClose}>
      <div className="credits-modal" onClick={e => e.stopPropagation()}>
        <button className="credits-modal-close" onClick={onClose}><FaTimes /></button>
        
        <h2>Créditos del Proyecto</h2>
        
        <p className="intro-text">
          Este Anuario Digital Interactivo se creó para conmemorar los 25 años de la Promoción 2000 y dar la bienvenida a las nuevas generaciones.
        </p>
        
        <hr />

        <div className="credits-list">
          <div className="credit-item">
            <h4>Desarrollo del Software para el Anuario Digital</h4>
            <p>
              <a href="https://wa.me/+59167806989?text=Nos%20interesa%20el%20software" target="_blank" rel="noopener noreferrer"
              style={{ color: 'white', textDecoration: 'underline' }}>
                Ing. Msc. Jaime Claure Alvarez
              </a>
            </p>
          </div>
          <div className="credit-item">
            <h4>Diseño del Mobiliario para la Estación de Lectura</h4>
            <p>
              <a href="https://wa.me/+59178254869?text=Nos%20interesa%20el%20mobiliario" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
                Arq. Carlos Hugo Gómez Solíz
              </a>
            </p>
          </div>
        </div>

        <hr />
        
        <p className="tech-stack">
           HECHO CON ESMERO PARA EL COLEGIO HNO. FELIPE PALAZÓN
        </p>
      </div>
    </div>
  );
};

export default CreditsModal;