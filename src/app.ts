import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middlewares/error-handler';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

import hardCodeUserId from './middlewares/auth-hardcode-id';

const { PORT = 3003 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(hardCodeUserId);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
