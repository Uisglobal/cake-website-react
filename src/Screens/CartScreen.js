import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CartScreen = ({ onRemoveFromCart, onUpdateQuantity }) => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    // Call the fetchCartItems function when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      // Retrieve user ID from local storage
      const userId = localStorage.getItem('userId');

      if (userId) {
        // Make a GET request to fetch cart items for the user
        const response = await fetch(`http://localhost:4000/api/carts/${userId}`);
        if (response.ok) {
          // Parse the response data as JSON
          const data = await response.json();
          // Set the cart items in state
          setCart(data.products);

        } else {
          console.error('Failed to fetch cart items:', response.statusText);
        }
      } else {
        console.error('User ID not found in local storage.');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };


  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('setIsLoggedIn');
    setIsLoggedIn(loggedIn === "true");
  }, []);

  // Total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const userId = localStorage.getItem('userId');
      // Make a DELETE request to remove the item from the cart
      const response = await fetch(`http://localhost:4000/api/carts/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the item from the cart state
        setCart(cart.filter(item => item._id !== itemId));
        fetchCartItems();
        window.location.reload()
      } else {
        console.error('Failed to remove item from cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Total amount for all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

  return (
    <div className="cart-screen">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index}>
                <div className="cart-item">
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <label>
                      Quantity:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item, parseInt(e.target.value))}
                      />
                    </label>
                    <p>Total Price: ${calculateTotalPrice(item).toFixed(2)}</p> 
                    <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h3>Total Amount: ${calculateTotalAmount().toFixed(2)}</h3> 
            {isLoggedIn ? (
              <Link to="/checkout">
                <button>Checkout</button>
              </Link>
            ) : (
              <button onClick={() => alert('Please log in to proceed to checkout.')}>Checkout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
