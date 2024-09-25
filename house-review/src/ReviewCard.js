import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Rating, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const ReviewCard = ({ rating, date, reviewText }) => {

    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // Function to handle opening the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Function to toggle expanded state
    const handleExpandClick = () => {
        setExpanded((prev) => !prev);
    };
  return (
    <>
        <Card sx={{ maxWidth: 400, padding: 2, margin: '20px auto' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Rating and Date in the Upper Left */}
            <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Rating value={rating} readOnly precision={0.5} />
            <Typography variant="caption" color="text.secondary">
                {date}
            </Typography>
            </Box>
        </Box>

        {/* Review Body */}
        <CardContent>
            <Typography 
                align="left" 
                variant="body1" 
                color="text.primary"
                sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: expanded ? 'none' : 2, // limit to 3 lines
                    overflow: expanded ? 'visible' : 'hidden',
                    textOverflow: expanded ? 'none' : 'ellipsis',
                }}
                >
            {reviewText}
            </Typography>
            {/* {!expanded && (
                <Button size="small" onClick={handleExpandClick} sx={{ textTransform: 'none' }}>
                Read More
                </Button>
            )} */}
            <Button size="small" onClick={handleExpandClick} sx={{ textTransform: 'none' }}>
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
        </CardContent>
        </Card>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Full Review</DialogTitle>
        <DialogContent>
        <Typography variant="body1" color="text.primary">
            {reviewText}
        </Typography>
        </DialogContent>
        <Button onClick={handleClose} sx={{ margin: 2 }}>Close</Button>
        </Dialog>
    </>

  );
};

export default ReviewCard;
