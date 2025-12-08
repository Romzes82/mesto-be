import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import { CustomRequest } from '../types/custom-request';

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
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // направляем в блок next ошибку валидации
        return next(new BadRequestError(err.message));
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

// export const updateUser = (req: CustomRequest, res: Response, next: NextFunction) => {
//   const { name, about } = req.body;

//   // if (!name || !about) {
//   //   throw new BadRequestError('Переданы некорректные данные при обновлении профиля');
//   // }
//    const c = new mongoose.Types.ObjectId('693487c3b33d8662679725d41_')
//   //  req.user!._id

//   return User.findByIdAndUpdate(c, { name, about }, {  runValidators: true, new: true })
//   // .orFail(
//   //   () => new NotFoundError('Пользователь с таким id не найден')
//   // )
//     // .then((user) => res.send(user))
//     .then((user) => {
//       console.log(user)
//       if (!user) {
//         // throw new NotFoundError('Нет пользователя с таким id');
//         console.log('нет пользователя')
//         // throw new NotFoundError('Нет пользователя с таким id');
//         // return Promise.reject(new NotFoundError('Нет пользователя с таким id'));
//         return next(new NotFoundError('Нет пользователя с таким id'));
//       }

//       res.send(user)})
//     .catch((err) => {
//     if (err.name == "ValidationError") {
//         // направляем в блок next ошибку валидации
//         return next(new BadRequestError(err.message));
//     }
//     // else if (err instanceof NotFoundError) {
//     //   return next(err);
//     // } else {
//     //   return next(err);
//     // }
//     else {
//         return next(err); //Непредвиденная ошибка
//     }
//   })
//     // .then((user) => {
//     //   if (!user) {
//     //     throw new NotFoundError('Нет пользователя с таким id');
//     //   }

//     //   res.send(user);
//     // })
//     // .catch(next);
// };

export const updateAvatar = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.user!._id;

  // if (avatar) {
  //   throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
  // }

  // return User.findByIdAndUpdate(id, { avatar }, { new: true })
  //   .then((user) => {
  //     if (!user) {
  //       throw new NotFoundError('Нет пользователя с таким id');
  //     }

  //     res.send(user);
  //   })
  //   .catch(next);

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
