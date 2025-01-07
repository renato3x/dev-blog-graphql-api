import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from '@resolvers';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { logger } from '@logger';

export async function server() {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: +process.env.SERVER_PORT,
    },
  });

  logger.info(`Server open in ${url}`);

  return server;
}
