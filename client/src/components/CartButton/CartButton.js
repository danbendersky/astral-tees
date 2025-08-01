import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Logo = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/cart');
    };
    return (
        <div
        id="cart-icon"
        style={{
            cursor: 'pointer',
            width: 'auto',
            height: '100%',
            aspectRatio: '1 / 1',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'right',
        }}
        onClick={handleClick}
        >
            <ShoppingCart color="white" size='70%'style={{display: 'flex'}}/>
        </div>
    );
};

export default Logo;