import './ProductPage.css'
import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from 'lucide-react';
import ProductPurchase from '../ProductPurchase/ProductPurchase';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

    fetch(`${BASE_URL}/fetchproduct?${query.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log('data:', data);
            return data;
        })
        .then(data => setProductData(data));
  }, [id]);

  return (<div>
        <button className="exit-btn" onClick={pageReturn}>
            <X className='x' size='100%' style={{display: 'flex'}}/>
        </button>
        <h2 className="title">
          {productData.title}
        </h2>
        <div style={{display: "flex", flexDirection: "horizontal"}}>
        {productData.previewUrl && (
        <div className='cover-wrapper'>
            <img
                className="cover"
                src={productData.previewUrl}
                alt={productData.title}
            />
        </div>
        )}
        <div className="description-wrapper">
            <div className="product-description"
                dangerouslySetInnerHTML={{ __html: productData.description }}
            />
        </div>
        <ProductPurchase className='purchase' productData={productData}/>
        </div>
    </div>
  );
}

export default ProductPage;