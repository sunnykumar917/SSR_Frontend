import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach(product => {
    cart[product.id] = 0; // Initialize cart for each product
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [error, setError] = useState(null); // For managing errors

  useEffect(() => {
    // Fetch all products when component mounts
    fetch("https://ssrstyle-user.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        setCartItems(getDefaultCart(data)); // Initialize cart after products are fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Fetch cart items if user is authenticated
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetchCartItems(authToken);
    }
  }, []);

  const fetchCartItems = async (authToken) => {
    try {
      const response = await fetch("https://ssrstyle-user.onrender.com/getcart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'auth-token': authToken,
        },
        body: ""
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart items: " + response.statusText);
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
      return updatedCart;
    });

    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      try {
        const response = await fetch('https://ssrstyle-user.onrender.com/addtocart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': authToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemId })
        });
        if (!response.ok) {
          throw new Error("Failed to add item to cart: " + response.statusText);
        }
        console.log(await response.text());
      } catch (error) {
        setError("Error adding to cart: " + error.message); // Set error if the request fails
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });

    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('https://ssrstyle-user.onrender.com/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to remove item from cart: " + response.statusText);
          }
          console.log("Item removed from cart successfully");
        })
        .catch((error) => {
          console.error("Error removing item from cart:", error.message);
          setCartItems((prev) => {
            const updatedCart = { ...prev };
            updatedCart[itemId] = (updatedCart[itemId] || 0) + 1; // Revert cart state change if failed
            return updatedCart;
          });
          setError("Error removing from cart: " + error.message); // Set error message on failure
        });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_products: allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    error // Include error in context to provide feedback to components
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      {error && <div className="error">{error}</div>} {/* Display error message if any */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
