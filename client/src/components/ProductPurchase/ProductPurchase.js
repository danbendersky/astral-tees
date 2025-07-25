import './ProductPurchase.css';
import Quantity from './Quantity';
import Size from './Size';

function ProductPurchase({productData}) {
    
    return (
        <div className='product-bar'>
            <Quantity/>
            <Size/>
        </div>
    );
}

export default ProductPurchase;