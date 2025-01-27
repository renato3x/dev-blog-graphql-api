import { buildSchema } from 'type-graphql';
import { UserResolver } from '@resolvers/user.resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { logger } from '@logger';
import { BaseContext } from '@apollo/server';
import { container } from '@ioc/container';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { ErrorHandlerMiddleware } from '@middlewares/error-handler.middleware';

export async function bootstrap(): Promise<ApolloServer<BaseContext>> {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: () => container,
    globalMiddlewares: [LoggerMiddleware, ErrorHandlerMiddleware],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: +process.env.SERVER_PORT,
      path: '/api/graphql/',
    },
  });

  logger.info(`Server open in ${url}api/graphql/`);

  return server;
}
