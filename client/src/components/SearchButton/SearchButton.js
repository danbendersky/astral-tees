import { useNavigate } from 'react-router-dom';
import search from '../../assets/search.png';
import { useState } from 'react';

function SearchButton() {
    const [query, setQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                style={{
                cursor: 'pointer',
                width: '100%',
                height: '20%',
                objectFit: 'cover',
                maxWidth: '300px',
                maxHeight: '300px'
            }}
            />
            <img
                src={search}
                alt="Search"
                style={{
                cursor: 'pointer',
                width: 'auto',
                height: '80%',
                objectFit: 'contain',
            }}
                onClick={handleClick}
            />
        </div>
    );
};

export default SearchButton;