// Breadcrumbs.jsx
import React from 'react';
import './Breadcrums.css';  // Corrected file name
import arrowIcon from '../assets/breadcrum_arrow.png';  // Corrected image path

const Breadcrumbs = (props) => {
  const { product } = props;

  if (!product) {
    return (
      <div className='breadcrumbs'>
        HOME
      </div>
    );
  }

  return (
    <div className='breadcrumbs'>
      HOME <img src={arrowIcon} alt="" /> SHOP <img src={arrowIcon} alt="" />{product.category} <img src={arrowIcon} alt=""/> {product.name}
    </div>
  );
}

export default Breadcrumbs;
