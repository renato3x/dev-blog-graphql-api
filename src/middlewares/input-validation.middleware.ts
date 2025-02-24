import { IContext } from '@config/context.interface';
import { ErrorCodes } from '@enums/error-codes.enum';
import { ServerError } from '@errors/server.error';
import { MiddlewareFn } from 'type-graphql';

export const InputValidationMiddleware = (schema: Zod.Schema<unknown>, field: string): MiddlewareFn<IContext> => {
  return ({ args }, next) => {
    const result = schema.safeParse(args[field]);

    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);
      throw new ServerError('Invalid data', ErrorCodes.BAD_REQUEST, { errors });
    }

    return next();
  };
};
