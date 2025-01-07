import dotenv from 'dotenv';

dotenv.config();

import { server } from '@src/server';
import { beforeAll, describe, expect, test } from 'vitest';

let apolloServer: Awaited<ReturnType<typeof server>>;

beforeAll(async () => {
  apolloServer = await server();
});

describe('Hello world queries', () => {
  test('returns object with message \'Hello World!\'', async () => {
    const query = `
      query {
        hello {
          message
        }
      }
    `;

    const response = await apolloServer.executeOperation({ query });

    if (response.body.kind === 'single') {
      expect(response.body.singleResult.data).toEqual({
        hello: {
          message: 'Hello World!'
        }
      });
    } else {
      throw new Error('Unexpected response kind: ' + response.body.kind);
    }
  });

  test('returns object with message \'Hello GraphQL\'', async () => {
    const query = `
      query($message: String!) {
        hello(message: $message) {
          message
        }
      }
    `

    const response = await apolloServer.executeOperation({
      query,
      variables: {
        message: 'Hello GraphQL',
      },
    });

    if (response.body.kind === 'single') {
      expect(response.body.singleResult.data).toEqual({
        hello: {
          message: 'Hello GraphQL',
        },
      });
    } else {
      throw new Error('Unexpected response kind: ' + response.body.kind);
    }
  });
});
