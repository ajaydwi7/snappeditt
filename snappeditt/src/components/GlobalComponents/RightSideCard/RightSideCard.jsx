import React from 'react';
import './RightSideCard.css';
import { CircleCheck, CircleX } from "lucide-react";

const RightSideCard = ({ title, description, price, features, addToCartBtn, moreBtn }) => {
  return (
    <div className="right-side-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <h4>{price}</h4>
      <a className='add-to-cart' href={addToCartBtn}>Add to Cart</a>
      <ul className="features-list">
        {features.map((feature, index) => (
          <li key={index}>
            <span className='pr-1'>{feature.included ? <CircleCheck className='text-green-500' /> : <CircleX className='text-primaryRed' />}</span> {feature.name}
          </li>
        ))}
      </ul>
      <a href={moreBtn} className="more-details">More Details</a>
    </div>
  );
};

export default RightSideCard;
