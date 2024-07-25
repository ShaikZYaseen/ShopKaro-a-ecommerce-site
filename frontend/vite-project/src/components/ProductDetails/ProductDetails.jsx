import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../../thunks/ProductThunk';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import ME from "../../../Assets/ME.jpeg";
import Ratingcom from '../Rating/Rating';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetails, status, error } = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(fetchProductDetails({ id }));
    }, [dispatch, id]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = productDetails?.product?.images.map(item => item.url) || [];

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (images.length > 0 ? (prevIndex === 0 ? images.length - 1 : prevIndex - 1) : 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (images.length > 0 ? (prevIndex === images.length - 1 ? 0 : prevIndex + 1) : 0));
    };

    if (status === 'loading') {
        return <CircularProgress />;
    }

    if (status === 'failed') {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!productDetails?.product) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    const reviews = [
        { name: 'Shaik Yaseen', rating: 2.5, comment: 'superb product' },
        // Add more reviews dynamically if needed
    ];

    return (
        <div className='ProductDetails'>
            <div className="carousel-container">
                <button className="carousel-button prev-button" onClick={handlePrev}>❮</button>
                <div className="carousel-image-container">
                    <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
                </div>
                <button className="carousel-button next-button" onClick={handleNext}>❯</button>
            </div>
            <div className='ProductDetails-info'>
                <h1>{productDetails.product.name}</h1>
                <h2>About this item</h2>
                <p>{productDetails.product.description}</p>
                <p>Price:<span>₹{productDetails.product.price}</span></p>

                <Rating className='rating' name="half-rating" defaultValue={productDetails.product.ratings} precision={0.5} readOnly />
                <p className='stock'>Instock: <span className='stockcount'>{productDetails.product.Stock}</span></p>
                <div className='buttons'>
                    <button>Add to cart</button>
                    <button>Buy now</button>
                    <Ratingcom />
                </div>
            </div>

            <div className='reviews'>
                <h1>All reviews</h1>
                <div className='reviewdiv'>
                    {reviews.map((review, index) => (
                        <div key={index} className="review-display">
                            <Box mb={0.2}>
                                <span className='reviewbox'> <img src={ME} alt="profile" /> {review.name} <br /> </span>
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
            </div>
        </div>
    );
};

export default ProductDetails;
