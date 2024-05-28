import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import { StatusCodes } from 'http-status-codes';
import { TUser } from './user.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successful!',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<TUser> = req.body;

  const result = await UserServices.loginUserWithDB(user as TUser);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful!',
    data: result,
  });
});
const myCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, id } = req.body;

    const result = await UserServices.myCardProducts(token, id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const myFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, id } = req.body;

    const result = await UserServices.myFavoriteProducts(token, id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createUser,
  loginUser,
  myCard,
  myFavorite,
};
