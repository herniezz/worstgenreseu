import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentVideo, setCurrentVideo] = useState(null); /* przechowuje url aktualnie wyswietlanego filmiku */
  const [currentInfo, setCurrentInfo] = useState({ country: '', genre: '' });
/* przechowuje informacje o kraju i gatunku */
  const shuffleVideo = async () => {
    try {
      const response = await fetch('http://localhost:5001/genres'); /*wykonuje get na 5001, nie wiem czemu 5000 nie dziala xdd*/
      const data = await response.json();
      const randomVideo = data.videos[Math.floor(Math.random() * data.videos.length)];
      setCurrentVideo(randomVideo); /* Wybiera losowy film z otrzymanych danych i ustawia stan currentVideo na URL tego filmu */
      setCurrentInfo({ country: data.country, genre: data.genre });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    shuffleVideo();
  }, []);
/* Używa huka useEffect, aby wywołać funkcję shuffleVideo zaraz po wstaniu z kolan komponentu - dzięki temu losowy film jest wyświetlany od razu po załadowaniu strony */

  return ( /* super feature jest taki, ze mam przycisk, który po kliknięciu wywołuje funkcję shuffleVideo, aby wczytać nowy losowy film.*/
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
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
              </div>
          )}
        </header>
      </div>
  );
}
/* jesli currentvideo =/ null, daj informacje o tym co to za kraj i gatunek*/
export default App;
