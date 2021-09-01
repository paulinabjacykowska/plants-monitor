import * as plantService from "../services/plantService";
import { PlantData } from "../services/plantService";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const getPlant = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const plantRes = await plantService.getPlant(userId, req.params.id);

  if (plantRes.isError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: plantRes.error });
    return;
  }
  res.status(StatusCodes.OK).json(plantRes.data);
};

export const getPlants = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const plantsRes = await plantService.getPlants(userId);

  if (plantsRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: plantsRes.error });
    return;
  }
  res.status(StatusCodes.OK).json(plantsRes.data);
};

export const postPlant = async (
  req: Request<any, PlantData>,
  res: Response
) => {
  const userId = res.locals.userId;
  const plantRes = await plantService.addPlant(userId, req.body);
  if (plantRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: plantRes.error });
    return;
  }
  res.status(StatusCodes.OK).json(plantRes.data);
};

export const putPlant = async (req: Request<any, PlantData>, res: Response) => {
  const userId = res.locals.userId;
  const plantRes = await plantService.updatePlant(
    userId,
    req.params.id,
    req.body
  );
  if (plantRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: plantRes.error });
    return;
  }
  res.status(StatusCodes.OK).json(plantRes.data);
};

export const deletePlant = async (
  req: Request<any, PlantData>,
  res: Response
) => {
  const userId = res.locals.userId;
  const plantRes = await plantService.deletePlant(userId, req.params.id);
  if (plantRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: plantRes.error });
  }
  res.status(StatusCodes.OK).json(plantRes.data);
};
