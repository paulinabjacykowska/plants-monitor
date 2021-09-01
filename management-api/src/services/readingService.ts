import Reading, { IReading } from '../models/reading';
import {
  DefErrorMessages,
  returnError,
  returnSuccess,
  SFuncResponse,
} from '../utils/services';

/**
 * Finds readings that are assigned to specific sensor id
 * @function
 * @param sensorId - id of sensor which readings we want to get
 * @returns - array with all the readings that are assigned to chosen sensor or error
 */
export const getReadings = async (
  sensorId: string
): Promise<SFuncResponse<IReading[]>> => {
  return Reading.find({ sensor: sensorId })
    .sort({ createdAt: -1 })
    .limit(50)
    .exec()
    .then(returnSuccess)
    .catch((error) => {
      console.error(error);
      return returnError(DefErrorMessages.InternalServerError);
    });
};
