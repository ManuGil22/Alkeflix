// Libraries
import React from "react";
import { Route, Routes } from 'react-router-dom';

// Stylesheets
import './Stylesheets/App.css';

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainSection from "./Components/MainSection";
import LoginForm from "./Components/LoginForm";

function App() {
  return (
    <main className="App">
      <Header />


      <div className="main">
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>

      <Footer />
    </main>
  );
}

export default App;
