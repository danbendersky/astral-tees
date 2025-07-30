import Header from '../components/Header/Header';
import ItemArray from '../components/ItemArray/ItemArray';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    return (
    <>
        <Header />
        <ItemArray itemFilter={query} />
    </>
    );
};

export default SearchResults;