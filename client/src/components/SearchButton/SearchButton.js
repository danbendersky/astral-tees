import { useNavigate } from 'react-router-dom';
import search from '../../assets/search.png';
import { useState } from 'react';

function SearchButton() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                style={{
                    marginRight: '8px',
                    padding: '6px 10px',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    // Make input width dynamic: 2x the image width (20vw, max 240px)
                    width: '40vw',
                    maxWidth: '240px',
                    minWidth: '80px',
                    flexShrink: 1
                }}
            />
            <img
                src={search}
                alt="Search"
                style={{
                    cursor: 'pointer',
                    width: '10vw',
                    maxWidth: '120px',
                    minWidth: '40px',
                    height: 'auto'
                }}
                onClick={handleClick}
            />
        </div>
    );
};

export default SearchButton;