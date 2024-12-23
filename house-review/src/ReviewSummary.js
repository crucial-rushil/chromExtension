import React, { useState } from "react";
import { Box, Typography, LinearProgress, Rating, Card, CardContent } from "@mui/material";

const ReviewSummary = ({ totalReviews, starData, starAverage }) => {
    return (
        <Card sx={{ maxWidth: '100%', margin: '20px auto', padding: 2, borderRadius: 2 }}>
          <CardContent>
            {/* Customer Reviews Header */}
            <Typography variant="h6" component="h3" gutterBottom align="left">
              Customer Reviews
            </Typography>
    
            {/* Average Star Rating and Total Reviews */}
            <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
              <Rating value={starAverage} precision={0.5} readOnly />
              <Typography variant="body2" ml={1}>
                {starAverage} / 5
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={2}>
                {totalReviews.toLocaleString()} global ratings
              </Typography>
            </Box>
    
            {/* Star Ratings Bars */}
            <Box mt={2}>
              {starData.map((star, index) => (
                <Box display="flex" alignItems="center" mt={1} key={index}>
                  <Typography variant="body2" width="50px">{5 - index} star</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={star.percentage}
                    sx={{ flexGrow: 1, height: 10, mx: 2, borderRadius: 5, 
                      backgroundColor: '#a594f9',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#6d4ad6',  // Color for the filled part of the bar
                      },
                      '& .MuiLinearProgress-root': {
                        backgroundColor: '#a594f9',     // Color for the unfilled track
                      },
                      }}
                   />
                  <Typography variant="body2" width="40px">{star.percentage}%</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      );
};

export default ReviewSummary;
