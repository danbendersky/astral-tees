import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart.js';
import Home from './pages/Home.js';
import SearchResults from './pages/SearchResults.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
