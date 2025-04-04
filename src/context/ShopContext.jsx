import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // Initialize cart with default values
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    // Fetch all products when component mounts
    fetch("https://ssrstyle-user.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Fetch cart items if user is authenticated
    const fetchCartItems = async () => {
      try {
        if (localStorage.getItem('auth-token')) {
          const response = await fetch("https://ssrstyle-user.onrender.com/getcart", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
            },
            body: ""
          });
          if (!response.ok) {
            throw new Error("Failed to fetch cart items: " + response.statusText);
          }
          const data = await response.json();
          console.log("Cart items:", data);
          setCartItems(data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (itemId) => {
    // Update local cart state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1 // If prev[itemId] is undefined, default to 0
    }));
  
    // Check if user is authenticated
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      try {
        // Send request to server to add item to cart
        const response = await fetch('https://ssrstyle-user.onrender.com/addtocart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': authToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemId: itemId })
        });
        if (!response.ok) {
          throw new Error("Failed to add item to cart: " + response.statusText);
        }
        console.log(await response.text());
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  const removeFromCart = (itemId) => {
    // Update local cart state
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });

    // Check if user is authenticated
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      // Send request to server to remove item from cart
      fetch('https://ssrstyle-user.onrender.com/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: itemId }) // Ensure itemId is sent in the body
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove item from cart: " + response.statusText);
        }
        console.log("Item removed from cart successfully");
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error.message);
        // Revert the local state change if the request fails
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1
        }));
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
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
    removeFromCart
  };

  return (
    <>
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
    </>
  );
};

export default ShopContextProvider;
