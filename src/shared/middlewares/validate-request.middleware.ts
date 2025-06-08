import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const errorMessages = error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })) || [{ message: 'Validation failed' }];

      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errorMessages,
      });
    }
  };
};
