import React, { useState } from 'react';
import './AudioTranslate.css';

function AudioTranslate() {
  const [audioFile, setAudioFile] = useState(null);
  const [translatedText, setTranslatedText] = useState('');
  const [translatedAudio, setTranslatedAudio] = useState(null);

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleTranslate = async () => {
    if (!audioFile) {
      alert('Please upload an audio file first.');
      return;
    }

    // Send the audio file to the server
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        setTranslatedAudio(url);
      } else {
        console.error('Error sending audio to server', response.statusText);
      }
    } catch (error) {
      console.error('Error sending audio to server:', error);
    }
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
          {translatedAudio && <source src={translatedAudio} type="audio/mpeg" />}
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
