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
        //Fly animation logic
        const productImage = document.querySelector('.cover');
        const cartIcon = document.getElementById('cart-icon');
        const imgRect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        const flyingImage = productImage.cloneNode(true);
        flyingImage.classList.add('fly-image');
        flyingImage.style.top = imgRect.top + 'px';
        flyingImage.style.left = imgRect.left + 'px';
        document.body.appendChild(flyingImage);
        flyingImage.getBoundingClientRect();
        const deltaX = cartRect.left - imgRect.left;
        const deltaY = cartRect.top - imgRect.top;
        flyingImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
        flyingImage.style.opacity = '0.3';
        setTimeout(() => {
            flyingImage.remove();
            //Cart bounce
            cartIcon.classList.add('cart-bounce');
            cartIcon.addEventListener('animationend', () => {
                cartIcon.classList.remove('cart-bounce');
            }, { once: true });
        }, 800);

        //Cart bounce
        

        //Cookies
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const newItem = {
            productId: productData.id,
            qty: quantity,
            size: size,
            image: productData.previewUrl,
            name: productData.title,
            price: getPrice()
        };

        const existingItemIndex = cart.findIndex(item => 
            item.productId === newItem.productId && item.size === newItem.size
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].qty += newItem.qty;
        } else {
            cart.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
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