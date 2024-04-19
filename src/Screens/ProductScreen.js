import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

// const products = [
//   { id: 1, name: 'Fruit Cake', image: require('../assets/images/cake1.jpg'), description: 'Cake with fruit', price: 10.99 },
//   { id: 2, name: 'Cups Cake', image: require('../assets/images/cake2.jpg'), description: 'Vegan cup cakes 3 pic', price: 8.99 },
//   { id: 3, name: 'Cheese Cake', image: require('../assets/images/cake1.jpg'), description: 'Vegan fruit cake', price: 12.99 },
//   { id: 4, name: 'Cup Cake', image: require('../assets/images/cake2.jpg'), description: 'Cup cake 3 pic', price: 6.99 },
//   { id: 5, name: 'Party Cake', image: require('../assets/images/cake6.jpg'), description: 'Party cake', price: 16.99 },
//   { id: 6, name: 'Suger bun Cake', image: require('../assets/images/cake7.jpg'), description: 'Suger bun cake 3 pic', price: 6.99 },
//   { id: 7, name: '100g Cake', image: require('../assets/images/cake8.jpg'), description: '1 100g pic', price: 6.99 },
//   { id: 8, name: 'Club Cake', image: require('../assets/images/cake10.jpg'), description: 'Club cake', price: 16.99 },
// ];

const Product = ({ product, onSelectProduct, onAddToCart }) => {
const handleClick = () => {
  onSelectProduct(product);
};
  return (
    <div className="product" onClick={handleClick}>
      <img className="product-image" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <Link to={`/product/${product.id}`} className="nav-link button">View Details</Link>
    </div>
  );
};


const ProductPage = ({ products, onAddToCart }) => {
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = async (product) => {
    console.log("HandleSelect");
    console.log(product.id);
    localStorage.setItem('selectedProduct', product.id);

    setSelectedProduct(product);
  };

  return (
    <div className="container">
      <div className="app">
        <h1>Products</h1>
        <div className="products">
          {products.map((product) => (
            <div key={product.id}>
              <Product product={product} onSelectProduct={handleSelectProduct} onAddToCart={onAddToCart} />
              {/* <Link to={`/product/${product.id}`} className="nav-link button">View Details</Link> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
