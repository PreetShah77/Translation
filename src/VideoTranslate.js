import React, { useState } from 'react';
import './VideoTranslate.css';

function VideoTranslate() {
  const [videoFile, setVideoFile] = useState(null);
  const [translatedVideo, setTranslatedVideo] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleTranslate = async () => {
    if (!videoFile) {
      alert('Please upload a video file first.');
      return;
    }

    // Send the video file to the server
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://localhost:6969/translate-video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log(1);
        const blob = await response.blob();
        console.log(2);
        const url = window.URL.createObjectURL(new Blob([blob]));
        console.log(3);
        setTranslatedVideo(url);
      } else {
        console.error('Error sending video to server', response.statusText);
      }
    } catch (error) {
      console.error('Error sending video to server:', error);
    }
  };

  return (
    <div className="video-translate-container">
      <h2>Video Translation</h2>
      <label className="file-input">
        Upload a video file (MP4/AVI):
        <input type="file" accept=".mp4,.avi" onChange={handleVideoChange} />
      </label>
      <div className="output-video">
        {translatedVideo ? (
          <video controls>
            <source src={translatedVideo} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="translate-buttons">
        <button onClick={handleTranslate} className="translate-button">
          Translate Video
        </button>
      </div>
    </div>
  );
}

export default VideoTranslate;
