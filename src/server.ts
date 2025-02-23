import { buildSchema } from 'type-graphql';
import { UserResolver } from '@resolvers/user.resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { logger } from '@logger';
import { container } from '@ioc/container';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { ErrorHandlerMiddleware } from '@middlewares/error-handler.middleware';

export async function bootstrap(): Promise<{ url: string }> {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: () => container,
    globalMiddlewares: [LoggerMiddleware, ErrorHandlerMiddleware],
  });

  const server = new ApolloServer({
    schema,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    formatError: (error) => {
      if (error.extensions?.stacktrace) {
        delete error.extensions.stacktrace;
      }

      return {
        message: error.message,
        extensions: error.extensions,
      };
    },
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
