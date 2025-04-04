import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";

const App = () => {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">📚 Home</Link>
        <Link to="/add">➕ Add Book</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </Router>
  );
};

export default App;
