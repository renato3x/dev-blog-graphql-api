import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { HelloWorldResolver } from '@hello-world/resolvers/hello-world.resolver';

export async function bootstrap(): Promise<{ url: string }> {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: +process.env.SERVER_PORT,
      path: '/graphql/',
    },
  });

  const finalUrl = `${url}graphql/`;

  return { url: finalUrl };
}
