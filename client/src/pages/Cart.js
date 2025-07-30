import React, { useState } from "react";
import Header from '../components/Header/Header';
import CartItem from '../components/CartItem/CartItem'
import './Cart.css'

function Cart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((t, i) => t + i.price, 0);
    const [reloadKey, setReloadKey] = useState(0);
    const reloadPage = () => {
        setReloadKey(k => k + 1);
    };
    return (
        <>
        <Header />
        <div className='cart-items'>
        {cart.map((item) => (
            <CartItem key={item.productId} itemData={item} reloadTrigger={reloadPage}/>
        ))}
        </div>
        Checkout embed goes here
        </>
    );
}

export default Cart;