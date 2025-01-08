import 'reflect-metadata';
import 'dotenv/config';

import { server } from '@app/server';
import { beforeAll, describe, expect, test } from 'vitest';

let apolloServer: Awaited<ReturnType<typeof server>>;

beforeAll(async () => {
  apolloServer = await server();
});

describe('User queries', () => {
  test('returns an array of users', async () => {
    const query = `
      query {
        users {
          id
          name
        }
      }
    `;

    const response = await apolloServer.executeOperation({ query });

    if (response.body.kind === 'single') {
      expect(Array.isArray(response.body.singleResult.data?.users)).toBe(true);
    } else {
      throw new Error('Unexpected response kind: ' + response.body.kind);
    }
  });
});
