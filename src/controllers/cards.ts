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
