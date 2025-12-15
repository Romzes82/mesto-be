import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

const ONE_WEEK = 3600000 * 24 * 7;

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      const token = user.generateToken();
      return res
        .status(201)
        .cookie('jwt', token, {
          maxAge: ONE_WEEK,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'The user has been created' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // направляем в блок next ошибку валидации
        return next(new BadRequestError(err.message));
      }

      if (err.name === 'MongooseError' && err.cause?.code === 11000) {
        // направляем в блок next ошибку конфликта
        return next(new ConflictError(err.message));
      }

      return next(err); // Непредвиденная ошибка
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = user.generateToken();
      return res
        .status(201)
        .cookie('jwt', token, {
          maxAge: ONE_WEEK,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Аутентификация успешно пройдена' });
    })
    .catch(next);
};

// eslint-disable-next-line no-unused-vars
export const logout = (_req: Request, res: Response, _next: NextFunction) => res
  .clearCookie('jwt', {
    //   maxAge: ONE_WEEK,
    httpOnly: true,
    //   sameSite: true,
  })
  .send({ message: 'Пользователь вышел' });
