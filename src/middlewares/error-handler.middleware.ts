import { IContext } from '@config/context.interface';
import { ServerError } from '@errors/server.error';
import { logger } from '@logger';
import { GraphQLError } from 'graphql';
import { MiddlewareFn } from 'type-graphql';

export const ErrorHandlerMiddleware: MiddlewareFn<IContext> = async ({ info }, next) => {
  try {
    return await next();
  } catch (error) {
    logger.error(error, `An error occurred executing ${info.path.typename} ${info.fieldName}`);

    if (error instanceof ServerError) {
      throw new GraphQLError(error.message, {
        extensions: error.extensions,
      });
    }

    throw new GraphQLError('An unexpected error occurred', {
      extensions: {
        code: 'UNEXPECTED_ERROR',
      },
    });
  }
};
