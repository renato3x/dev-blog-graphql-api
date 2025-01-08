import 'reflect-metadata';
import 'dotenv/config';

import { bootstrap } from '../src/server';
import { beforeAll, describe, expect, test } from 'vitest';

let apolloServer: Awaited<ReturnType<typeof bootstrap>>;

beforeAll(async () => {
  apolloServer = await bootstrap();
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
