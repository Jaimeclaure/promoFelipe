import React from 'react';
import { FaTimes } from 'react-icons/fa';

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={e => e.stopPropagation()}>
        <button className="detail-modal-close" onClick={onClose}><FaTimes /></button>
        <div className="modal-content">
          <img src={book.coverUrl} alt={`Portada de ${book.title}`} />
          <div className="modal-text">
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <h4>Editorial: {book.publisher}</h4>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;