import React from 'react';
import "./CartCard.css";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';

function CartCard({ item }) {
    
    const navigate = useNavigate();


    const handleImageClick = () => {
        navigate(`/product/${item.productId._id}`);
      };

  return (
    <div className="cardd">
       
      <div className='img'>
        <img src={item.productId.images[0].url} onClick={handleImageClick} alt={item.productId.name} />
      </div>
      <div className='content'>
        <h2>
          <div>{item.productId.name}</div>
          <div><DeleteIcon /></div>
        </h2>
        <p>{item.productId.description}</p>
        <p>Qty: <span className='qty'>{item.quantity}</span></p>
        <Rating 
          className='rating' 
          name="half-rating" 
          value={item.productId.ratings} 
          precision={0.5}
          style={{ fontSize: '2rem' }} 
          readOnly 
        />
        <p>MRP: <span className='price'>₹{item.productId.price}</span></p>
      </div>
          </div>
    
  );
}

export default CartCard;
