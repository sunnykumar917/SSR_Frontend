import React from 'react';
import './Footer.css';
import footer_logo from '../assets/logo_big.png';
import instagram_icon from '../assets/instagram_icon.png';
import whatsapp_icon from '../assets/whatsapp_icon.png'; // Add the file extension
import pintester_icon from '../assets/pintester_icon.png'; // Change backslashes to forward slashes

export const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SSRStyles</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
      <div className="footer-social-icon">
        <div className='footer-icon-container'>
          <img src={instagram_icon} alt="" />
        </div>
        <div className='footer-icon-container'>
          <img src={pintester_icon} alt="" />
        </div>
        <div className='footer-icon-container'>
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
  <hr />
  <p className="copyright-text">Copyright @ 2024 All Right Reserved</p>
</div>


    </div>
  );
};
export default Footer