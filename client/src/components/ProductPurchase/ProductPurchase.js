import { useEffect, useState } from 'react';
import './ProductPurchase.css';
import Quantity from './Quantity';
import Size from './Size';

function ProductPurchase({productData}) {
    const [quantity, changeQuantity] = useState(0);
    const [size, changeSize] = useState('Size');
    const [price, changePrice] = useState(1000.00);

    const handleQuantitySelect = (quantity) => {
        changeQuantity(quantity);
    }
    const handleSizeSelect = (size) => {
        changeSize(size);
    }

    const getPrice = () => {
        return 20;
    }

    useEffect(() => {
        changePrice(getPrice());
    }, []);

    const addToCart = () => {
        localStorage.setItem("cart", JSON.stringify([{ productId: productData.id, qty: quantity, size: size, price: price}]));
        let cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
    }

    return (
        <div className='section'>
        <div className='product-bar'>
            <div className='q-w'>
            <Quantity choose={handleQuantitySelect}/>
            </div>
            <div className='s-w'>
            <Size choose={handleSizeSelect}/>
            </div>
            <div className='p-w'>
            <div className='price'>Price: ${price.toFixed(2)}</div>
            </div>
        </div>
        <div className='c-w'>
        {(quantity !== 0 && size !== 'Size') &&
        <button className='cart-add' onClick={addToCart}>Add to cart</button>}
        </div>
        </div>
    );
}

export default ProductPurchase;