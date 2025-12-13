import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: mongoose.Types.ObjectId;
        // или string, если используете строковый ID
      };
    }
  }
}

export interface UserPayload extends JwtPayload {
  id: string;  // Поле из вашего токена
}