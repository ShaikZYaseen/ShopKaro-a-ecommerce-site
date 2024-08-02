import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../thunks/ProductThunk';
import CartCard from './CartCard';

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.login);
  const { cart } = useSelector(state => state.showCart);

  const items = useMemo(() => cart?.cart.items, [cart]);

  useEffect(() => {
    if (user?.user) {
      dispatch(getCart());
    } else {
      navigate("/signup");
    }
  }, [user, dispatch, navigate]);

  if (!items) {
    return null;
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {items.map(item => (
        <CartCard key={item.productId._id} item={item} />
      ))}
    </div>
  );
}

export default Cart;
