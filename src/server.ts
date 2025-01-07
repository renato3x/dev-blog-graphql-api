import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from '@resolvers';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

export async function server() {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: Number(process.env.SERVER_PORT),
    },
  });

  console.log(`Server open in ${url}`);

  return server;
}
