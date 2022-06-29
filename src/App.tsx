import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Favorites from './pages/favorites';
import Home from './pages/home';
import WatchLater from './pages/watch-later';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
