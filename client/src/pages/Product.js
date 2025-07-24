import ProductPage from '../components/ProductPage/ProductPage';
import Header from '../components/Header/Header'
import './Product.css'

const Product = () => (
    <>
        <Header/>
        <div className="product-card">
            <div>
                <ProductPage/>
            </div>
        </div>
    </>
);

export default Product;