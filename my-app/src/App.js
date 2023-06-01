import './App.css';
import React, { useState } from 'react';
import NavbarComponent from './components/NavbarComponent';
//import CardUpload from './components/CardUpload';
//import CardSearch from './components/CardSearch';
import Footer from './components/Footer';
import Summarizer from './pages/SummarizerPage';
import Chat from './pages/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import UserProfile from './components/UserProfile';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {

return (
<Router>
<div className="app-container d-flex flex-column min-vh-100">
<AuthContextProvider>
<NavbarComponent />
</AuthContextProvider>
<div className="container my-3">
<Routes>
<Route path="/chat" element={<Chat />} />
</Routes>
<Routes>
<Route path="/myprofile" element={<UserProfile />} />
</Routes>
</div>
<Footer />
</div>
</Router>
);
}

export default App;