import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 5001; // Use the port assigned by Heroku or fallback to 5001 for local development

app.use(cors()); /* to jest po to, zeby nasluchiwac inne domeny */
/*instancja aplikacji express, tak mi kazali*/
const genres = [
    { "country": "Germany", "genre": "Schlager" },
    { "country": "Poland", "genre": "Disco Polo" },
    { "country": "Serbia", "genre": "Turbo-Folk" },
    { "country": "Romania", "genre": "Manele" },
    { "country": "United Kingdom", "genre": "Happy Hardcore" },
    { "country": "France", "genre": "Chanson" },
    { "country": "Italy", "genre": "Italo Disco" },
    { "country": "Russia", "genre": "Russian Popsa" },
    { "country": "Spain", "genre": "Reggaeton Español" },
    { "country": "Netherlands", "genre": "Levenslied" },
    { "country": "Finland", "genre": "Iskelmä" },
    { "country": "Sweden", "genre": "Dansband" },
    { "country": "Portugal", "genre": "Pimba" },
    { "country": "Greece", "genre": "Laïkó" },
    { "country": "Austria", "genre": "Volkstümliche Musik" },
    { "country": "Belgium", "genre": "Schlager" },
    { "country": "Bulgaria", "genre": "Chalga" },
    { "country": "Croatia", "genre": "Narodna Muzika" },
    { "country": "Czech Republic", "genre": "Dechovka" },
    { "country": "Denmark", "genre": "Dansktop" },
    { "country": "Estonia", "genre": "Retro Pop" },
    { "country": "Hungary", "genre": "Nóta" },
    { "country": "Iceland", "genre": "Íslensk Dægurlög" },
    { "country": "Ireland", "genre": "Country and Irish" },
    { "country": "Latvia", "genre": "Schlager" },
    { "country": "Lithuania", "genre": "Estradinė Muzika" },
    { "country": "Luxembourg", "genre": "Schlager" },
    { "country": "Malta", "genre": "Għana" },
    { "country": "Montenegro", "genre": "Narodna Muzika" },
    { "country": "Norway", "genre": "Danseband" },
    { "country": "Slovakia", "genre": "Česko-Slovenská Populární Hudba" },
    { "country": "Slovenia", "genre": "Narodna Zabavna Glasba" },
    { "country": "Switzerland", "genre": "Volksmusik" },
    { "country": "Ukraine", "genre": "Popsa" }
];
/*hardcoded kraje, chce dodac wiecej gatunkuw */
const API_KEY = process.env.API_KEY;
/* wykonaj zadanie do yt api*/
async function fetchYouTubeVideos(query) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&key=${API_KEY}`);
    const data = await response.json();
    return data.items.map(item => `https://www.youtube.com/embed/${item.id.videoId}`);
}
/* hej, wywolaj mi fetchyoutubevideos() aby pobrac filmiki z geta*/
app.get('/genres', async (req, res) => {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const videos = await fetchYouTubeVideos(genre.genre);
    res.json({ country: genre.country, genre: genre.genre, videos });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
