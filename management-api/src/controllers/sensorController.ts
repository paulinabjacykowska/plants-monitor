import { AddSensorData, SensorErrorMessages } from '../services/sensorService';
import * as sensorService from '../services/sensorService';
import { DefErrorMessages } from '../utils/services';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { param } from 'express-validator';

export const getSensors = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const sensorsRes = await sensorService.getSensors(userId);
  if (sensorsRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: sensorsRes.error });
    return;
  }

  res.status(StatusCodes.OK).json(sensorsRes.data);
};

export const getSensorByPlant = async (req: Request, res: Response) => {
  const sensorRes = await sensorService.getSensorByPlant(req.params.id);
  if (sensorRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: sensorRes.error });
    return;
  }

  res.status(StatusCodes.OK).json(sensorRes.data);
};

export const postSensors = async (
  req: Request<any, AddSensorData>,
  res: Response
) => {
  const userId = res.locals.userId;
  const sensorRes = await sensorService.addSensor(userId, req.body);
  if (sensorRes.isError) {
    const status =
      sensorRes.error === DefErrorMessages.InternalServerError
        ? StatusCodes.INTERNAL_SERVER_ERROR
        : StatusCodes.UNPROCESSABLE_ENTITY;

    res.status(status).json({ message: sensorRes.error });
    return;
  }

  res.status(StatusCodes.OK).json(sensorRes.data);
};

export const putSensor = async (
  req: Request<any, AddSensorData>,
  res: Response
) => {
  const userId = res.locals.userId;
  const sensorRes = await sensorService.updateSensor(
    userId,
    req.params.id,
    req.body
  );
  if (sensorRes.isError) {
    const status =
      {
        [SensorErrorMessages.SensorNotFound]: StatusCodes.NOT_FOUND,
        [SensorErrorMessages.PlantNotFound]: StatusCodes.NOT_FOUND,
        [DefErrorMessages.MinLengthExceeded]: StatusCodes.UNPROCESSABLE_ENTITY,
        [DefErrorMessages.MaxLengthExceeded]: StatusCodes.UNPROCESSABLE_ENTITY,
        [DefErrorMessages.InvalidIdLength]: StatusCodes.UNPROCESSABLE_ENTITY,
      }[sensorRes.error] || StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(status).json({ message: sensorRes.error });
    return;
  }

  res.status(StatusCodes.OK).json(sensorRes.data);
};

export const deleteSensor = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const sensorRes = await sensorService.deleteSensor(userId, req.params.id);
  if (sensorRes.isError) {
    const status =
      SensorErrorMessages.SensorNotFound === sensorRes.error
        ? StatusCodes.NOT_FOUND
        : StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(status).json({ message: sensorRes.error });
    return;
  }

  res.status(StatusCodes.OK).json(sensorRes.data);
};
export const deleteSensorValidator = [param('id').isMongoId()];
