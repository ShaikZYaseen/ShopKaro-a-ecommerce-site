import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../thunks/ProductThunk.js';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '../Product/Card.jsx';
import "./Home.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

function Home() {
  const dispatch = useDispatch();
  const { products = [], status, error } = useSelector((state) => state.products.products);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [category, setCategory] = useState("");

  // Fetch products when minPrice, maxPrice, or category changes
  useEffect(() => {
    dispatch(fetchProducts({ minPrice, maxPrice, category }));
  }, [dispatch, minPrice, maxPrice, category]);

  // Handle changes in minPrice input
  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setMinPrice(value);
  };

  // Handle changes in maxPrice input
  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 50000;
    setMaxPrice(value);
  };

  // Handle category selection
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Home">
      <div className="Home-one">
        <p className='Home-one-line1'>Welcome to</p>
        <p className='Home-one-line2'>ShopKaro</p>
        <p className='Home-one-line3'>Shop Smarter, Live Better</p>
      </div>
      <div className="Home-two">
        <div className='Home-two-one'>
          <div className="input">
            <label htmlFor="minVal">Min Price</label>
            <input
              id="minVal"
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <label htmlFor="maxVal">Max Price</label>
            <input
              id="maxVal"
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          <h2>Categories</h2>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={category === cat ? 'selected' : ''}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
        <div className='Home-two-two'>
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product._id}
                productId={product._id}
                img={product.images[0].url}
                title={product.name}
                rating={product.rating}
                price={product.price}
              />
            ))
          ) : (
            <div className='loader'><h1>No products found!</h1></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
