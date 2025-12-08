import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from '../types/custom-request';

export default (req: CustomRequest, _res: Response, next: NextFunction) => {
  req.user = {
    // _id: '69329e91f82b944179a7ea29',
    _id: new mongoose.Types.ObjectId('69329e91f82b944179a7ea29'),
  };

  next();
};
