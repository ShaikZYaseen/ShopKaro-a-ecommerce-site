import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, fetchProductDetails } from '../../thunks/ProductThunk';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import ME from '../../../Assets/ME.jpeg';
import RatingCom from '../Rating/Rating';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productDetails, status, error } = useSelector(state => state.productDetails);
    const cart = useSelector(state => state.cart.cart);
    
    let qty = 0; 

    if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart')).cart;
        const item = cart.items.find((ele) => ele.productId === id);
    
        if (item) {
            qty = item.quantity;
        }
    }
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityError, setQuantityError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState('');
    
    const images = productDetails?.product?.images.map(item => item.url) || [];
    const reviews = productDetails?.product?.reviews || [];

    useEffect(() => {
        dispatch(fetchProductDetails({ id }));
    }, [dispatch, id]);

    const handleCartClick = async () => {
        // Check if quantity exceeds stock
        if (qty > productDetails.product.Stock) {
            setQuantityError('Quantity exceeds stock.');
            return;
        }

        const form = { productId: id }; // Only include productId, not quantity

        try {
            const resultAction = await dispatch(addCart(form));
            if (addCart.fulfilled.match(resultAction)) {
                setNotification('Product added to cart successfully');
            } else {
                setNotification('Failed to add product to cart');
            }
        } catch (error) {
            setNotification('An error occurred');
        }
    };

    useEffect(() => {
        if (notification) {
            // Clear notification after 1 second
            const timer = setTimeout(() => setNotification(''), 1000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

   
    const handleQuantityChange = (event) => {
        const value = Number(event.target.value);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
            setQuantityError('Quantity cannot be less than 1.');
        } else if (value > productDetails.product.Stock) {
            setQuantity(productDetails.product.Stock);
            setQuantityError('Quantity exceeds stock.');
        } else {
            setQuantity(value);
            setQuantityError('');
        }
    };

    const handleIncrement = () => {
        if (quantity < productDetails.product.Stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
            setQuantityError('');
        } else {
            setQuantityError('Quantity exceeds stock.');
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            setQuantityError('');
        } else {
            setQuantityError('Quantity cannot be less than 1.');
        }
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (images.length > 0 ? (prevIndex === 0 ? images.length - 1 : prevIndex - 1) : 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (images.length > 0 ? (prevIndex === images.length - 1 ? 0 : prevIndex + 1) : 0));
    };

    useEffect(() => {
        // Retrieve notification from local storage if it exists
        const savedNotification = localStorage.getItem('notification');
        if (savedNotification) {
            setNotification(savedNotification);
            localStorage.removeItem('notification'); // Clear notification after retrieval
        }
    }, []);

    if (status === 'loading') {
        return <CircularProgress />;
    }

    if (status === 'failed') {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!productDetails?.product) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    return (
        <div className='ProductDetails'>
            <div className="carousel-container">
                <button 
                    className="carousel-button prev-button" 
                    onClick={handlePrev} 
                    aria-label="Previous image"
                >
                    ❮
                </button>
                <div className="carousel-image-container">
                    {images.length > 0 && (
                        <img 
                            src={images[currentIndex]} 
                            alt={`Slide ${currentIndex + 1}`} 
                            className="carousel-image" 
                        />
                    )}
                </div>
                <button 
                    className="carousel-button next-button" 
                    onClick={handleNext} 
                    aria-label="Next image"
                >
                    ❯
                </button>
            </div>
            <div className='ProductDetails-info'>
                <h1>{productDetails.product.name}</h1>
                <h2>About this item</h2>
                <p>{productDetails.product.description}</p>
                <p>Price:<span>₹{productDetails.product.price}</span></p>

                <Rating 
                    className='rating' 
                    name="half-rating" 
                    value={productDetails.product.ratings} 
                    precision={0.5} 
                    readOnly 
                />
                <p className='stock'>
                    In stock: <span className='stockcount'>{productDetails.product.Stock}</span>
                </p>
                <p className='qtyp'>
                  Quantity:  
                    <button onClick={handleDecrement} className='qty-button'>-</button>
                    <input 
                        onChange={handleQuantityChange} 
                        value={quantity} 
                        className='qty' 
                        type="number" 
                        min="1" 
                    />
                    <button onClick={handleIncrement} className='qty-button'>+</button>
                </p>
                {quantityError && <Alert severity="error">{quantityError}</Alert>}
                <div className='buttons'>
                    <button onClick={handleCartClick}>Add to cart</button>
                    <button>Buy now</button>
                    <RatingCom id={id}/>
                </div>
                {notification && <Alert severity="success">{notification}</Alert>}
            </div>

            <div className='reviews'>
                <h1 className='reviewh'>All reviews</h1>
                {reviews.length === 0 ? (
                    <Typography variant="h6">No reviews!</Typography>
                ) : (
                    <div className='reviewdiv'>
                        {reviews.map((review, index) => (
                            <div key={index} className="review-display">
                                <Box mb={0.2}>
                                    <span className='reviewbox'>
                                        <img src={ME} alt="profile" /> {review.name} <br />
                                    </span>
                                    <Rating
                                        name="rating-display"
                                        value={review.rating}
                                        readOnly
                                        precision={0.5}
                                    />
                                </Box>
                                {review.comment}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
