import React, { useState } from 'react';
import './Dropdown.css';

function Size() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('Size');
  
  const select = (input) => {
    setSize(input);
  }

  return (
    <div className="dropdown"
    onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}>
      <button className="dropbtn" onClick={() => setOpen(!open)}>
        {size} ▼
      </button>
      {open && (
        <div className="dropdown-content">
          <button onClick={() => select('XS')}>XS</button>
          <button onClick={() => select('S')}>S</button>
          <button onClick={() => select('M')}>M</button>
          <button onClick={() => select('L')}>L</button>
          <button onClick={() => select('XL')}>XL</button>
          <button onClick={() => select('XXL')}>XXL</button>
        </div>
      )}
    </div>
  );
}

export default Size;
