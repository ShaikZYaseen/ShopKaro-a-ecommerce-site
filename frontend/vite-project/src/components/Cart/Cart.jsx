import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Cart.css"

function Cart() {

    const navigate = useNavigate()


  return (
   <div className="cart">
    <h1>Shopping Cart</h1>
   </div>
  )
}

export default Cart