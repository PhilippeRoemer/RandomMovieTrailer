import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";

require("dotenv").config();

function App() {
    const [movie, setMovie] = useState("");

    const api_key = process.env.REACT_APP_API_KEY;

    const getMovie = () => {
        axios
            .get("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1")
            .then((response) => {
                const randomMovieID = response.data.results[Math.floor(Math.random() * 19)].id;
                return axios.get("https://api.themoviedb.org/3/movie/" + randomMovieID + "/videos?api_key=" + api_key + "&language=en-US");
            })
            .then((response) => {
                console.warn(response);
                console.log(response.data.results[0].key);
                setMovie("https://www.youtube.com/embed/" + response.data.results[0].key + "?autoplay=1");
            });
    };
    return (
        <div className="App">
            <button onClick={getMovie}>Random Movie Trailer</button>
            <br />
            <iframe width="420" height="345" src={movie}></iframe>
        </div>
    );
}

export default App;
