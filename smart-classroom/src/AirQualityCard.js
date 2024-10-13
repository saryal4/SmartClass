// AirQualityCard.js
import React from 'react';
import { motion } from 'framer-motion';

function AirQualityCard({ data, setData }) {
  const handleAirQualityChange = (e) => {
    setData({ ...data, airQuality: Math.round(e.target.value) });
  };

  const airQualityStatus =
    data.airQuality > 85 ? 'Good' : data.airQuality > 65 ? 'Moderate' : 'Poor';

  return (
    <motion.div
      className="control-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Air Quality</h2>
      <div
        className={`radial-chart ${airQualityStatus.toLowerCase()}`}
        aria-label={`Air quality is ${airQualityStatus}`}
      >
        {data.airQuality}
      </div>
      <div className="control-group">
        <label htmlFor="airquality-slider">
          Adjust Air Quality ({data.airQuality})
        </label>
        <input
          id="airquality-slider"
          type="range"
          min="50"
          max="100"
          value={data.airQuality}
          onChange={handleAirQualityChange}
          aria-valuemin="50"
          aria-valuemax="100"
          aria-valuenow={data.airQuality}
          aria-label="Air quality slider"
        />
      </div>
    </motion.div>
  );
}

export default AirQualityCard;
