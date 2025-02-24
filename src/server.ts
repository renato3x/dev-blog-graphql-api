import { buildSchema } from 'type-graphql';
import { UserResolver } from '@resolvers/user.resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { logger } from '@logger';
import { container } from '@ioc/container';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { ErrorHandlerMiddleware } from '@middlewares/error-handler.middleware';
import { formatError } from '@config/format-error';

export async function bootstrap(): Promise<{ url: string }> {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: () => container,
    globalMiddlewares: [LoggerMiddleware, ErrorHandlerMiddleware],
    nullableByDefault: true,
  });

  const server = new ApolloServer({
    schema,
    formatError,
  });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: +process.env.SERVER_PORT,
      path: '/graphql/',
    },
  });

  const finalUrl = `${url}graphql/`;
  logger.info(`Server open in ${finalUrl}`);

  return { url: finalUrl };
}
