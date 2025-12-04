import express from 'express';
// Слушаем 3003 порт
const { PORT = 3003 } = process.env;

const app = express();

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})