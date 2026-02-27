import React, { forwardRef } from 'react';
import { 
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  Button,
  Divider
} from '@material-ui/core';
import { 
  Close as CloseIcon,
  LocationOn as LocationIcon,
  AttachMoney,
  Pool,
  Restaurant,
  Wifi,
  LocalParking,
  Pets,
  FitnessCenter,
  Phone,
  Language,
  AccessTime,
  Favorite,
  Share,
  // Star
} from '@material-ui/icons';
import RatingComponent from '../ui/Rating';
import './style.css';

const PlaceDetails = forwardRef(({ place, open, onClose }, ref) => {
  if (!place) return null;

  const imageUrl = place.photo?.images?.medium?.url || 
                  place.photo?.images?.large?.url ||
                  'https://via.placeholder.com/800x400?text=No+Image';

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'pool': return <Pool />;
      case 'spa': return <FitnessCenter />;
      case 'restaurant': return <Restaurant />;
      case 'wifi': return <Wifi />;
      case 'parking': return <LocalParking />;
      case 'pet friendly': return <Pets />;
      case 'gym': return <FitnessCenter />;
      default: return null;
    }
  };

  const amenities = ["Pool", "Restaurant", "WiFi", "Parking"];

  const getPriceLevel = () => {
    const priceLevel = place.price_level || '';
    if (!priceLevel) return '';
    return '$'.repeat(priceLevel.length || 1);
  };

  return (
    <Dialog 
      ref={ref}
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      className="place-details-dialog"
      scroll="paper"
      disableEnforceFocus
    >
      <DialogContent className="dialog-content">
        {/* Close Button */}
        <IconButton className="close-button" onClick={onClose}>
          <CloseIcon />
        </IconButton>

        {/* Header with Image */}
        <Box className="header-section">
          <CardMedia
            component="img"
            height="350"
            image={imageUrl}
            alt={place.name}
            className="hero-image"
          />
          <Box className="header-overlay">
            <Typography variant="h4" component="h1" className="place-title">
              {place.name}
            </Typography>
            <Box className="header-actions">
              <IconButton className="action-button"><Favorite /></IconButton>
              <IconButton className="action-button"><Share /></IconButton>
            </Box>
          </Box>
        </Box>

        {/* Location & Rating */}
        <Box className="info-section">
          <Box className="location-row">
            <LocationIcon className="info-icon" />
            <Typography variant="body1" className="location-text">
              {place.location_string || 
               `${place.address_obj?.street1 || ''}, ${place.address_obj?.city || ''}, ${place.address_obj?.country || ''}`}
            </Typography>
          </Box>

          <Box className="rating-row">
            <Box className="rating-box">
              <RatingComponent value={Number(place.rating) || 0} precision={0.5} readOnly />
              <Typography variant="body2" className="rating-text">
                {place.rating} ({place.num_reviews || 0} reviews)
              </Typography>
            </Box>
            {getPriceLevel() && (
              <Chip 
                icon={<AttachMoney />} 
                label={getPriceLevel()} 
                className="price-chip"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        <Divider className="divider" />

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column - Details */}
          <Grid item xs={12} md={8}>
            {place.description && (
              <Card className="detail-card">
                <CardContent>
                  <Typography variant="h6" component="h2" className="section-title">
                    About
                  </Typography>
                  <Typography variant="body1" className="description">
                    {place.description}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {place.cuisine && place.cuisine.length > 0 && (
              <Card className="detail-card">
                <CardContent>
                  <Typography variant="h6" component="h2" className="section-title">
                    Cuisine
                  </Typography>
                  <Box className="chips-container">
                    {place.cuisine.map((c, index) => (
                      <Chip 
                        key={index} 
                        label={c.name} 
                        className="cuisine-chip"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            <Card className="detail-card">
              <CardContent>
                <Typography variant="h6" component="h2" className="section-title">
                  Amenities
                </Typography>
                <Grid container spacing={2}>
                  {amenities.map((amenity, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Box className="amenity-item">
                        <Box className="amenity-icon">{getAmenityIcon(amenity)}</Box>
                        <Typography variant="body2">{amenity}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {place.ranking && (
              <Card className="detail-card">
                <CardContent>
                  <Typography variant="h6" component="h2" className="section-title">
                    Ranking
                  </Typography>
                  <Typography variant="body1" className="ranking-text">
                    {place.ranking}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Right Column - Contact */}
          <Grid item xs={12} md={4}>
            <Card className="contact-card">
              <CardContent>
                <Typography variant="h6" component="h2" className="section-title">
                  Contact
                </Typography>
                
                {place.phone && (
                  <Box className="contact-item">
                    <Phone className="contact-icon" />
                    <Typography variant="body2">
                      <a href={`tel:${place.phone}`}>{place.phone}</a>
                    </Typography>
                  </Box>
                )}
                
                {place.web_url && (
                  <Box className="contact-item">
                    <Language className="contact-icon" />
                    <Typography variant="body2">
                      <a 
                        href={place.web_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        TripAdvisor
                      </a>
                    </Typography>
                  </Box>
                )}

                {place.hours && (
                  <Box className="contact-item">
                    <AccessTime className="contact-icon" />
                    <Typography variant="body2">
                      Check hours on TripAdvisor
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            <Card className="action-card">
              <CardContent>
                <Typography variant="h6" component="h2" className="section-title">
                  {place.category?.key === 'restaurant' ? 'Make a Reservation' : 
                   place.category?.key === 'hotel' ? 'Book Your Stay' : 'Get Directions'}
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  className="primary-button"
                  size="large"
                  href={place.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {place.category?.key === 'restaurant' ? 'Reserve Table' : 
                   place.category?.key === 'hotel' ? 'Book Now' : 'View on TripAdvisor'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});

export default PlaceDetails;
