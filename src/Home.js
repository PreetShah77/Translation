// Home.js
import React from 'react';

function Home() {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src='translator\src\images\translation-image.jpg' alt="Translation Image" />
      </div>
      <div className="message-container">
        <h2>Importance of Translation</h2>
        <p>
          Translation plays a crucial role in bridging language barriers and promoting
          understanding between people from diverse backgrounds. It allows us to
          communicate, share knowledge, and appreciate different cultures.
        </p>
        <p>
          Our translation tools are here to assist you in making the world a more
          connected and inclusive place. Start translating today!
        </p>
      </div>
    </div>
  );
}

export default Home;
