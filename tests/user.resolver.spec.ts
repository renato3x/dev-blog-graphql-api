import 'reflect-metadata';
import 'dotenv/config';

import { bootstrap } from '../src/server';
import { beforeAll, describe, expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { USER_FRAGMENT } from './utils/fragments/user.fragment';

let apolloServer: Awaited<ReturnType<typeof bootstrap>>;

beforeAll(async () => {
  apolloServer = await bootstrap();
});

describe('User queries', () => {
  test('returns an array of users', async () => {
    const GET_ALL_USERS_QUERY = `
      query {
        users {
          id
          name
        }
      }
    `;

    const response = await apolloServer.executeOperation({ query: GET_ALL_USERS_QUERY });

    if (response.body.kind === 'single') {
      expect(Array.isArray(response.body.singleResult.data?.users)).toBe(true);
    } else {
      throw new Error('Unexpected response kind: ' + response.body.kind);
    }
  });

  test('create a new user and returns the saved user', async () => {
    const CREATE_USER_MUTATION = `
      ${USER_FRAGMENT}
      mutation ($data: CreateUserInput!) {
        createUser(data: $data) {
          ...UserFragment
        }
      }
    `;

    const response = await apolloServer.executeOperation({
      query: CREATE_USER_MUTATION,
      variables: {
        data: {
          name: faker.person.firstName(),
          username: faker.internet.username(),
          email: faker.internet.email().toLowerCase(),
          password: faker.internet.password({ length: 8 }),
        }
      }
    });

    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.createUser).toHaveProperty('id');
      expect(response.body.singleResult.data?.createUser).toHaveProperty('createdAt');
      expect(response.body.singleResult.data?.createUser).toHaveProperty('updatedAt');
    } else {
      throw new Error('Unexpected response kind: ' + response.body.kind);
    }
  });

  test('search and return an user by id', async () => {
    const SEARCH_USER_BY_ID_QUERY = `
      ${USER_FRAGMENT}
      query ($id: String!) {
        user(id: $id) {
          ...UserFragment
        }
      }
    `;

    const response = await apolloServer.executeOperation({
      query: SEARCH_USER_BY_ID_QUERY,
      variables: {
        id: '9f7a6f8c-4c03-402c-b3b2-4bddf0b5f4f0',
      },
    });

    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.user).toHaveProperty('id');
      expect(response.body.singleResult.data?.user).toHaveProperty('name');
      expect(response.body.singleResult.data?.user).toHaveProperty('username');
      expect(response.body.singleResult.data?.user).toHaveProperty('createdAt');
      expect(response.body.singleResult.data?.user).toHaveProperty('updatedAt');
    } else {
      throw new Error('Unexpected response kind: ' + response.body.kind);
    }
  });
});
