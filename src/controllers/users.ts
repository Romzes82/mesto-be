import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import { CustomRequest } from '../types/custom-request';
import ConflictError from '../errors/conflict-error';

// const { JWT_SECRET } = process.env;
const ONE_WEEK = 3600000 * 24 * 7;

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // jwt.sign({ _id: user._id }, JWT_SECRET);
      const token = user.generateToken();
      console.log(token);
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

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      // return User.create({
      email, password: hash, name, about, avatar,
    }))
    // .then((user) => res.status(201).send(user))
    .then((user) => {
      // jwt.sign({ _id: user._id }, JWT_SECRET);
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
