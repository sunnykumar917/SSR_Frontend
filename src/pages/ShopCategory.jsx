// ShopCategory.jsx
import React, { useContext } from 'react';
import './css/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import dropdownIcon from '../Components/assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span>out of 36 Products
        </p>
        <div className="shopcategory-sort">
          Sort by: <img src={dropdownIcon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_products && all_products.length > 0 &&
          all_products
            .filter(item => props.category === item.category)
            .map(filteredItem => (
              <Item
                key={filteredItem.id}
                id={filteredItem.id}
                name={filteredItem.name}
                image={filteredItem.image}
                new_price={filteredItem.new_price}
                old_price={filteredItem.old_price}
              />
            ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
