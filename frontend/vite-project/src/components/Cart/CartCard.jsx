import React from 'react';
import "./CartCard.css";
import { useSelector,useDispatch } from 'react-redux';
import { removeCart } from '../../thunks/ProductThunk';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';

function CartCard({ item }) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleImageClick = () => {
        navigate(`/product/${item.productId._id}`);
      };

      const handleDeleteCart = () => {
        if (item.productId) {
            const form = {
                productId: item.productId._id
            };
            console.log(form)
            dispatch(removeCart(form));
        }
    };

  return (
    <div className="cardd">
       
      <div className='img'>
        <img src={item.productId.images[0].url} onClick={handleImageClick} alt={item.productId.name} />
      </div>
      <div className='content'>
        <h2>
          <div>{item.productId.name}</div>
          <div onClick={handleDeleteCart} ><DeleteIcon className='delete'  /></div>
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
