import Plant, { IPlant } from '../models/plant';
import {
  COLLECTION_ID_LENGTH,
  DefErrorMessages,
  returnError,
  returnSuccess,
  SFuncResponse,
} from '../utils/services';
import User from '../models/user';

export const MIN_PLANT_NAME_LENGTH = 3;
export const MAX_PLANT_NAME_LENGTH = 26;
export const MIN_PLANT_AIR_HUMIDITY = 0;
export const MAX_PLANT_AIR_HUMIDITY = 100;
export const MIN_PLANT_SOIL_MOISTURE = 0;
export const MAX_PLANT_SOIL_MOISTURE = 100;
export const MIN_PLANT_AIR_TEMPERATURE = 0;
export const MAX_PLANT_AIR_TEMPERATURE = 40;
export const MIN_PLANT_LIGHT_LUMINOSITY = 0;
export const MAX_PLANT_LIGHT_LUMINOSITY = 100;
export const MIN_PLANT_CHLOROPHYLL_CONTENT = 0;
export const MAX_PLANT_CHLOROPHYLL_CONTENT = 100;

export enum PlantErrorMessages {
  NotFound = 'plant/PLANT_NOT_FOUND',

  NameLengthNotValid = 'plant/NAME_LENGTH_NOT_VALID',
  NameIsRequired = 'plant/NAME_IS_REQUIRED',
  NameInUse = 'plant/PLANT_NAME_IN_USE',
  PlantAssignedToDifferentUser = 'plant/PLANT_ASSIGNED_TO_DIFFERENT_USER',

  MinAirHumidityValueIsRequired = 'plant/MIN_AIR_HUMIDITY_VALUE_IS_REQUIRED',
  MaxAirHumidityValueIsRequired = 'plant/MAX_AIR_HUMIDITY_VALUE_IS_REQUIRED',
  MinSoilMoistureValueIsRequired = 'plant/MIN_SOIL_MOISTURE_VALUE_IS_REQUIRED',
  MaxSoilMoistureValueIsRequired = 'plant/MAX_SOIL_MOISTURE_VALUE_IS_REQUIRED',
  MinAirTemperatureValueIsRequired = 'plant/MIN_AIR_TEMPERATURE_VALUE_IS_REQUIRED',
  MaxAirTemperatureValueIsRequired = 'plant/MAX_AIR_TEMPERATURE_VALUE_IS_REQUIRED',
  MinLightLuminosityValueIsRequired = 'plant/MIN_LIGHT_LUMINOSITY_VALUE_IS_REQUIRED',
  MaxLightLuminosityValueIsRequired = 'plant/MAX_LIGHT_LUMINOSITY_VALUE_IS_REQUIRED',
  MinChlorophyllContentValueIsRequired = 'plant/MIN_CHLOROPHYLL_CONTENT_VALUE_IS_REQUIRED',
  MaxChlorophyllContentValueIsRequired = 'plant/MAX_CHLOROPHYLL_CONTENT_VALUE_IS_REQUIRED',

  AirHumidityValueNotInRange = 'plant/AIR_HUMIDITY_VALUE_NOT_IN_RANGE',
  SoilMoistureValueNotInRange = 'plant/SOIL_MOISTURE_VALUE_NOT_IN_RANGE',
  AirTemperatureValueNotInRange = 'plant/AIR_TEMPERATURE_VALUE_NOT_IN_RANGE',
  LightLuminosityValueNotInRange = 'plant/LIGHT_LUMINOSITY_VALUE_NOT_IN_RANGE',
  ChlorophyllContentValueNotInRange = 'plant/CHLOROPHYLL_CONTENT_VALUE_NOT_IN_RANGE',
}

/**
 * Finds plant with specific id in database
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @param plantId - id of plant that user are looking for
 * @returns - plant data if there was no error, or error
 */
export const getPlant = async (
  userId: string,
  plantId: string
): Promise<SFuncResponse<IPlant>> => {
  const plant = await Plant.findById(plantId);
  if (!plant || String(plant.user) !== userId) {
    console.log(plant);
    return returnError(PlantErrorMessages.NotFound);
  }
  await plant.populate('user', 'name').execPopulate();

  return returnSuccess(plant);
};

/**
 * Finds all plants in database that are assigned to logged in user
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @returns - array with all plants or error
 */
export const getPlants = async (
  userId: string
): Promise<SFuncResponse<IPlant[]>> => {
  return Plant.find({ user: userId })
    .exec()
    .then(returnSuccess)
    .catch((error) => {
      console.error(error);
      return returnError(DefErrorMessages.InternalServerError);
    });
};

export interface PlantData {
  name?: string;
  minAirHumidity?: number;
  maxAirHumidity?: number;
  minSoilMoisture?: number;
  maxSoilMoisture?: number;
  minAirTemp?: number;
  maxAirTemp?: number;
  minLightLuminosity?: number;
  maxLightLuminosity?: number;
  minChlorophyllContent?: number;
  maxChlorophyllContent?: number;
}

