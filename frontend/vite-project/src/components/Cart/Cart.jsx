import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../thunks/ProductThunk';
import CartCard from './CartCard';

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.login);
  const { cart, status, error } = useSelector(state => state.showCart); // Assuming you have status and error in your state

  const [loading, setLoading] = useState(true);
  const items = useMemo(() => cart?.cart.items, [cart]);

  useEffect(() => {
    if (user?.user) {
      dispatch(getCart())
        .finally(() => setLoading(false)); // Set loading to false once the dispatch completes
    } else {
      navigate("/signup");
    }
  }, [user, dispatch, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {error && <p className="error">{error}</p>}
      {items.length > 0 ? (
        items.map(item => (
          <CartCard key={item.productId._id} item={item} />
        ))
      ) : (
        <h2 className='cartline'>Your cart is empty!</h2>
      )}
    </div>
  );
}

export default Cart;
