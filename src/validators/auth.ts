import { celebrate, Joi, Segments } from 'celebrate';

export const validateUserBodyCreation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.email': 'Неверный формат email',
        'any.required': 'Поле "email" обязательно для заполнения',
        'string.empty': 'Поле "email" не может быть пустым',
      }),
    
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        'string.min': 'Пароль должен содержать минимум {#limit} символов',
        'any.required': 'Поле "password" обязательно для заполнения',
        'string.empty': 'Поле "password" не может быть пустым',
      }),
    
    name: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - {#limit} символа',
        'string.max': 'Максимальная длина поля "name" - {#limit} символов',
      }),
    
    about: Joi.string()
      .min(2)
      .max(200)
      .messages({
        'string.min': 'Минимальная длина поля "about" - {#limit} символа',
        'string.max': 'Максимальная длина поля "about" - {#limit} символов',
      }),
    
    avatar: Joi.string()
      .uri()
      .messages({
        'string.uri': 'Поле "avatar" должно быть валидным URL',
      }),
  }),
});

export const validateUserBodyLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.email': 'Неверный формат email',
        'any.required': 'Поле "email" обязательно для заполнения',
        'string.empty': 'Поле "email" не может быть пустым',
      }),
    
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        'string.min': 'Пароль должен содержать минимум {#limit} символов',
        'any.required': 'Поле "password" обязательно для заполнения',
        'string.empty': 'Поле "password" не может быть пустым',
      }),
    
  }),
});