import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Explore SSRStyle Fashion – Your go-to spot for trendy and convenient shopping. We bring you the latest styles from around the world, connecting you with unique products and styles. Whether you're a shopper or a seller, SSRStyle makes fashion easy and accessible. Join us in embracing the simplicity and joy of modern shopping – where your style shines, and trends come to life!</p>
            <p>At SSRSTYLE Fashion, each item has its own special page with all the info you need – cool pictures, descriptions, and prices. It's like a mini-story for every product. Dive in and discover the fashion stories waiting for you!</p>
        </div>
    </div>
  )
}
export default  DescriptionBox;