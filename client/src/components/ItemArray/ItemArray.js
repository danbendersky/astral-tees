import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

function ItemArray({ itemFilter }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("Client attempting fetch productList");
        fetch('/fetchallproducts')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Filter products based on itemFilter if provided
                const filteredProducts = itemFilter
                    ? (() => {
                        const scoredResults = data.products.map(product => {
                            const titleMatch = product.title.toLowerCase().includes(itemFilter);
                            const descMatch = product.description.toLowerCase().includes(itemFilter);
                            let score = 0;
                            if (titleMatch) score += 2;
                            if (descMatch) score += 1;
                            return { ...product, score };
                        }).filter(p => p.score > 0);
                        scoredResults.sort((a, b) => b.score - a.score);
                        return scoredResults;
                    })()
                    : data.products;
                setProducts(filteredProducts);
            })
            .catch(error => console.error("Error fetching products:", error));
        console.log("Client fetched productList");
    }, [itemFilter]);

    return (
        <div
            className="products"
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            {products.map(product => (
                <Product key={product.id} productData={product} />
            ))}
        </div>
    );
}

export default ItemArray;