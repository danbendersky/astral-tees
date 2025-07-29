import React, { useState } from 'react';
import './Dropdown.css';

function Size( { choose }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('Size');
  
  const select = (input) => {
    setSize(input);
    choose(input);
  }

  return (
    <div className="dropdown"
    onMouseLeave={() => setOpen(false)}>
      <button className="dropbtn" onMouseEnter={() => setOpen(true)} onClick={() => setOpen(!open)}>
        {size} ▼
      </button>
      {open && (
        <div className="dropdown-content">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
            <button 
              key={s}
              onClick={() => {select(s);}}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Size;
