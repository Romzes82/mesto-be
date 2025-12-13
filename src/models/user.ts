import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import NotAuthorizedError from '../errors/not-authorized-error';
// import { login } from '../controllers/users';

interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
  generateToken: () => string;
}

interface IUserDoc extends mongoose.Document, IUser {}

interface IUserModel extends mongoose.Model<IUserDoc> {
  findUserByCredentials: (
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    password: string,
  ) => Promise<IUserDoc | never>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: [true, 'Поле "email" должно быть уникальным'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неверный формат email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
    },
    name: {
      type: String,
      // required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто',

    },
    about: {
      type: String,
      // required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [200, 'Максимальная длина поля "about" - 200'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      // required: [true, 'Должна быть ссылка на "avatar"'],
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  {
    versionKey: false,
  },
);

// eslint-disable-next-line func-names
userSchema.methods.generateToken = function () {
  // this - ссылка на конкретный документ пользователя
  // функцию вызываем на экземпляре
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

// eslint-disable-next-line max-len
// userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
// this - ссылка на модель User
// функцию вызываем на модели
// }

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
// this - ссылка на модель User
// функцию вызываем на модели
  return this.findOne({ email })
    .select('+password')
    .then((user: IUser) => {
      if (!user) {
        return Promise.reject(new NotAuthorizedError('Неправильные почта или пароль'));
        // тут надо обязательные поля наверное еще
      }

      // console.log(`1 - ${user}`);
      // console.log(`2 - ${password}`);
      // console.log(`3 - ${user.password}`);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthorizedError('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
});

export default mongoose.model<IUser, IUserModel>('user', userSchema);
