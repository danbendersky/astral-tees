import './CartItem.css';
import { useNavigate } from "react-router-dom";
import { Trash2 } from 'lucide-react';

function CartItem({ itemData, reloadTrigger}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${encodeURIComponent(itemData.productId)}`);
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    const notEqual = (i1, i2) => {
        return JSON.stringify(i1) !== JSON.stringify(i2);
    }

    //Modify cookies
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(item => notEqual(item, itemData));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log(updatedCart);
    //Force cart page reload
    reloadTrigger();
  }

  return (
    <div className="cart-tile" onClick={handleClick}>
      <h2 style={{ 
        justifyContent: "left", 
        fontSize: "2rem", 
        textAlign: "center",
        maxWidth: "20%"
      }}>
        {itemData.name}
      </h2>
      {itemData.image && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", width: "200px", height: "200px", position: "relative", overflow: "hidden"}}>
          <img
            src={itemData.image}
            alt={itemData.image.toString()}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      )}
      <div className='text'> 
      Qty:<br></br>
      {itemData.qty}
      </div>
      <div className='text'> 
      Size:<br></br>
      {itemData.size}
      </div>
      <div className='text'> 
      Unit Price:<br></br>
      {itemData.price}
      </div>
      <div className='text'> 
      Total Price:<br></br>
      {itemData.qty * itemData.price}
      </div>
      <div className='delete' onClick={handleDelete}>
        <Trash2 className='trash-2'/>
      </div>
    </div> 
  );
}

export default CartItem;