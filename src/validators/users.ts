import { celebrate, Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';

export const validateUserBodyUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }).or('name', 'about') // хотя бы одно поле должно быть передано
    .messages({
      'object.missing': 'Должно быть передано хотя бы одно поле для обновления: name или about',
    }),
});

export const validateAvatarBodyUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .uri() // валидация URL
      .messages({
        'string.uri': 'Поле avatar должно быть валидным URL',
        'any.required': 'Поле avatar обязательно для заполнения',
      }),
  }),
});

export const validateUserParams = celebrate({
  [Segments.PARAMS]: {
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        // Проверяем, что это валидный ObjectId
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'ObjectId validation')
      .messages({
        'any.invalid': 'Некорректный формат идентификатора пользователя',
        'string.empty': 'Идентификатор пользователя не может быть пустым',
        'any.required': 'Идентификатор пользователя обязателен',
      }),
  },
});
