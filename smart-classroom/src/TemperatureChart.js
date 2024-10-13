// TemperatureChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function TemperatureChart({ temperature }) {
  const normalizedTemp = ((temperature - 65) / (75 - 65)) * 100;

  const data = {
    datasets: [
      {
        data: [normalizedTemp, 100 - normalizedTemp],
        backgroundColor: ['#ff6384', '#dddddd'],
        hoverBackgroundColor: ['#ff6384', '#dddddd'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%',
    rotation: 270,
    circumference: 180,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div className="gauge-container">
      <Doughnut data={data} options={options} />
      <div className="gauge-text">{temperature}°F</div>
    </div>
  );
}

export default TemperatureChart;
