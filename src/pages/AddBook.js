import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = { title, author, image };

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(" Book added successfully!");
        setTitle("");
        setAuthor("");
        setImage("");
        setShowPopup(true); 

        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              navigate("/"); 
            }
            return prev - 1;
          });
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          navigate("/");
        }, 10000);
      } else {
        setMessage(" Error: " + data.message);
      }
    } catch (error) {
      setMessage(" Failed to add book");
    }
  };

  return (
    <div className="container">
      <h1>➕ Add a New Book</h1>

      {message && <p>{message}</p>}

      <form className="add-book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">📥 Add Book</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2> Book Added Successfully!</h2>
            <p>Redirecting in {countdown} seconds...</p>
            <button onClick={() => navigate("/")}> Go to Home</button>
            <button onClick={() => setShowPopup(false)}> Stay Here</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;
