import React, { useState } from 'react';
import './Dropdown.css'; // use same CSS as above

function Quantity() {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState('Quantity');

  const select = (input) => {
    setQuantity(input);
  }

  return (
    <div className="dropdown"
    onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}>
      <button className="dropbtn" onClick={() => setOpen(!open)}>
        {quantity} ▼
      </button>
      {open && (
        <div className="dropdown-content">
          <button onClick={() => select(1)}>1</button>
          <button onClick={() => select(2)}>2</button>
          <button onClick={() => select(3)}>3</button>
          <button onClick={() => select(4)}>4</button>
          <button onClick={() => select(5)}>5</button>
          <button onClick={() => select(6)}>6</button>
        </div>
      )}
    </div>
  );
}

export default Quantity;
