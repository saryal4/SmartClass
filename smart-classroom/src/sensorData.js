// sensorData.js
export const getSensorData = () => {
    return {
      temperature: Math.round(Math.random() * (75 - 65) + 65),
      airQuality: Math.round(Math.random() * (100 - 50) + 50),
      humidity: Math.round(Math.random() * (60 - 30) + 30),
      lighting: Math.round(Math.random() * (100 - 10) + 10),
    };
  };
  
  // Mock function to get historical data
  export const getHistoricalData = () => {
    // Generate random historical data for demonstration
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push(getSensorData());
    }
    return data;
  };
  