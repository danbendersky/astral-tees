import './Product.css';
import { useNavigate } from "react-router-dom";
import TransparentImage from '../TransparentImage/TransparentImage';

function Product({ productData }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${encodeURIComponent(productData.id)}`);
  }
  return (
    <button className="product-tile" onClick={handleClick}>
      <h2 style={{ 
        justifyContent: "center", 
        fontSize: "2rem", 
        marginBottom: "10px", 
        textAlign: "center",
        marginTop: 0
      }}>
        {productData.title}
      </h2>
      {productData.previewUrl && (
        <div style={{ width: "300px", height: "300px", position: "relative", overflow: "hidden", margin: "0 auto" }}>
          <TransparentImage
            src={productData.previewUrl}
            threshold={200}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(2px 2px 4px white)"
            }}
          />
        </div>
      )}
      {/* <div
        style={{
          fontSize: "0.85rem",
          overflow: "auto",
          flex: 1,
          minHeight: 0,
          textAlign: "center"
        }}
        dangerouslySetInnerHTML={{ __html: productData.description }}
      /> */}
    </button> 
  );
}

export default Product;
