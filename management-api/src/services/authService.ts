import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user';
import {
  DefErrorMessages,
  returnError,
  returnSuccess,
  SFuncResponse,
} from '../utils/services';
import { signJWT } from '../utils/jwt';

export enum UserErrorMessages {
  NotFound = 'user/USER_NOT_FOUND',
  UserWithThisEmailAlreadyExists = 'user/USER_WITH_THIS_EMAIL_ALREADY_EXISTS',
}

/**
 * Finds all registered users in database
 * @function
 * @returns -  Array consists of all users or error
 */
export const getUsers = (): Promise<SFuncResponse<IUser[]>> => {
  return User.find()
    .then(returnSuccess)
    .catch((error) => {
      console.error(error);
      return returnError(DefErrorMessages.InternalServerError);
    });
};

export interface UserData {
  name: string;
  password: string;
  email: string;
}

/**
 * Registers new user
 * @function
 * @param userData - data that must be provided for registering new user
 * @returns - if registeration was successfull - new user data and authorization token, else error
 */
export const registerUser = async (
  userData: UserData
): Promise<SFuncResponse<{ user: IUser; token: string }>> => {
  try {
    if (await User.findOne({ email: userData.email })) {
      return returnError(UserErrorMessages.UserWithThisEmailAlreadyExists);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await new User({
      name: userData.name,
      password: hashedPassword,
      email: userData.email,
    }).save();

    let token = signJWT(user);
    if (token.token) return returnSuccess({ user: user, token: token.token });
    return returnError(DefErrorMessages.InternalServerError);
  } catch (error) {
    console.error(error);
    return returnError(DefErrorMessages.InternalServerError);
  }
};

export interface UserLoginData {
  email: string;
  password: string;
}

/**
 * Authenticate and login existing user
 * @function
 * @param userLoginData - data that must be provided for authenticate and login user into his account
 * @returns - if login was successfull - user data and authentication token, else error
 */
export const loginUser = async (
  userLoginData: UserLoginData
): Promise<SFuncResponse<{ user: IUser; token: string }>> => {
  try {
    const user = await User.findOne({ email: userLoginData.email });
    if (!user) return returnError(UserErrorMessages.NotFound);
    const isPasswordMatching = await bcrypt.compare(
      userLoginData.password,
      user.password
    );
    if (isPasswordMatching) {
      let token = signJWT(user);
      if (token.token) return returnSuccess({ user: user, token: token.token });
    } else {
      return returnError(UserErrorMessages.NotFound);
    }
    return returnError(DefErrorMessages.InternalServerError);
  } catch (error) {
    console.error(error);
    return returnError(DefErrorMessages.InternalServerError);
  }
};
