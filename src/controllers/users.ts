import { Request, Response } from 'express';
import User from '../models/user';

interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.userId;

  return User.findById(id)
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateUser = (req: CustomRequest, res: Response) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user!._id, { name, about }, { new: true })
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateAvatar = (req: CustomRequest, res: Response) => {
  const { avatar } = req.body;
  const id = req.user!._id;

  return User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
