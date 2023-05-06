import './App.css';
import React from 'react';
import NavbarComponent from './components/NavbarComponent';
//import CardUpload from './components/CardUpload';
//import CardSearch from './components/CardSearch';
import Footer from './components/Footer';
import Summarizer from './pages/SummarizerPage';
import Chat from './pages/ChatPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="container my-3">
        <Routes>
          <Route path="/" element={
            <div className="row">
              
              <div className="col-md-12">
                <h1>THIS IS INDEX</h1>
              </div>
            </div>
          } />
          <Route path="/chat" element={<Chat />} />
          <Route path="/summarizer" element={<Summarizer />} />

        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);
}

export default App;
