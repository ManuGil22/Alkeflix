// Libraries
import React from "react";

// Stylesheets
import './Stylesheets/App.css';

// Images
import cinemaImg from '../src/Cinema.jpg'

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <main className="App">
      <Header />

      <div className="main-section">
        <img src={cinemaImg} className="main-img" alt="cinema"></img>
      </div>

      <Footer />
    </main>
  );
}

export default App;
