import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart.js';
import Home from './pages/Home.js';
import SearchResults from './pages/SearchResults.js';
import InteractiveBubble from './components/InteractiveBubble/InteractiveBubble.js';
import Product from './pages/Product.js'
import Return from './pages/Return.js'

function App() {
  return (
    <>
    <div className="gradient-bg">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
      <BrowserRouter>
        <div className="route-content" style={{ position: 'relative', zIndex: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/return" element={<Return />} />
          </Routes>
        </div>
        <div className="gradients-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}>
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <InteractiveBubble/>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
