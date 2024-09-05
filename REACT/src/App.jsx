import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddPlayer from './components/AddPlayer'; 
import MatchDetails from './components/MatchDetails'; 
import TopPlayers from './components/TopPlayers'; 
import MatchesByDateRange from './components/MatchesByDateRange'; 
import Navbar from './components/Navbar'; // 
import './styles/styles.css'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/match-details" element={<MatchDetails />} />
          <Route path="/top-players" element={<TopPlayers />} />
          <Route path="/matches-by-date-range" element={<MatchesByDateRange />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
