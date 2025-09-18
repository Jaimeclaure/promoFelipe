// src/components/features/library/BookLibraryView.jsx
import React from 'react';
import { FaTimes, FaLink } from 'react-icons/fa'; // Importamos el ícono de enlace
import BookCard from './BookCard';

// Recibimos la nueva prop 'virtualLibraries'
const BookLibraryView = ({ books, virtualLibraries, onSelectBook, onClose }) => {
  return (
    <div className="library-overlay">
      
      {/* ✅ NUEVA SUBSECCIÓN DE BIBLIOTECAS VIRTUALES */}
      <div className="virtual-libraries-section">
        <h3>Bibliotecas Virtuales</h3>
        <div className="virtual-libraries-list">
          {virtualLibraries.map((library) => (
            <a 
              key={library.name} 
              href={library.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="virtual-library-link"
            >
              <FaLink />
              <span>{library.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="library-header">
        <h3>Biblioteca Física</h3>
        <button className="library-close-button" onClick={onClose}><FaTimes /></button>
      </div>

      <div className="book-grid">
        {books.map(book => (
          <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
        ))}
      </div>
    </div>
  );
};

export default BookLibraryView;