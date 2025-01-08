import { buildSchema } from 'type-graphql';
import { UserResolver } from '@resolvers';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { logger } from '@logger';
import { BaseContext } from '@apollo/server';

export async function server(): Promise<ApolloServer<BaseContext>> {
  const schema = await buildSchema({
    resolvers: [UserResolver],
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
