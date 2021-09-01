import Reading from '../models/reading';
import Sensor from '../models/sensor';

export interface ReadingInput {
  deviceNumber?: string;
  airHumidity?: number | null;
  soilMoisture?: number | null;
  airTemperature?: number | null;
  lightLuminosity?: number | null;
  chlorophyllContent?: number | null;
}

/**
 * Adds new readings into the database
 * @param readingData - One sensor reading from the RabbitMQ queue
 * @returns {boolean} - Whether reading was successfully save in database
 */
export const addReading = async (
  readingData: ReadingInput
): Promise<boolean> => {
  if (
    !readingData.deviceNumber ||
    readingData.airHumidity === undefined ||
    readingData.soilMoisture === undefined ||
    readingData.airTemperature === undefined ||
    readingData.lightLuminosity === undefined ||
    readingData.chlorophyllContent === undefined
  ) {
    return false;
  }
  const sensor = await Sensor.findOne({
    deviceNumber: readingData.deviceNumber,
  });
  if (!sensor) return false;
  const reading = new Reading({
    ...readingData,
    sensor: sensor._id,
  });
  await reading.save();
  return true;
};
