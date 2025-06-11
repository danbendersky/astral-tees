import { useNavigate } from 'react-router-dom';
import astralLogo from '../../assets/astral-logo.png';

const Logo = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <img
            src={astralLogo}
            alt="Astral Logo"
            style={{
                cursor: 'pointer',
                width: 'auto',
                height: '100%',
                objectFit: 'contain',
            }}
            onClick={handleClick}
        />
    );
};

export default Logo;