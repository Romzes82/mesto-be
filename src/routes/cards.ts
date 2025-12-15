import { Router } from 'express';
import {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import { validateCardBody, validateCardParams } from '../validators/cards';

const router = Router();
router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validateCardParams, deleteCard);
router.put('/:cardId/likes', validateCardParams, likeCard);
router.delete('/:cardId/likes', validateCardParams, dislikeCard);

export default router;
