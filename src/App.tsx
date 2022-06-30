import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Container } from '@mui/material';

import Favorites from './pages/favorites';
import Home from './pages/home';
import WatchLater from './pages/watch-later';
import Header from './ui/header';

function App() {
  return (
    <Container maxWidth="xl">
      <Router>
        <Header />
        <Routes>
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
