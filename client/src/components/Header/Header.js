import './Header.css';
import astralLogo from '../../astral-logo.png';

function Header() {
    return(
        <header className="header">
            <img src={astralLogo} alt="Astral Logo"></img>

        </header>
    );
}

export default Header;