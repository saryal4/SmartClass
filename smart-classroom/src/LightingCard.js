// LightingCard.js
import React from 'react';
import { motion } from 'framer-motion';

function LightingCard({ data, setData }) {
  const handleLightingChange = (e) => {
    setData({ ...data, lighting: Math.round(e.target.value) });
  };

  return (
    <motion.div
      className="control-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Lighting</h2>
      <div className="lighting-visual">
        <div
          className="brightness-bar"
          style={{
            width: `${data.lighting}%`,
            background: `rgba(255, 223, 0, ${data.lighting / 100})`,
          }}
          aria-label={`Lighting is at ${data.lighting}%`}
        ></div>
      </div>
      <div className="control-group">
        <label htmlFor="lighting-slider">
          Adjust Lighting ({data.lighting}%)
        </label>
        <input
          id="lighting-slider"
          type="range"
          min="10"
          max="100"
          value={data.lighting}
          onChange={handleLightingChange}
          aria-valuemin="10"
          aria-valuemax="100"
          aria-valuenow={data.lighting}
          aria-label="Lighting slider"
        />
      </div>
    </motion.div>
  );
}

export default LightingCard;
