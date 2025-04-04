import React, { useState, useEffect, useCallback } from "react";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchBooks = async (searchTerm) => {
    if (!searchTerm) {
      setBooks([]); 
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/books?search=${searchTerm}`);
      if (!response.ok) throw new Error("No books found");
      
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
    setLoading(false);
  };

  
  const debouncedFetchBooks = useCallback(debounce(fetchBooks, 300), []);
 
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchBooks(value);
  };

  return (
    <div className="container">
      <h1>📚 Book Finder</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for books..."
          value={query}
          onChange={handleInputChange}
        />
      </div>

      {loading && <p>Loading books...</p>}
      {books.length === 0 && query && !loading && <p>No books found. Try another search.</p>}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <p className="book-title">{book.title}</p>
            <p className="book-author">by {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
