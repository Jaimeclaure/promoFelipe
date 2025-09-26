import React from 'react';
import { FaTimes } from 'react-icons/fa';
import escudo from '../../../assets/images/monograma_blanco.png';

const CreditsModal = ({ onClose }) => {
  return (
    <div className="credits-modal-overlay" onClick={onClose}>
      <div className="credits-modal" onClick={e => e.stopPropagation()}>
        <button className="credits-modal-close" onClick={onClose}><FaTimes /></button>
        
        <h3>Créditos del Proyecto</h3>
        
        <p className="intro-text">
          Este Anuario Digital Interactivo se creó para conmemorar los 25 años de la Promoción 2000 y dar la bienvenida a las nuevas generaciones.
        </p>
        
        <hr />

        {/* Este contenedor alinea los 2 créditos principales en horizontal */}
        <div className="credits-list">
          <div className="credit-item">
            <h4>Desarrollo de Software del Anuario Digital</h4>
            <p>
              <a href="https://wa.me/+59167806989?text=Nos%20interesa%20el%20software" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
                Ing. MSc. Jaime Claure Alvarez
              </a>
            </p>
          </div>
          <div className="credit-item">
            <h4>Diseño de Mobiliario de la Estación de Lectura</h4>
            <p>
              <a href="https://wa.me/+59178254869?text=Nos%20interesa%20el%20mobiliario" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
                Arq. MSc. Carlos Gómez Solíz 
              </a>
            </p>
          </div>
        </div>

        
        <div className="credit-item collaborators">
          <p><br />
          <h4>Colaboradores</h4> </p>
        
          <p>
            Lic. Paola Orihuela Rosas <br />
            Lic. Verónica Rocha Zamora<br />
            Lic. Claudia Molina<br />            
            Lic. Mariana Sueldos<br />            
          </p>
        </div>

        <hr />
          <div style={{ textAlign: 'center' }}>
        <p className="tech-stack">
          Agradecimiento especial a la Promoción<br/>por su apoyo en este Proyecto hecho<br/>con esmero para el Colegio Hno. Felipe Palazón.
        </p>
        <p>
        <img src={escudo} alt="escudo" style={{ maxWidth: '8%', height: 'auto' }}/>
        </p>
</div>        
      </div>
    </div>
  );
};

export default CreditsModal;