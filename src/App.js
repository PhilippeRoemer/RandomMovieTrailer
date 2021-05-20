import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";

require("dotenv").config();

function App() {
    const [movie, setMovie] = useState("");
    const [poster, setPoster] = useState("");

    const api_key = process.env.REACT_APP_API_KEY;

    const randomPage = Math.floor(Math.random() * 4) + 1;

    const getMovie = () => {
        axios
            .get("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=" + randomPage)
            .then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.results[0]);

                console.log("ID", response.data.results[0].id);

                const randomMovie = response.data.results[Math.floor(Math.random() * 19)];

                const movieID = randomMovie.id;
                const movieTitle = randomMovie.title;
                const movieReleaseDate = randomMovie.release_date;
                const movieOverview = randomMovie.overview;
                const moviePoster = randomMovie.poster_path;

                document.getElementById("title").innerHTML = movieTitle;
                document.getElementById("releaseDate").innerHTML = movieReleaseDate;
                document.getElementById("overview").innerHTML = movieOverview;

                setPoster("https://image.tmdb.org/t/p/w500/" + moviePoster);

                return axios.get("https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + api_key + "&language=en-US");
            })
            .then((response) => {
                setMovie("https://www.youtube.com/embed/" + response.data.results[0].key);
            });
    };
    return (
        <div className="App">
            <img src={poster} height="250px" />
            <p>
                Movie: <span id="title"></span>
            </p>

            <p>
                Release Date: <span id="releaseDate"></span>
            </p>

            <p>
                Overview: <span id="overview"></span>
            </p>

            <button onClick={getMovie}>Random Movie Trailer</button>
            <br />
            <iframe width="420" height="345" src={movie}></iframe>
        </div>
    );
}

export default App;
