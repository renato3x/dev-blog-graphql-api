import { IContext } from "@config/context.interface";
import { logger } from "@logger";
import { MiddlewareFn } from "type-graphql";

export const LoggerMiddleware: MiddlewareFn<IContext> = ({ info }, next) => {
  logger.info(`Executing ${info.operation.operation} ${info.fieldName}`)
  return next();
}
