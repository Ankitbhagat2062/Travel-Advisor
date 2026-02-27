import React from 'react';
import { Star, StarBorder, StarHalf } from '@material-ui/icons';

const Rating = ({ value, precision = 1, readOnly = false, onChange, className = '' }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className={`star-filled ${className}`} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} className={`star-half ${className}`} />);
      } else {
        stars.push(<StarBorder key={i} className={`star-empty ${className}`} />);
      }
    }
    return stars;
  };

  return (
    <div className={`rating-wrapper ${className}`} onClick={!readOnly ? onChange : undefined}>
      {renderStars()}
    </div>
  );
};

export default Rating;
