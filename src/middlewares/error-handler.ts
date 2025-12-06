import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/custom-error';

const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeError());
  }

  return res.status(500).send('На сервере произошла ошибка');
};

export default errorHandler;
