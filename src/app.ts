import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { errors } from 'celebrate';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import authRouter from './routes/auth';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
}));
app.use(rateLimit());

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

// роуты, не требующие авторизации,
// например, регистрация и логин
app.use('/', authRouter);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);
app.use(errors());
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
