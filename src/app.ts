import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import errorHandler from './middlewares/error-handler';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

import hardCodeUserId from './middlewares/auth-hardcode-id';

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(rateLimit());

app.use(express.json());

app.use(hardCodeUserId);
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
