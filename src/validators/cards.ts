import { celebrate, Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';

export const validateCardBody = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  },
});

export const validateCardParams = celebrate({
  [Segments.PARAMS]: {
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        // Проверяем, что это валидный ObjectId
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'ObjectId validation')
      .messages({
        'any.invalid': 'Некорректный формат идентификатора карточки',
        'string.empty': 'Идентификатор карточки не может быть пустым',
        'any.required': 'Идентификатор карточки обязателен',
      }),
  },
});

// celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().uri(),
//   }),
// }),

//  celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string()
//         .required()
//         .custom(validateObjectId, 'ObjectId validation')
//         .messages({
//           'any.invalid': 'Некорректный формат идентификатора карточки',
//           'any.required': 'Идентификатор карточки обязателен',
//         }),
//     }),
//   }),
