import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartScreen from './Screens/CartScreen.js'; 
import Header from "./Component/Header.js";
import ProductPage from './Screens/ProductScreen.js';
import Checkout from './Screens/CheckoutScreen.js';
import Footer from './Component/Footer.js';
import ProductDetailsPage from './Screens/ProductDetailsScreen.js'; 
import LoginSignup from './Screens/LoginScreen.js';

import axios from 'axios'; 


// Products List
const products = [
  { id: 1, name: 'Fruit Cake', image: require('./assets/images/cake1.jpg'), description: 'Cake with fruit', price: 10.99 },
  { id: 2, name: 'Cups Cake', image: require('./assets/images/cake2.jpg'), description: 'Vegan cup cakes 3 pic', price: 8.99 },
  { id: 3, name: 'Cheese Cake', image: require('./assets/images/cake1.jpg'), description: 'Vegan fruit cake', price: 12.99 },
  { id: 4, name: 'Cup Cake', image: require('./assets/images/cake2.jpg'), description: 'Cup cake 3 pic', price: 6.99 },
  { id: 5, name: 'Party Cake', image: require('./assets/images/cake6.jpg'), description: 'Party cake', price: 16.99 },
  { id: 6, name: 'Suger bun Cake', image: require('./assets/images/cake7.jpg'), description: 'Suger bun cake 3 pic', price: 6.99 },
  { id: 7, name: '100g Cake', image: require('./assets/images/cake8.jpg'), description: '1 100g pic', price: 6.99 },
  { id: 8, name: 'Club Cake', image: require('./assets/images/cake10.jpg'), description: 'Club cake', price: 16.99 },
];

const App = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products');
        const transformedProducts = data.map(product => ({
          id: product._id, 
          name: product.name,
          image: product.image, 
          description: product.description,
          price: product.price 
        }));
        console.log('Transformed Products:', transformedProducts); // Add this line
        transformedProducts.forEach(product => {
          console.log('Id:', product.id);
          console.log('Name:', product.name);
          console.log('Image:', product.image);
          console.log('Description:', product.description);
          console.log('Price:', product.price);
          console.log('--------------------------');
        });
        setProducts(transformedProducts);

        let tmpArray = []
        for (var i = 0; i < transformedProducts.length; i++) {
            tmpArray.push(transformedProducts[i]);
            console.log(transformedProducts[i])
        }
        // products(tmpArray);



      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProducts();
  }, []);


  //Remove item from cart
  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCart = cart.filter(item => item !== itemToRemove);
    setCart(updatedCart);
  };

  //Add item into cart
  const handleAddToCart = (product, quantity) => {
    const existingCartItem = cart.find(item => item.product.id === product.id);
    
    if (existingCartItem) {
      const updatedCart = cart.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  //Update item into cart
  const handleUpdateQuantity = (item, newQuantity) => {
    const updatedCart = cart.map(cartItem =>
      cartItem === item ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCart(updatedCart);
  };


  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
        <Route path='/' element={<ProductPage products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartScreen cart={cart} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} />
        <Route path='/products' element={<ProductPage products={products} onAddToCart={handleAddToCart} />} />
        <Route path='/checkout' element={<Checkout cart={cart} />} />
        <Route path="/product/:productId" element={<ProductDetailsPage products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
