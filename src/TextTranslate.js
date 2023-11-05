// TextTranslate.js
import React, { useState } from 'react';
import './TextTranslate.css';

function TextTranslate() {
  const [englishText, setEnglishText] = useState('');
  const [gujaratiText, setGujaratiText] = useState('');

  const translateText = (fromLanguage, toLanguage, text) => {
    const apiUrl = `https://langapi.vercel.app/home?from=${fromLanguage}&to=${toLanguage}&text=${text}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.translated) {
          if (fromLanguage === 'en') {
            setGujaratiText(data.translated);
          } else if (fromLanguage === 'gu') {
            setEnglishText(data.translated);
          }
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
    <div className="text-translate-container">
      <h2>Text Translation</h2>
      <label>
      <p>English:</p>
        <textarea
          className="text-input"
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
        />
        </label>
      <br />
      <label>
        <p>Gujarati:</p>
        <textarea
          className="text-input"
          value={gujaratiText}
          onChange={(e) => setGujaratiText(e.target.value)}
        />
      </label>
      <br />
      <button
        onClick={() => translateText('en', 'gu', englishText)}
        className="translate-button"
      >
        Translate to Gujarati
      </button>
      <button
        onClick={() => translateText('gu', 'en', gujaratiText)}
        className="translate-button"
      >
        Translate to English
      </button>
    </div>
  );
}

export default TextTranslate;
