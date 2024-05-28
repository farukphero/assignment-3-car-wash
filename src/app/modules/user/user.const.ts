import { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { Action } from './user.interface';

// Define the action map with the specific action keys
export const actionMap: Record<
  Action,
  (req: Request, res: Response, next: NextFunction) => Promise<void>
> = {
  card: userControllers.myCard,
  favorite: userControllers.myFavorite,
};

export const updateFunc = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { action } = req.params as { action: Action };
  const handler = actionMap[action];

  if (!handler) {
    res.status(400).send({ error: 'Invalid action' });
    return;
  }

  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

 
