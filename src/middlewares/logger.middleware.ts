import { IContext } from '@config/context.interface';
import { logger } from '@logger';
import { MiddlewareFn } from 'type-graphql';

export const LoggerMiddleware: MiddlewareFn<IContext> = ({ info }, next) => {
  logger.info(`Running ${info.path.typename}.${info.fieldName}`);
  return next();
};
