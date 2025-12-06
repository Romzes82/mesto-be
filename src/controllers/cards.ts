import { Request, Response } from 'express';
import Card from '../models/card';

interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

// eslint-disable-next-line import/prefer-default-export
export const createCard = (req: CustomRequest, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user!._id;

  // const card = req.body;
  // card.owner = req.user!._id;

  // console.log(req.user!._id);
  return Card.create({ name, link, owner })
    .then((itemCard) => res.send(itemCard))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getCards = (req: Request, res: Response) => Card.find({}).populate('owner')
  .then((cards) => res.send(cards))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export const deleteCard = (req: Request, res: Response) => {
  const id = req.params.cardId;

  return Card.findByIdAndDelete(id)
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const likeCard = (req: CustomRequest, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user!._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export const dislikeCard = (req: CustomRequest, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user!._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

// => {
//   const { avatar } = req.body;
//   const id = req.user!._id;

//   return User.findByIdAndUpdate(id, { avatar }, { new: true })
//     .then((users) => res.send(users))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки
