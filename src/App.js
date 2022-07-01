// Libraries
import React from "react";
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// Stylesheets
import './Stylesheets/App.css';

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainSection from "./Components/MainSection";
import LoginForm from "./Components/LoginForm";
import Listing from "./Components/Listing";
import Details from "./Components/Details";
import Favorites from "./Components/Favorites";

function App() {
  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
    const favMovies = localStorage.getItem('favs');
    if(favMovies != null){
        const favsArray = JSON.parse(favMovies);
        setFavorites(favsArray);
    }
  }, []);

  const addOrRemoveFavs = (e) => {
    const favMovies = localStorage.getItem('favs');
    let tempMoviesInFavs;

    if (!favMovies) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    };
    let movieIsInFavs = tempMoviesInFavs.find(movie => {
      return movie.id === movieData.id
    });

    if (!movieIsInFavs) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
    } else {
      let moviesLeft = tempMoviesInFavs.filter(movie => {
        return movie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      console.log(moviesLeft);
      setFavorites(moviesLeft);
    }
  } 

  return (
    <main className="App">
      <Header />

      <div className="main">
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies" element={<Listing addOrRemoveFavs={addOrRemoveFavs} />} />
          <Route path="/detail" element={<Details />} />
          <Route path="/favorites" element={<Favorites addOrRemoveFavs={addOrRemoveFavs} favorites={favorites} />} />
        </Routes>
      </div>

      <Footer />
    </main>
  );
}

export default App;
