import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get("http://localhost:5000/api/books/search?query=");
      const foundBook = res.data.find((b) => b.id.toString() === id);
      setBook(foundBook);
    };
    fetchBook();
  }, [id]);

  console.log('book', book);

  if (!book) return <p>Book not found</p>;

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <h2> {book.author}</h2>
      <img src={book.image} alt={book.title} width="200" style={{ borderRadius: "10px", marginTop: "10px" }} />
    </div>
  );
}

export default BookDetails;
