import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentVideo, setCurrentVideo] = useState(null); /* tworzy zmienną stanu currentInfo oraz funkcję setCurrentInfo do jej aktualizacji */
  const [currentInfo, setCurrentInfo] = useState({ country: '', genre: '' }); /*hook -  inicjalizuje currentInfo obiektem z pustymi wartościami dla kluczy country i genre */

  const shuffleVideo = async () => {
    try {
      const response = await fetch('https://blooming-sea-22678-d329885364f4.herokuapp.com/genres'); /* link do backendu */
      const data = await response.json();
      const randomVideo = data.videos[Math.floor(Math.random() * data.videos.length)];
      setCurrentVideo(randomVideo);
      setCurrentInfo({ country: data.country, genre: data.genre });
    } catch (error) {
      console.error('error fetching data:', error);
    }
  };

  /*wybierz losowy filmik z tablicy genres, zaokraglij index do 0, pobierz ten filmik. Wyswietl go w komponencie i łap bledy */

  useEffect(() => {
    shuffleVideo();
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <h1>najgorsze gatunki w europie</h1>
          <button onClick={shuffleVideo}>kliknij se</button>
          {currentVideo && (
              <div>
                <h2>{currentInfo.country} - {currentInfo.genre}</h2>
                <iframe
                    width="560"
                    height="315"
                    src={currentVideo}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
              </div>
          )}
        </header>
      </div>
  );
}

export default App;
