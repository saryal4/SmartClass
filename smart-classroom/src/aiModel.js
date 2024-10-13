// aiModel.js
import * as tf from '@tensorflow/tfjs';

let model;

export async function trainModel(data) {
  const xs = tf.tensor2d(data.map((item) => [item.humidity, item.airQuality]));
  const ys = tf.tensor2d(data.map((item) => [item.temperature]));

  model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2] }));

  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  await model.fit(xs, ys, { epochs: 50 });
}

export async function predictTemperature(humidity, airQuality) {
  if (!model) {
    return null;
  }
  const input = tf.tensor2d([[humidity, airQuality]]);
  const prediction = model.predict(input);
  const predictedTemp = prediction.dataSync()[0];
  return predictedTemp;
}
