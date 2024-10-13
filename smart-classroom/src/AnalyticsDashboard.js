// AnalyticsDashboard.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function AnalyticsDashboard({ historicalData }) {
  // Generate timestamps for the data
  const dataWithTime = historicalData.map((item, index) => ({
    ...item,
    time: index,
  }));

  return (
    <div className="analytics-dashboard">
      <h2>Environmental Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataWithTime}>
          <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
          <Line type="monotone" dataKey="humidity" stroke="#387908" />
          <Line type="monotone" dataKey="airQuality" stroke="#8884d8" />
          <Line type="monotone" dataKey="lighting" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsDashboard;
