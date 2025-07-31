import { useEffect, useState } from "react";
import Header from '../components/Header/Header';
import CartItem from '../components/CartItem/CartItem'
import './Cart.css'
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";

function Cart() {
    const [cart, setCart] = useState([]);
    const total = cart.reduce((t, i) => t + i.price * i.qty, 0);
    const [reloadKey, setReloadKey] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const reloadPage = () => {
        setReloadKey(k => k + 1);
    };

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, [reloadKey]);

    return (
        <>
        <Header />
        <div className='cart-items'>
        {cart.map((item) => (
            <CartItem key={item.productId} itemData={item} reloadTrigger={reloadPage}/>
        ))}
        </div>
        <button className='checkout' onClick={() => setCheckout(!checkout)}>
        Checkout Now For A Total Of ${total}
        </button>
        {checkout && (
            <CheckoutForm/>
        )}
        </>
    );
}

export default Cart;