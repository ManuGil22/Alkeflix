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
import Results from "./Components/Results";

function App() {
  const [ favorites, setFavorites ] = useState([]);
  const [ token, setToken] = useState(null);

  useEffect(() => {
    const favMovies = localStorage.getItem('favs');
    if(favMovies != null){
        const favsArray = JSON.parse(favMovies);
        setFavorites(favsArray);
    }
  }, []);

  function fetchData (){
    const userToken = sessionStorage.getItem('token');
    if (userToken){
      setToken(userToken);
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

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

    const favIcon = btn.querySelector('.fav-icon');

    if (!movieIsInFavs) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      favIcon.classList.add('fav-icon-filled');
    } else {
      let moviesLeft = tempMoviesInFavs.filter(movie => {
        return movie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      favIcon.classList.remove('fav-icon-filled');
    }
    
  } 

  return (
    <main className="App">
      <Header />

      <div className="main">
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/login" element={<LoginForm fetchData={fetchData} />} />
          <Route path="/movies" element={<Listing addOrRemoveFavs={addOrRemoveFavs} favorites={favorites} />} />
          <Route path="/detail" element={<Details />} />
          <Route path="/favorites" element={<Favorites addOrRemoveFavs={addOrRemoveFavs} favorites={favorites} />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>

      <Footer />
    </main>
  );
}

export default App;
