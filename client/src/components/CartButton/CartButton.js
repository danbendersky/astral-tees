import { useNavigate } from 'react-router-dom';
import cart from '../../assets/cart.png';

const Logo = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/cart');
    };
    return (
        <img
            id='cart-icon'
            src={cart}
            alt="Cart"
            style={{
                cursor: 'pointer',
                width: 'auto',
                height: '100%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease'
            }}
            onClick={handleClick}
        />
    );
};

export default Logo;