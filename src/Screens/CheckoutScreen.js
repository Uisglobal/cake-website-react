import React, { useState } from 'react';
import '../Styles/Checkout.css';

const Checkout = ({ cart }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Additional validation logic for each field can be added here

    // Proceed with submitting the form if validation passes
    const newData = {
      ...formData,
      cart: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price.toFixed(2),
      })),
    };

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // Reset the form
        setSubmittedData([...submittedData, newData]);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
        });
        setErrorMessage('');
        const userId = localStorage.getItem('userId');

        await fetch(`http://localhost:4000/api/carts/${userId}`, {
          method: 'DELETE',
        });
      } else {
        console.error('Failed to place order:', response.status);
      }
    } catch (error) {
      console.error('Error occurred while placing order:', error);
    }
  };

  const calculateTotalCartValue = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="personal-info">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            ZIP Code:
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="card-info">
          <label>
            Card Number:
            <input
              type="number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            CVV:
            <input
              type="number"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div className="cart-details">
          <h3>Cart Details</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <p>{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <p>Total Cart Value: ${calculateTotalCartValue().toFixed(2)}</p>
        </div>
        <button type="submit" className="submit-button">
          Submit Payment
        </button>
      </form>
      {/* Error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* Success message */}
      {submittedData.length > 0 && (
        <div className="success-message">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
