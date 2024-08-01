import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getCart } from '../../thunks/ProductThunk'
import "./Cart.css"

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();




  const {user} = useSelector(state => state.login); // Adjust based on your actual state structure

  useEffect(() => {
    if (user&&user.user) {
     
      dispatch(getCart());
    }else{
      navigate("/signup")
    }
  }, [user, dispatch]);

    


  return (
   <div className="cart">
    <h1>Shopping Cart</h1>
   </div>
  )
}

export default Cart