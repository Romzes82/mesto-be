import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import errorHandler from './middlewares/error-handler';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import authRouter from './routes/auth'
import auth from './middlewares/auth';
import cookieParser from 'cookie-parser';

// import hardCodeUserId from './middlewares/auth-hardcode-id';

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(rateLimit());

app.use(express.json());
app.use(cookieParser());

// app.use(hardCodeUserId);
// роуты, не требующие авторизации,
// например, регистрация и логин
app.use('/', authRouter);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorHandler);

/* eslint-disable no-console */
const run = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);

    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
