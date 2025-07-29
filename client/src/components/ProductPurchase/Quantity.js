import React, { useState } from 'react';
import './Dropdown.css'; // use same CSS as above

function Quantity( { choose } ) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState('Quantity');

  const select = (input) => {
    setQuantity(input);
    choose(input);
  }

  return (
    <div className="dropdown"
    onMouseLeave={() => setOpen(false)}>
      <button className="dropbtn" onMouseEnter={() => setOpen(true)} onClick={() => setOpen(!open)}>
        {quantity} ▼
      </button>
      {open && (
        <div className="dropdown-content">
          {[...Array(6)].map((_, i) => (
            <button 
              key={i}
              onClick={() => select(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          {}
        </div>
      )}
    </div>
  );
}

export default Quantity;
