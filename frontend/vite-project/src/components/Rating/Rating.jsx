import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Rating, IconButton } from '@mui/material';
import './Rating.css';
const CloseIcon = 'X'

const Ratingcom = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle the form submission here
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Review
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className="dialog-title">
          Add a Review
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className="close-button"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="rating-container">
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5}
            />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Ratingcom;
