import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function SearchButton() {
    const [query, setQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="search-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right'}}>
            <div
                className="search-button"
                style={{
                    height: '70%',
                    aspectRatio: '1 / 1',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    setShowSearch((prev) => !prev);
                    if (!showSearch && query) {
                        navigate(`/search?query=${encodeURIComponent(query)}`);
                    }
                }}
            >
                <Search color='white' size='100%' style={{display: 'flex'}}/>
            </div>

            {showSearch && (
                <div
                    className={`search-input-wrapper ${showSearch ? 'active' : ''}`}
                    ref={inputRef}
                >
                    <input
                        type="text"
                        className="search-input"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search..."
                        autoFocus
                        onKeyDown={(e) => {if(e.key === 'Enter') navigate(`/search?query=${encodeURIComponent(query)}`);}}
                    />
                </div>
            )}
        </div>
    );
}
export default SearchButton;