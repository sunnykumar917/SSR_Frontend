import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and get the latest updates straight into your inbox.</p>
      <div>
        <input type="email" placeholder="Your email Id" />
        <button type="submit">Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
