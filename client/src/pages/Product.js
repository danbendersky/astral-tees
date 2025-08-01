import ProductPage from '../components/ProductPage/ProductPage';
import Header from '../components/Header/Header'
import './Product.css'

const Product = () => (
    <>
        <Header/>
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div className="product-card">
                <ProductPage/>
            </div>
        </div>
    </>
);

export default Product;