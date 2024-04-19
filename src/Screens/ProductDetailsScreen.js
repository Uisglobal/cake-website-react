import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/ProductDetails.css';

const ProductDetailsPage = ({ onAddToCart }) => {
    const { productId } = useParams();
    const parsedProductId = parseInt(productId);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);




    useEffect(() => {
        // Retrieve the selected product ID from localStorage
        const selectedProductId = localStorage.getItem('selectedProduct');

        if (selectedProductId !== null && selectedProductId !== undefined) {
            // Construct the URL for the API call using the selected product ID
            const apiUrl = `http://localhost:4000/api/products/${selectedProductId}`;

            // Make a fetch request
            fetch(apiUrl)
                .then(response => {
                    if (response.ok) {
                        // Parse the JSON response
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    console.log('Retrieved product data:', data);
                    setProduct(data); 
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                });
        } else {
            console.log('No selected product ID found in localStorage.');
        }
    }, []); 

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        setQuantity(value);
    };
    const setIsLoggedIn = localStorage.getItem('setIsLoggedIn');



    const handleAddToCart = () => {
        if (setIsLoggedIn == "true") {
            onAddToCart(product, quantity);
            setAddedToCart(true); 

            // Call the cart API to update the user's cart
            const userId = localStorage.getItem('userId');
            if (userId) {
                const selectedProductId = localStorage.getItem('selectedProduct');

                const payload = {
                    products: [
                        {
                            productId: selectedProductId, // Update with the correct field name
                            quantity: quantity,
                            name : product.name,
                            image : product.image,
                            description: product.description,
                            price: product.price
                        }
                    ]
                };
                console.log(payload)


                fetch(`http://localhost:4000/api/carts/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                    .then(response => {
                        if (response.ok) {
                            console.log('Cart updated successfully.');
                        } else {
                            throw new Error('Failed to update cart.');
                        }
                    })
                    .catch(error => {
                        console.error('Error updating cart:', error);
                    });
            } else {
                console.error('User ID not found in local storage.');
            }
        } else {
            alert('Please log in to proceed to checkout.');
        }
    };


    // const handleAddToCart = () => {
    //     console.log(setIsLoggedIn);
    //     if (setIsLoggedIn == "true") {

    //       onAddToCart(product, quantity);
    //       setAddedToCart(true); // Product is added to the cart

    //     } else{
    //         alert('Please log in to proceed to checkout.');

    //     }
       
    // };

    const handleCheckout = () => {

       
          };

    return (
        <div className="container">
        {product ? (
          <div className="product-details">
            <div className="product-image-container">
              <img className="product-details-image" src={product.image} alt={product.name} />
            </div>
            <div className="product-details-container">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price per item: ${product.price.toFixed(2)}</p>
              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              {setIsLoggedIn ? (
                <button onClick={handleAddToCart}>Add to Cart</button>
              ) : (
                <button onClick={handleAddToCart}>Add to Cart</button>
              )}
              {addedToCart && <p className="success-message">Product added to cart</p>}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      
    );
};

export default ProductDetailsPage;
