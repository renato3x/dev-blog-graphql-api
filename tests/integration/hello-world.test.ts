import 'reflect-metadata';
import 'dotenv/config';

import { bootstrap } from '@/server';
import { Client } from '@tests/helpers/client';
import { beforeAll, describe, expect, test } from 'vitest';

describe('Hello World integration tests', () => {
  beforeAll(async () => {
    const { url } = await bootstrap();
    Client.setUrl(url);
  });

  test('Should respond "Hello World" message calling helloWorld query', async () => {
    const HELLO_WORLD_QUERY = `
      query {
        helloWorld
      }
    `;

    const response = await Client.query({ query: HELLO_WORLD_QUERY });
    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data.helloWorld).toBeDefined();
    expect(response.data.helloWorld).toBe('Hello World');
  });
});
