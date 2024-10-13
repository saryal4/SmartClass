// TemperatureCard.js
import React from 'react';
import { motion } from 'framer-motion';
import TemperatureChart from './TemperatureChart';

function TemperatureCard({ data, setData }) {
  const handleTemperatureChange = (e) => {
    setData({ ...data, temperature: Math.round(e.target.value) });
  };

  return (
    <motion.div
      className="control-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Temperature</h2>
      <TemperatureChart temperature={data.temperature} />
      <div className="control-group">
        <label htmlFor="temperature-slider">
          Adjust Temperature ({data.temperature}°F)
        </label>
        <input
          id="temperature-slider"
          type="range"
          min="65"
          max="75"
          value={data.temperature}
          onChange={handleTemperatureChange}
          aria-valuemin="65"
          aria-valuemax="75"
          aria-valuenow={data.temperature}
          aria-label="Temperature slider"
        />
      </div>
    </motion.div>
  );
}

export default TemperatureCard;
