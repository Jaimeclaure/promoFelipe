import React from 'react';

const BookCard = ({ book, onSelectBook }) => {
  return (
    <div className="book-card" onClick={() => onSelectBook(book)}>
      <img src={book.coverUrl} alt={`Portada de ${book.title}`} loading="lazy" />
      <div className="book-card-overlay">
        <p>{book.title}</p>
      </div>
    </div>
  );
};

export default BookCard;