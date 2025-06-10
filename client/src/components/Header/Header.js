import './Header.css';
import Logo from '../Logo/Logo.js'
import Cart from "../CartButton/CartButton.js"
import Search from '../SearchButton/SearchButton.js'

function Header() {
    return (
        <header>
            <div className='header-left'>
                <Logo />
            </div>
            <div className="header-right">
                <Cart />
                <Search />
            </div>
        </header>
    );
}

export default Header;