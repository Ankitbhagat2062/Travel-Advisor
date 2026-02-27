import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  // Rating,
  Chip,
  Grid
} from '@material-ui/core';
import { 
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  // Attractions as AttractionsIcon,
  Hotel
} from '@material-ui/icons';
import RatingComponent from '../ui/Rating';
import Skeleton from '../ui/Skeleton';
import './style.css';

const PlaceCard = ({ place, onClick, isSelected }) => {
  if (!place) return null;

  const imageUrl = place.photo?.images?.medium?.url || 
                  place.photo?.images?.large?.url ||
                  'https://via.placeholder.com/300x200?text=No+Image';

  const getCategoryIcon = () => {
    const category = place.category?.key || place.ranking_category || '';
    if (category.includes('restaurant')) return <RestaurantIcon />;
    if (category.includes('hotel')) return <HotelIcon />;
    // return <AttractionsIcon />;
    return <Hotel />;
  };

  const getCuisine = () => {
    if (place.cuisine && place.cuisine.length > 0) {
      return place.cuisine.slice(0, 2).map(c => c.name).join(', ');
    }
    return '';
  };

  const getPriceLevel = () => {
    const priceLevel = place.price_level || '';
    if (!priceLevel) return '';
    return '$'.repeat(priceLevel.length || 1);
  };

  return (
    <Card 
      className={`place-card ${isSelected ? 'selected' : ''}`} 
      onClick={() => onClick(place)}
    >
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={place.name}
        className="place-image"
      />
      <CardContent className="place-card-content">
        <Box className="place-header">
          <Typography variant="h6" className="place-name" noWrap>
            {place.name}
          </Typography>
          <Box className="place-category-icon">
            {getCategoryIcon()}
          </Box>
        </Box>

        <Box className="place-location">
          <LocationIcon className="location-icon" />
          <Typography variant="body2" className="location-text" noWrap>
            {place.location_string || place.address_obj?.city || 'Unknown location'}
          </Typography>
        </Box>

        <Box className="place-rating">
          <RatingComponent value={Number(place.rating) || 0} precision={0.5} readOnly />
          <Typography variant="body2" className="review-count">
            ({place.num_reviews || 0})
          </Typography>
        </Box>

        {getCuisine() && (
          <Typography variant="body2" className="cuisine" noWrap>
            {getCuisine()}
          </Typography>
        )}

        {getPriceLevel() && (
          <Chip 
            icon={<MoneyIcon />} 
            label={getPriceLevel()} 
            size="small" 
            className="price-chip"
            variant="outlined"
          />
        )}

        {place.ranking && (
          <Typography variant="caption" className="ranking">
            {place.ranking}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const List = ({ places, loading, childClicked, onPlaceClick, onPlaceSelect }) => {
  if (loading) {
    return (
      <Box className="list-container">
        <Typography variant="h6" className="list-title">
          Explore Nearby Places
        </Typography>
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Box className="skeleton-card">
                <Skeleton variant="rectangular" height={180} className="skeleton-image" />
                <Box className="skeleton-content">
                  <Skeleton variant="text" height={28} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Skeleton variant="text" height={20} width="40%" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!places || places.length === 0) {
    return (
      <Box className="list-container empty-list">
        <Typography variant="h6" className="list-title">
          Explore Nearby Places
        </Typography>
        <Box className="empty-message">
          <Typography variant="body1">
            No places found in this area.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try exploring a different location on the map.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="list-container">
      <Typography variant="h6" className="list-title">
        Explore Nearby Places ({places.length})
      </Typography>
      <Grid container spacing={2}>
        {places.map((place) => (
          <Grid item xs={12} key={place.location_id}>
            <PlaceCard 
              place={place} 
              onClick={(p) => {
                onPlaceClick(p);
                onPlaceSelect(p);
              }}
              isSelected={childClicked === place.location_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default List;
