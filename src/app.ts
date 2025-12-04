import express from 'express';
import mongoose from 'mongoose';

// Слушаем 3003 порт
const { PORT = 3003 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
