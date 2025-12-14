import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';
// import { CustomRequest } from '../types/custom-request';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user!._id;

  // console.log(owner);
  return Card.create({ name, link, owner })
    .then((itemCard) => res.status(201).send(itemCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // направляем в блок next ошибку валидации
        return next(new BadRequestError(err.message));
      }

      return next(err); // Непредвиденная ошибка
    });
};

export const getCards = (_req: Request, res: Response, next: NextFunction) => Card.find({}).populate('owner')
  .then((cards) => res.send(cards))
  .catch((err) => next(err));

// Оставил для себя) 
// export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
//   const id = req.params.cardId;
//   const ownerId = req.user!._id;

//   return Card.findByIdAndDelete(id)
//     .then((card) => {
//       if (!card) {
//         // Карточка не найдена ИЛИ не принадлежит пользователю
//         // Проверяем, существует ли вообще такая карточка
//         return Card.findById(id).then((existingCard) => {
//           if (!existingCard) {
//             throw new NotFoundError("Карточка с указанным _id не найдена");
//           } else {
//             throw new ForbiddenError(
//               "Недостаточно прав для удаления этой карточки"
//             );
//           }
//         });
//       }
//       res.send(card);
//     })
//     .catch(next);
// };

// красивее синтаксис async/await
export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cardId = req.params.cardId;
    const userId = req.user!._id;

    // Находим карточку
    const card = await Card.findById(cardId);
    
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    // Проверяем владельца
    if (card.owner.toString() !== userId.toString()) {
      throw new ForbiddenError('Недостаточно прав для удаления этой карточки');
    }

    // Удаляем
    const deletedCard = await Card.findByIdAndDelete(cardId);
    res.send(deletedCard);
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line max-len
export const likeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
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
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError(`Переданы некорректные данные для постановки лайка: ${err.message}`));
    }

    return next(err);
  });

// eslint-disable-next-line max-len
export const dislikeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
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
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError(`Переданы некорректные данные для снятия лайка: ${err.message}`));
    }

    return next(err);
  });
