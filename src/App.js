// Libraries
import React from "react";
import { Link } from 'react-router-dom';

// Stylesheets
import './Stylesheets/App.css';

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <main className="App">
      <Header />

      <div className="main-section">
        <div className="main-welcome">
          <p className="main-welcome-header">WELCOME TO ALKEFLIX!</p>
          <p className="main-welcome-text">Checkout all the movies in our theaters and</p>
          <p className="main-welcome-text">never lose a movie premiere again!</p>
          <Link to="/login" className="main-welcome-btn">Start now!</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default App;
