// HumidityCard.js
import React from 'react';
import { motion } from 'framer-motion';

function HumidityCard({ data, setData }) {
  const handleHumidityChange = (e) => {
    setData({ ...data, humidity: Math.round(e.target.value) });
  };

  return (
    <motion.div
      className="control-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Humidity</h2>
      <div
        className="humidity-visual"
        aria-label={`Humidity is ${data.humidity}%`}
      >
        <div
          className="raindrop"
          style={{ height: `${data.humidity}%` }}
        ></div>
      </div>
      <div className="control-group">
        <label htmlFor="humidity-slider">
          Adjust Humidity ({data.humidity}%)
        </label>
        <input
          id="humidity-slider"
          type="range"
          min="30"
          max="60"
          value={data.humidity}
          onChange={handleHumidityChange}
          aria-valuemin="30"
          aria-valuemax="60"
          aria-valuenow={data.humidity}
          aria-label="Humidity slider"
        />
      </div>
    </motion.div>
  );
}

export default HumidityCard;
