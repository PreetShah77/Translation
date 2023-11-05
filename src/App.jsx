import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TextTranslate from './TextTranslate';
import AudioTranslate from './AudioTranslate';
import PdfTranslate from './PdfTranslate';
import VideoTranslate from './VideoTranslate'; // Import the VideoTranslate component

import './App.css'; // Import your main CSS file for the App

import Home from './Home'; // Import the Home component

function App() {
  return (
    <Router>
      <div className="dashboard">
        <nav className="nav-bar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/text-translate">Text Translate</Link>
            </li>
            <li className="nav-item">
              <Link to="/audio-translate">Audio Translate</Link>
            </li>
            <li className="nav-item">
              <Link to="/pdf-translate">PDF Translate</Link>
            </li>
            <li className="nav-item">
              <Link to="/video-translate">Video Translate</Link> {/* Add a link for Video Translate */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-translate" element={<TextTranslate />} />
          <Route path="/audio-translate" element={<AudioTranslate />} />
          <Route path="/pdf-translate" element={<PdfTranslate />} />
          <Route path="/video-translate" element={<VideoTranslate />} /> {/* Add a route for Video Translate */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
