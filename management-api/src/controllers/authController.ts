import { Request, Response } from "express";
import * as authService from "../services/authService";
import { StatusCodes } from "http-status-codes";
import { UserData, UserLoginData } from "../services/authService";

export const postNewUser = async (
  req: Request<void, UserData>,
  res: Response
) => {
  const userRes = await authService.registerUser(req.body);
  if (userRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: userRes.error });
    return;
  }
  res.status(StatusCodes.OK).json(userRes.data);
};

interface LoginUserParams {
  email: string;
  password: string;
}

export const postRegisteredUser = async (
  req: Request<LoginUserParams, UserLoginData>,
  res: Response
) => {
  const userRes = await authService.loginUser(req.body);
  if (userRes.isError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: userRes.error });
    return;
  }
  res.status(StatusCodes.OK).json(userRes.data);
};

export const postValidateToken = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Authorized",
  });
};