/**
 * Ads plant into the database that is assigned to logged in user
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @param plantData - plant data that must be provided by user in order to add new plant into the database
 * @returns - plant data if adding was successfull, else error
 */
export const addPlant = async (
  userId: string,
  plantData: PlantData
): Promise<SFuncResponse<IPlant>> => {
  try {
    if (!plantData.name?.length)
      return returnError(PlantErrorMessages.NameIsRequired);
    if (!plantData.minAirHumidity)
      return returnError(PlantErrorMessages.MinAirHumidityValueIsRequired);
    if (!plantData.maxAirHumidity)
      return returnError(PlantErrorMessages.MaxAirHumidityValueIsRequired);
    if (!plantData.minSoilMoisture)
      return returnError(PlantErrorMessages.MinSoilMoistureValueIsRequired);
    if (!plantData.maxSoilMoisture)
      return returnError(PlantErrorMessages.MaxSoilMoistureValueIsRequired);
    if (!plantData.minAirTemp)
      return returnError(PlantErrorMessages.MinAirTemperatureValueIsRequired);
    if (!plantData.maxAirTemp)
      return returnError(PlantErrorMessages.MaxAirTemperatureValueIsRequired);
    if (!plantData.minLightLuminosity)
      return returnError(PlantErrorMessages.MinLightLuminosityValueIsRequired);
    if (!plantData.maxLightLuminosity)
      return returnError(PlantErrorMessages.MaxLightLuminosityValueIsRequired);
    if (!plantData.maxChlorophyllContent)
      return returnError(
        PlantErrorMessages.MaxChlorophyllContentValueIsRequired
      );
    if (!plantData.minChlorophyllContent)
      return returnError(
        PlantErrorMessages.MinChlorophyllContentValueIsRequired
      );

    const user = await User.findById(userId);
    if (!user) return returnError(DefErrorMessages.UserNotFound);

    const plant = await new Plant({
      user: user._id,
      name: plantData.name,
      minAirHumidity: plantData.minAirHumidity,
      maxAirHumidity: plantData.maxAirHumidity,
      minSoilMoisture: plantData.minSoilMoisture,
      maxSoilMoisture: plantData.maxSoilMoisture,
      minAirTemp: plantData.minAirTemp,
      maxAirTemp: plantData.maxAirTemp,
      minLightLuminosity: plantData.minLightLuminosity,
      maxLightLuminosity: plantData.maxLightLuminosity,
      minChlorophyllContent: plantData.minChlorophyllContent,
      maxChlorophyllContent: plantData.maxChlorophyllContent,
    }).save();
    await plant.populate('user', 'name').execPopulate();

    return returnSuccess(plant);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) return returnError(PlantErrorMessages.NameInUse);
    return returnError(DefErrorMessages.InternalServerError);
  }
};

/**
 * Updates existing plant in the database
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @param plantId  - id of plant to be updated
 * @param plantData - data consists of changes that user want to make
 * @returns - updated plant data if operation was successfull, else error
 */
