import * as readingService from '../services/readingService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getReadings = async (req: Request, res: Response) => {
  const readingsRes = await readingService.getReadings(req.params.id);
  if (readingsRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: readingsRes.error });
  }
  res.status(StatusCodes.OK).json(readingsRes.data);
};
