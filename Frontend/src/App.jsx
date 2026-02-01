import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateTrip from './components/CreateTrip';
import CreateItinerary from './components/CreateItinerary';
import ShareTrip from './components/ShareTrip';
import UserProfile from './components/UserProfile';
import TripSummary from './components/TripSummary';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      // Fallback for old simple string data
      return savedUser;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <BackgroundSlideshow />
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/create-trip" element={<CreateTrip user={user} />} />
          <Route path="/create-itinerary" element={<CreateItinerary user={user} />} />
          <Route path="/share-trip" element={<ShareTrip user={user} />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/trip-summary" element={<TripSummary user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