export const updatePlant = async (
  userId: string,
  plantId: string,
  plantData: PlantData
): Promise<SFuncResponse<IPlant>> => {
  try {
    const plant = await Plant.findById(plantId);
    if (!plant) return returnError(PlantErrorMessages.NotFound);

    const ifPlantIsAssignedToUser = await Plant.find({
      user: userId,
      _id: plantId,
    });

    if (ifPlantIsAssignedToUser.length === 0)
      return returnError(PlantErrorMessages.PlantAssignedToDifferentUser);

    if (plantData.name) {
      if (plantData.name.length < MIN_PLANT_NAME_LENGTH)
        return returnError(PlantErrorMessages.NameLengthNotValid);
      if (plantData.name.length > MAX_PLANT_NAME_LENGTH)
        return returnError(PlantErrorMessages.NameLengthNotValid);

      plant.name = plantData.name;
    }

    if (plantData.minAirHumidity) {
      if (plantData.minAirHumidity < MIN_PLANT_AIR_HUMIDITY)
        return returnError(PlantErrorMessages.AirHumidityValueNotInRange);
      if (plantData.minAirHumidity > MAX_PLANT_AIR_HUMIDITY)
        return returnError(PlantErrorMessages.AirHumidityValueNotInRange);

      plant.minAirHumidity = plantData.minAirHumidity;
    }

    if (plantData.maxAirHumidity) {
      if (plantData.maxAirHumidity < MIN_PLANT_AIR_HUMIDITY)
        return returnError(PlantErrorMessages.AirHumidityValueNotInRange);
      if (plantData.maxAirHumidity > MAX_PLANT_AIR_HUMIDITY)
        return returnError(PlantErrorMessages.AirHumidityValueNotInRange);

      plant.maxAirHumidity = plantData.maxAirHumidity;
    }

    if (plantData.minSoilMoisture) {
      if (plantData.minSoilMoisture < MIN_PLANT_SOIL_MOISTURE)
        return returnError(PlantErrorMessages.SoilMoistureValueNotInRange);
      if (plantData.minSoilMoisture > MAX_PLANT_SOIL_MOISTURE)
        return returnError(PlantErrorMessages.SoilMoistureValueNotInRange);

      plant.minSoilMoisture = plantData.minSoilMoisture;
    }

    if (plantData.maxSoilMoisture) {
      if (plantData.maxSoilMoisture < MIN_PLANT_SOIL_MOISTURE)
        return returnError(PlantErrorMessages.SoilMoistureValueNotInRange);
      if (plantData.maxSoilMoisture > MAX_PLANT_SOIL_MOISTURE)
        return returnError(PlantErrorMessages.SoilMoistureValueNotInRange);

      plant.maxSoilMoisture = plantData.maxSoilMoisture;
    }

    if (plantData.minAirTemp) {
      if (plantData.minAirTemp < MIN_PLANT_AIR_TEMPERATURE)
        return returnError(PlantErrorMessages.AirTemperatureValueNotInRange);
      if (plantData.minAirTemp > MAX_PLANT_AIR_TEMPERATURE)
        return returnError(PlantErrorMessages.AirTemperatureValueNotInRange);

      plant.minAirTemp = plantData.minAirTemp;
    }

    if (plantData.maxAirTemp) {
      if (plantData.maxAirTemp < MIN_PLANT_AIR_TEMPERATURE)
        return returnError(PlantErrorMessages.AirTemperatureValueNotInRange);
      if (plantData.maxAirTemp > MAX_PLANT_AIR_TEMPERATURE)
        return returnError(PlantErrorMessages.AirTemperatureValueNotInRange);

      plant.maxAirTemp = plantData.maxAirTemp;
    }

    if (plantData.minLightLuminosity) {
      if (plantData.minLightLuminosity < MIN_PLANT_LIGHT_LUMINOSITY)
        return returnError(PlantErrorMessages.LightLuminosityValueNotInRange);
      if (plantData.minLightLuminosity > MAX_PLANT_LIGHT_LUMINOSITY)
        return returnError(PlantErrorMessages.LightLuminosityValueNotInRange);

      plant.minLightLuminosity = plantData.minLightLuminosity;
    }

    if (plantData.maxLightLuminosity) {
      if (plantData.maxLightLuminosity < MIN_PLANT_LIGHT_LUMINOSITY)
        return returnError(PlantErrorMessages.LightLuminosityValueNotInRange);
      if (plantData.maxLightLuminosity > MAX_PLANT_LIGHT_LUMINOSITY)
        return returnError(PlantErrorMessages.LightLuminosityValueNotInRange);

      plant.maxLightLuminosity = plantData.maxLightLuminosity;
    }

    if (plantData.minChlorophyllContent) {
      if (plantData.minChlorophyllContent < MIN_PLANT_CHLOROPHYLL_CONTENT)
        return returnError(
          PlantErrorMessages.ChlorophyllContentValueNotInRange
        );
      if (plantData.minChlorophyllContent > MAX_PLANT_CHLOROPHYLL_CONTENT)
        return returnError(
          PlantErrorMessages.ChlorophyllContentValueNotInRange
        );

      plant.minChlorophyllContent = plantData.minChlorophyllContent;
    }

    if (plantData.maxChlorophyllContent) {
      if (plantData.maxChlorophyllContent < MIN_PLANT_CHLOROPHYLL_CONTENT)
        return returnError(
          PlantErrorMessages.ChlorophyllContentValueNotInRange
        );
      if (plantData.maxChlorophyllContent > MAX_PLANT_CHLOROPHYLL_CONTENT)
        return returnError(
          PlantErrorMessages.ChlorophyllContentValueNotInRange
        );

      plant.maxChlorophyllContent = plantData.maxChlorophyllContent;
    }

    await plant.save();
    return returnSuccess(plant);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) return returnError(PlantErrorMessages.NameInUse);
    return returnError(DefErrorMessages.InternalServerError);
  }
};

/**
 * Deletes plant from the database
 * @function
 * @param userId - id of logged in user, obtained from authorization token
 * @param plantId - id of plant to be deleted
 * @returns - true if deleting was successfull, else error
 */
export const deletePlant = async (
  userId: string,
  plantId: string
): Promise<SFuncResponse<boolean>> => {
  try {
    if (plantId.length !== COLLECTION_ID_LENGTH)
      return returnError(DefErrorMessages.InvalidIdLength);

    const ifPlantIsAssignedToUser = await Plant.find({
      user: userId,
      _id: plantId,
    });

    if (ifPlantIsAssignedToUser.length === 0)
      return returnError(PlantErrorMessages.PlantAssignedToDifferentUser);

    const deletedPlant = await Plant.findByIdAndDelete(plantId);
    if (!deletedPlant) return returnError(PlantErrorMessages.NotFound);
    return returnSuccess(true);
  } catch (error) {
    console.error(error);
    return returnError();
  }
};
