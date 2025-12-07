import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import { CustomRequest } from '../types/custom-request';

export const createCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user!._id;

  // if (!name || !link) {
  //   throw new BadRequestError('Переданы некорректные данные при создании карточки');
  // }
    // if (err.name == "ValidationError") {
    //     // направляем в блок next ошибку валидации
    //     next(err);
    // }

  return Card.create({ name, link, owner })
    .then((itemCard) => res.status(201).send(itemCard))
    // .catch((err) => next(err));
    .catch((err) => {
    if (err.name == "ValidationError") {
        // направляем в блок next ошибку валидации
        return next(new BadRequestError(err.message));
    }
    else {
        return next(err); //Непредвиденная ошибка
    }
  })
};

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({}).populate('owner')
  .then((cards) => res.send(cards))
  .catch((err) => next(err));

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.cardId;

  return Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      res.send(card);
    })
    .catch(next);
};

export const likeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.params!.cardId) {
    throw new BadRequestError('Переданы некорректные данные для постановки лайка');
  }

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user!._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      res.send(card);
    })
    .catch(next);
};

export const dislikeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.params!.cardId) {
    throw new BadRequestError('Переданы некорректные данные для снятия лайка');
  }

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user!._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      res.send(card);
    })
    .catch(next);
};
