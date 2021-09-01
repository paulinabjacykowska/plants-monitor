import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import { IUser } from '../models/user';

interface DecodedToken {
  id: string;
  name: string;
}

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (token) {
    let userId = '';
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as
      | DecodedToken
      | string;
    if (!(typeof decoded === 'string')) {
      userId = decoded.id;
      res.locals.userId = userId;
      next();
    } else {
      return res.status(404);
    }
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export const signJWT = (user: IUser) => {
  var timeSinchEpoch = new Date().getTime();
  var expirationTime =
    timeSinchEpoch + Number(config.SERVER_TOKEN_EXPIRETIME) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
  try {
    var token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      config.ACCESS_TOKEN_SECRET,
      {
        issuer: config.REFRESH_TOKEN_SECRET,
        algorithm: 'HS512',
        expiresIn: expirationTimeInSeconds,
      }
    );
    if (token) return { error: null, token: token };
    return { token: null };
  } catch (error) {
    return { error: error, token: null };
  }
};
