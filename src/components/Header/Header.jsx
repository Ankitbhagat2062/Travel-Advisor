import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase, 
  Box, 
  Chip,
//   IconButton,
  Paper
} from '@material-ui/core';
import { 
  Search as SearchIcon, 
  LocationOn as LocationIcon,
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
//   Attractions as AttractionsIcon,
  WbSunny as WeatherIcon
} from '@material-ui/icons';
import './style.css';

const Header = ({ onTypeChange, currentType, setCoordinates }) => {
  const [searchValue, setSearchValue] = useState('');

  const categories = [
    { name: 'restaurants', label: 'Restaurants', icon: <RestaurantIcon /> },
    { name: 'hotels', label: 'Hotels', icon: <HotelIcon /> },
    // { name: 'attractions', label: 'Attractions', icon: <AttractionsIcon /> }
    { name: 'attractions', label: 'Attractions', icon: <Paper /> }
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue) {
      // For now, we'll use a simple geocoding approach
      // In production, you'd use Google Geocoding API
      setCoordinates({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
    }
  };

  return (
    <div className="header-root">
      <AppBar position="static" className="header-appbar">
        <Toolbar className="header-toolbar">
          {/* Logo */}
          <Box className="logo-container">
            <LocationIcon className="logo-icon" />
            <Typography variant="h6" className="logo-text">
              Travel Advisor
            </Typography>
          </Box>

          {/* Search Bar */}
          <Paper className="search-paper">
            <Box className="search-container">
              <SearchIcon className="search-icon" />
              <InputBase
                placeholder="Search for places..."
                className="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleSearch}
              />
            </Box>
          </Paper>

          {/* Weather Widget */}
          <Box className="weather-widget">
            <WeatherIcon className="weather-icon" />
            <Box className="weather-info">
              <Typography variant="body2" className="weather-temp">
                72°F
              </Typography>
              <Typography variant="caption" className="weather-desc">
                New York
              </Typography>
            </Box>
          </Box>
        </Toolbar>

        {/* Category Filter Chips */}
        <Box className="category-chips">
          {categories.map((category) => (
            <Chip
              key={category.name}
              icon={category.icon}
              label={category.label}
              onClick={() => onTypeChange(category.name)}
              className={`category-chip ${currentType === category.name ? 'active' : ''}`}
              variant={currentType === category.name ? 'default' : 'outlined'}
              color={currentType === category.name ? 'primary' : 'default'}
            />
          ))}
        </Box>
      </AppBar>
    </div>
  );
};

export default Header;
