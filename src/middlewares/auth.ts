import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from '../types/custom-request';
import NotAuthorizedError from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

export default (req: CustomRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  console.log(token);

  if (!token) {
    next(new NotAuthorizedError('Необходима авторизация'));

    return;
  }

  const jwtSecret = process.env.JWT_SECRET as string;
  let payload;
  
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, jwtSecret) as { _id: mongoose.Types.ObjectId };
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new NotAuthorizedError('Необходима авторизация'));
    
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше

  // req.user = {
  //   // _id: '69329e91f82b944179a7ea29',
  //   _id: new mongoose.Types.ObjectId('69329e91f82b944179a7ea29'),
  // };

  // next();
};
