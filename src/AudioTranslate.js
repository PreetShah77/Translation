// AudioTranslate.js
import React, { useState } from 'react';
import './AudioTranslate.css';

function AudioTranslate() {
  const [audioFile, setAudioFile] = useState(null);
  const [translatedText, setTranslatedText] = useState('');
  const [translatedAudio, setTranslatedAudio] = useState('');

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleTranslate = () => {
    if (!audioFile) {
      alert('Please upload an audio file first.');
      return;
    }

    // Perform speech-to-text on the audio (you'll need to implement this part)

    // Assuming you have the result as text, send it for translation
    const textToTranslate = 'Your Speech to Text Result'; // Replace with actual result
    const translationUrl = `https://langapi.vercel.app/home?from=en&to=gu&text=${textToTranslate}`;

    fetch(translationUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.translated) {
          setTranslatedText(data.translated);
          // Perform text-to-speech for translation (you'll need to implement this part)
        } else {
          // Handle translation error
          console.error('Translation failed.');
        }
      })
      .catch((error) => {
        // Handle fetch error
        console.error(error);
      });
  };

  return (
    <div className="audio-translate-container">
      <h2>Audio Translation</h2>
      <label className="file-input">
        Upload an audio file (MP3/WAV):
        <input type="file" accept=".mp3,.wav" onChange={handleAudioChange} />
      </label>
      <div className="output-audio">
        Translated Text:
        <p>{translatedText}</p>
        <audio controls>
          {/* Add translated audio source here */}
        </audio>
      </div>
      <div className="translate-buttons">
        <button onClick={handleTranslate} className="translate-button">
          Translate to Gujarati
        </button>
        <button onClick={handleTranslate} className="translate-button">
          Translate to English
        </button>
      </div>
    </div>
  );
}

export default AudioTranslate;
