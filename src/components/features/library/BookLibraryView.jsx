import React from 'react';
import { FaTimes } from 'react-icons/fa';
import BookCard from './BookCard';

const BookLibraryView = ({ books, onSelectBook, onClose }) => {
  return (
    <div className="library-overlay">
      <div className="library-header">
        <h1>Biblioteca de la Promoción</h1>
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