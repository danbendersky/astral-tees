import { useNavigate } from 'react-router-dom';
import cart from '../../assets/cart.png';

const Logo = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/cart');
    };
    return (
        <img
            src={cart}
            alt="Cart"
            style={{
                cursor: 'pointer',
                width: '10vw',
                maxWidth: '120px',
                height: 'auto'
            }}
            onClick={handleClick}
        />
    );
};

export default Logo;