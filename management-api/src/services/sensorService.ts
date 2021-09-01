import Sensor, { ISensor } from '../models/sensor';
import Plant from '../models/plant';
import User from '../models/user';
import {
  COLLECTION_ID_LENGTH,
  DefErrorMessages,
  returnSuccess,
  SFuncResponse,
  returnError,
} from '../utils/services';

export const MIN_SENSOR_NAME_LENGTH = 3;
export const MAX_SENSOR_NAME_LENGTH = 26;
export const DEVICE_NUMBER_LENGTH = 8;

export enum SensorErrorMessages {
  SensorNotFound = 'sensor/SENSOR_NOT_FOUND',
  PlantNotFound = 'sensor/PLANT_NOT_FOUND',
  DeviceNumberLengthNotValid = 'sensor/DEVICE_NUMBER_LENGTH_NOT_VALID',
  NameIsRequired = 'sensor/NAME_IS_REQUIRED',
  DeviceNumberIsRequired = 'sensor/DEVICE_NUMBER_IS_REQUIRED',
  PlantIdIsRequired = 'sensor/PLANT_ID_IS_REQUIRED',
  DeviceNumberInUse = 'sensor/DEVICE_NUMBER_IN_USE',
  SensorAssignedToDifferentUser = 'sensor/SENSOR_ASSIGNED_TO_DIFFERENT_USER',
}

/**
 * Finds all sensors in database that are assigned to logged in user
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @returns - sensor data or error
 */
export const getSensors = async (
  userId: string
): Promise<SFuncResponse<ISensor[]>> => {
  return Sensor.find({ user: userId })
    .populate('plant')
    .exec()
    .then(returnSuccess)
    .catch((error) => {
      console.error(error);
      return returnError(DefErrorMessages.InternalServerError);
    });
};

/**
 * Finds sensor in database that is connected with given plant id
 * @function
 * @param plantId - id of plant by which we want to find sensor
 * @returns - sensor data if the operation was successfull, else error
 */
export const getSensorByPlant = async (
  plantId: string
): Promise<SFuncResponse<ISensor[]>> => {
  return Sensor.find({ plant: plantId })
    .exec()
    .then(returnSuccess)
    .catch((error) => {
      console.error(error);
      return returnError(DefErrorMessages.InternalServerError);
    });
};

export interface AddSensorData {
  name?: string;
  deviceNumber?: string;
  plantId?: string;
}

/**
 * Ads sensor into the database that is assigned to logged in user
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @param sensorData - sensor data that must be provided by user in order to add new sensor into the database
 * @returns - sensor data if adding was successfull, else error
 */
export const addSensor = async (
  userId: string,
  sensorData: AddSensorData
): Promise<SFuncResponse<ISensor>> => {
  try {
    if (!sensorData.name?.length)
      return returnError(SensorErrorMessages.NameIsRequired);
    if (!sensorData.deviceNumber?.length)
      return returnError(SensorErrorMessages.DeviceNumberIsRequired);
    if (!sensorData.plantId?.length)
      return returnError(SensorErrorMessages.PlantIdIsRequired);
    if (sensorData.plantId.length !== COLLECTION_ID_LENGTH)
      return returnError(DefErrorMessages.InvalidIdLength);
    if (userId.length !== COLLECTION_ID_LENGTH)
      return returnError(DefErrorMessages.InvalidIdLength);

    const user = await User.findById(userId);
    if (!user) return returnError(DefErrorMessages.UserNotFound);

    const plant = await Plant.findById(sensorData.plantId);
    if (!plant) return returnError(SensorErrorMessages.PlantNotFound);

    const sensor = await new Sensor({
      name: sensorData.name,
      deviceNumber: sensorData.deviceNumber,
      user: user._id,
      plant: plant._id,
    }).save();
    await sensor.populate('user', 'name').execPopulate();
    await sensor.populate('plant').execPopulate();

    return returnSuccess(sensor);
  } catch (error) {
    console.error(error);
    if (error.code === 11000)
      return returnError(SensorErrorMessages.DeviceNumberInUse);
    return returnError(DefErrorMessages.InternalServerError);
  }
};

export interface UpdatableSensorData {
  name?: string;
  deviceNumber?: string;
  plantId?: string;
}

/**
 * Updates existing sensor in the database
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @param sensorId - id of sensor to be updated
 * @param sensorData - data consists of changes that user want to make
 * @returns - updated sensor data if operation was successfull, else error
 */
export const updateSensor = async (
  userId: string,
  sensorId: string,
  sensorData: UpdatableSensorData
): Promise<SFuncResponse<ISensor>> => {
  try {
    const sensor = await Sensor.findById(sensorId);
    if (!sensor) return returnError(SensorErrorMessages.SensorNotFound);

    const ifSensorIsAssignedToUser = await Sensor.find({
      user: userId,
      _id: sensorId,
    });

    if (ifSensorIsAssignedToUser.length === 0)
      return returnError(SensorErrorMessages.SensorAssignedToDifferentUser);

    if (sensorData.name) {
      if (sensorData.name.length < MIN_SENSOR_NAME_LENGTH)
        return returnError(DefErrorMessages.MinLengthExceeded);
      if (sensorData.name.length > MAX_SENSOR_NAME_LENGTH)
        return returnError(DefErrorMessages.MaxLengthExceeded);

      sensor.name = sensorData.name;
    }

    if (sensorData.deviceNumber) {
      if (sensorData.deviceNumber.length !== DEVICE_NUMBER_LENGTH)
        return returnError(SensorErrorMessages.DeviceNumberLengthNotValid);

      sensor.deviceNumber = sensorData.deviceNumber;
    }

    if (sensorData.plantId) {
      if (sensorData.plantId.length !== COLLECTION_ID_LENGTH)
        return returnError(DefErrorMessages.InvalidIdLength);

      const plant = await Plant.findById(sensorData.plantId);
      if (!plant) return returnError(SensorErrorMessages.PlantNotFound);

      sensor.plant = plant._id;
    }

    await sensor.save();
    await sensor.populate('plant').execPopulate();

    return returnSuccess(sensor);
  } catch (error) {
    console.error(error);
    return returnError(DefErrorMessages.InternalServerError);
  }
};

/**
 * Deletes sensor from the database
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @param sensorId - id of sensor to be deleted
 * @returns - true if deleting was successfull, else error
 */
export const deleteSensor = async (
  userId: string,
  sensorId: string
): Promise<SFuncResponse<boolean>> => {
  try {
    const deletedSensor = await Sensor.findByIdAndDelete(sensorId);
    if (!deletedSensor) return returnError(SensorErrorMessages.SensorNotFound);

    return returnSuccess(true);
  } catch (error) {
    console.error(error);
    return returnError();
  }
};
