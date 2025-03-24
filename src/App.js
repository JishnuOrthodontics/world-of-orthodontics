import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>THE ORTHODONTIC CORP</h1>
        <p>Uplift Your Standards of Practice</p>
        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <a href="/contact">Contact Us</a>
      </div>
    </Router>
  );
}

export default App;