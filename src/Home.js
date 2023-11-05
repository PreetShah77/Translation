// Home.js
import React from 'react';
import './Home.css';
import translationImage from './images/translation-image.jpg'; // Make sure to adjust the path

function Home() {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src={translationImage} alt="Translation Image" width={600} height={200}  />
      </div>
      <div className="message-container">
        
        <p>
          Translation plays a crucial role in bridging language barriers and promoting
          understanding between people from diverse backgrounds. It allows us to
          communicate, share knowledge, and appreciate different cultures.
        </p>
        <p>
          Our translation tools are here to assist you in making the world a more
          connected and inclusive place. <b>Start translating today!</b>
        </p>
      </div>
    </div>
  );
}

export default Home;
