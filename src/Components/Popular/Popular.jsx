import React, { useState, useEffect } from 'react'; // Importing useEffect from 'react'
import './Popular.css';
import Item from '../Items/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('https://ssrstylesbackend.onrender.com/popularinwomen')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch popular products');
        }
        return response.json();
      })
      .then((data) => setPopularProducts(data))
      .catch((error) => {
        console.error('Error fetching popular products:', error);
        // Handle error appropriately, e.g., show an error message to the user
      });
  }, []);



  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1><hr />
      <div className="popular-items">
        {popularProducts.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  );
}
export default Popular;
