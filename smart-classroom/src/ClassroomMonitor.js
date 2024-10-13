// ClassroomMonitor.js
import React, { useState, useEffect } from 'react';
import './ClassroomMonitor.css';
import { getSensorData, getHistoricalData } from './sensorData';
import TemperatureCard from './TemperatureCard';
import AirQualityCard from './AirQualityCard';
import HumidityCard from './HumidityCard';
import LightingCard from './LightingCard';
import AnalyticsDashboard from './AnalyticsDashboard';

function ClassroomMonitor() {
  const [data, setData] = useState({
    temperature: 70,
    airQuality: 75,
    humidity: 40,
    lighting: 50,
  });

  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const initialData = getSensorData();
    setData(initialData);
    const history = getHistoricalData();
    setHistoricalData(history);
  }, []);

  // Update historical data whenever data changes
  useEffect(() => {
    setHistoricalData((prevData) => [...prevData, data]);
  }, [data]);

  // Voice Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [data]);

  const handleVoiceCommand = (command) => {
    console.log('Voice Command:', command);

    // Define action keywords and corresponding functions
    const actions = {
      increase: (property, amount = 1) => {
        setData((prevData) => {
          const newValue = Math.min(
            prevData[property] + amount,
            maxValues[property]
          );
          return { ...prevData, [property]: newValue };
        });
      },
      decrease: (property, amount = 1) => {
        setData((prevData) => {
          const newValue = Math.max(
            prevData[property] - amount,
            minValues[property]
          );
          return { ...prevData, [property]: newValue };
        });
      },
      set: (property, value) => {
        setData((prevData) => {
          const newValue = Math.min(
            Math.max(value, minValues[property]),
            maxValues[property]
          );
          return { ...prevData, [property]: newValue };
        });
      },
      adjust: (property, value) => {
        // 'Adjust' can be similar to 'set'
        setData((prevData) => {
          const newValue = Math.min(
            Math.max(value, minValues[property]),
            maxValues[property]
          );
          return { ...prevData, [property]: newValue };
        });
      },
      change: (property, value = null) => {
        // If value is provided, act like 'set', else toggle or default action
        if (value !== null) {
          setData((prevData) => {
            const newValue = Math.min(
              Math.max(value, minValues[property]),
              maxValues[property]
            );
            return { ...prevData, [property]: newValue };
          });
        } else {
          // Default action: increase by a default amount
          actions.increase(property);
        }
      },
    };

    // Define properties and their valid ranges
    const properties = {
      temperature: { min: 65, max: 75 },
      'air quality': { min: 50, max: 100 },
      humidity: { min: 30, max: 60 },
      lighting: { min: 10, max: 100 },
    };

    // Map of properties to their keys in the data object
    const propertyKeys = {
      temperature: 'temperature',
      'air quality': 'airQuality',
      humidity: 'humidity',
      lighting: 'lighting',
    };

    // Minimum and maximum values for each property
    const minValues = {
      temperature: 65,
      airQuality: 50,
      humidity: 30,
      lighting: 10,
    };

    const maxValues = {
      temperature: 75,
      airQuality: 100,
      humidity: 60,
      lighting: 100,
    };

    // Regular expression to match commands
    const commandRegex = new RegExp(
      `^(?<action>increase|decrease|set|adjust|change)\\s(?<property>temperature|air quality|humidity|lighting)(\\s(to|by)?\\s?(?<value>\\d+))?`
    );

    const match = command.match(commandRegex);

    if (match && match.groups) {
      const action = match.groups.action;
      const property = match.groups.property;
      const value = match.groups.value ? parseInt(match.groups.value, 10) : null;

      const propertyKey = propertyKeys[property];

      if (actions[action] && propertyKey) {
        if (value !== null) {
          actions[action](propertyKey, value);
        } else {
          actions[action](propertyKey);
        }
      }
    } else {
      console.log('Command not recognized:', command);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Smart Classroom Environment Monitor</h1>
      <p className="voice-command-info">
        Voice Control Active: Use commands like "Set temperature to 70" or "Adjust air quality to 80"
      </p>
      <div className="cards-container">
        <TemperatureCard data={data} setData={setData} />
        <AirQualityCard data={data} setData={setData} />
        <HumidityCard data={data} setData={setData} />
        <LightingCard data={data} setData={setData} />
      </div>
      <AnalyticsDashboard historicalData={historicalData} />
    </div>
  );
}

export default ClassroomMonitor;
