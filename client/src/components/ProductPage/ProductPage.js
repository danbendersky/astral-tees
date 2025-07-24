import './ProductPage.css'
import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import exit from '../../assets/exit.png';

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [productData, setProductData] = useState({});
  const pageReturn = () => {
    navigate(-1);
  };

  useEffect(() => {
    const query = new URLSearchParams();
    query.append('id', id);

    fetch(`/fetchproduct?${query.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log('data:', data);
            return data;
        })
        .then(data => setProductData(data));
  }, [id]);

  return (<div>
        <button className="exit-btn" onClick={pageReturn}>
            <img src={exit} alt="Exit" style={{
                width: "100%", 
                height: "100%",
                objectFit: "contain",
                display: "flex"
                }}/>
        </button>
        <h2 className="title">
          {productData.title}
        </h2>
        {productData.previewUrl && (
        <img
            className="cover"
            src={productData.previewUrl}
            alt={productData.name}
        />
        )}
        <div className="description-wrapper">
            <div className="product-description"
                dangerouslySetInnerHTML={{ __html: productData.description }}
            />
        </div>
    </div>
  );
}

export default ProductPage;