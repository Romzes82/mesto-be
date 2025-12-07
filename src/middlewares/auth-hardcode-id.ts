import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from '../types/custom-request';

export default (req: CustomRequest, _res: Response, next: NextFunction) => {
  req.user = {
    // _id: '69329e91f82b944179a7ea29',
    _id: new mongoose.Types.ObjectId('693487c3b33d8662679725d8'),
  };

  next();
};
