import { NextFunction, Request, Response } from 'express';

interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

export default (req: CustomRequest, _res: Response, next: NextFunction) => {
  req.user = {
    // _id: '69329e91f82b944179a7ea29',
    _id: '693487c3b33d8662679725d4',
  };

  next();
};
