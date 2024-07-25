import React from 'react'
import Rating from '@mui/material/Rating';
import { Typography } from '@mui/material';
import ME from "../../../Assets/ME.jpeg"
import {Link} from "react-router-dom"
import "./Card.css"

// const card = {
//   img : ME,
//   title:"Polo shirt",
//   rating :"3.5",
//   price :"20000"
// }

function Card({img,title,rating,price,productId}) {
  return (
    <>
    
    <div className="card">
      <Link to={`/product/${productId}`} className='cardLink'>
   <img src={img} alt="Example" />
   <h3>{title}</h3>
   <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <Rating name="read-only" value={rating} precision={0.5} readOnly /><span>(10)</span>
   </div>
   <span>₹{price}/-</span>
   </Link>
   </div>
    </>
  )
}

export default Card