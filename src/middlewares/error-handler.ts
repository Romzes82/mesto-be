import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line max-len, import/prefer-default-export, no-unused-vars
export const errorHandler = async (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.name);
  res.status(500).send({ message: 'На сервере произошла ошибка' });
};
