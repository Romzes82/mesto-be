import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import { CustomRequest } from '../types/custom-request';

// const { JWT_SECRET } = process.env;
const ONE_WEEK = 3600000 * 24 * 7;

export const getUsers = (_req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => next(err));

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;

  return User.findById(id)

    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.send(user);
    })
    .catch(next);
};

export const updateUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user!._id, { name, about }, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }

      return next(err);
    });
};

export const updateAvatar = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.user!._id;

  return User.findByIdAndUpdate(id, { avatar }, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }

      return next(err);
    });
};
