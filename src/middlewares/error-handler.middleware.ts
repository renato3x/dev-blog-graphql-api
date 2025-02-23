import { IContext } from '@config/context.interface';
import { ErrorCodes } from '@enums/error-codes.enum';
import { ServerError } from '@errors/server.error';
import { logger } from '@logger';
import { GraphQLError } from 'graphql';
import { MiddlewareFn } from 'type-graphql';

export const ErrorHandlerMiddleware: MiddlewareFn<IContext> = async ({ info }, next) => {
  try {
    return await next();
  } catch (error) {
    logger.error(error, `Error in ${info.path.typename}.${info.fieldName}`);
    const timestamp = new Date().toISOString();

    if (error instanceof ServerError) {
      return new GraphQLError(error.message, {
        extensions: {
          ...error.extensions,
          timestamp,
        },
      });
    }

    return new GraphQLError('An unexpected error occurred', {
      extensions: {
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        timestamp,
      },
    });
  }
};
