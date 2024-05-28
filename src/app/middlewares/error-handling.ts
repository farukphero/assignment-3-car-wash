import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandle = (
  err: ZodError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err.message || 'Something went wrong!';

  return res.status(500).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandle;
