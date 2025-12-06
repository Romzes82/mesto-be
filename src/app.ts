import express from 'express';
import mongoose from 'mongoose';
// import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './middlewares/error-handler';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

import hardCodeUserId from './middlewares/auth-hardcode-id';

// Слушаем 3003 порт
const { PORT = 3003 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(hardCodeUserId);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorHandler);

// 69329e91f82b944179a7ea29

// app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
//   res.status(500).send({ message: 'На сервере произошла ошибка' });
// });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
