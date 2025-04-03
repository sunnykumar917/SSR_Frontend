// CartItem.jsx
import React, { useContext } from 'react';
import './CartItem.css';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';

export const CartItem = () => {
  const { getTotalCartAmount ,all_products, cartItems, removeFromCart } = useContext(ShopContext);

  if (!all_products) {
    return <p>Loading...</p>;
  }

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id} className="cartitems-format cartitems-format-main">
              <img className="carticon-product-icon" src={e.image} alt="" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className='cartitems-quantity'>{cartItems[e.id]}</button>
              <p>${e.new_price * cartItems[e.id]}</p>
              <img className='cartitem-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="remove" />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Sub Total: ${/* Add specific property from cartItems here */}</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Order Total: ${/* Add specific property from cartItems here */}</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>Proceed To CheckOut</button>
        </div>
            <div className="cartitems-promocode">
                <p>Have a promo code? , Enter it Here</p>
                <div className="cartitems-promobox">
                    <input type="text" name="" id="" placeholder='Promo Code' />
                    <button>Apply Promo Code</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartItem;
