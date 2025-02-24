import 'reflect-metadata';
import 'dotenv/config';

import { bootstrap } from '../src/server';
import { beforeAll, describe, expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { USER_FRAGMENT } from './utils/fragments/user.fragment';
import request from 'supertest';

describe('User queries', () => {
  let url = '';
  let userId = '';

  beforeAll(async () => {
    const server = await bootstrap();
    url = server.url;
  });

  test('returns an array of users', async () => {
    const GET_ALL_USERS_QUERY = `
      query {
        users {
          id
          name
        }
      }
    `;

    const response = await request(url).post('/').send({ query: GET_ALL_USERS_QUERY });

    expect(response.body.errors).toBeUndefined();
    expect(Array.isArray(response.body.data.users)).toBe(true);
  });

  test('block user creation if name field is missing', async () => {
    const CREATE_USER_MUTATION = `
      ${USER_FRAGMENT}
      mutation($data: JSON) {
        createUser(data: $data) {
          ...UserFragment
        }
      }
    `;

    const response = await request(url)
      .post('/')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          data: {
            username: faker.internet.username(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ length: 8 }),
          },
        },
      });

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Invalid data');
    expect(response.body.errors[0].extensions).toBeDefined();
    expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    expect(response.body.errors[0].extensions.errors).toBeDefined();
    expect(response.body.errors[0].extensions.errors).toContain('name is required');
  });

  test('create a new user and returns the saved user', async () => {
    const CREATE_USER_MUTATION = `
      ${USER_FRAGMENT}
      mutation($data: JSON) {
        createUser(data: $data) {
          ...UserFragment
        }
      }
    `;

    const response = await request(url)
      .post('/')
      .send({
        query: CREATE_USER_MUTATION,
        variables: {
          data: {
            name: faker.person.firstName(),
            username: faker.internet.username(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ length: 8 }),
          },
        },
      });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.createUser).toHaveProperty('id');
    expect(response.body.data.createUser).toHaveProperty('createdAt');
    expect(response.body.data.createUser).toHaveProperty('updatedAt');

    userId = response.body.data.createUser.id as string;
  });

  test('search and return an user by id', async () => {
    const SEARCH_USER_BY_ID_QUERY = `
      ${USER_FRAGMENT}
      query($id: String) {
        user(id: $id) {
          ...UserFragment
        }
      }
    `;

    const response = await request(url)
      .post('/')
      .send({
        query: SEARCH_USER_BY_ID_QUERY,
        variables: {
          id: userId,
        },
      });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.user).toHaveProperty('id');
    expect(response.body.data.user).toHaveProperty('name');
    expect(response.body.data.user).toHaveProperty('username');
    expect(response.body.data.user).toHaveProperty('createdAt');
    expect(response.body.data.user).toHaveProperty('updatedAt');
  });

  test('update data from user by id', async () => {
    const UPDATE_USER_DATA_MUTATION = `
      ${USER_FRAGMENT}
      mutation($id: String, $data: JSON) {
        updateUser(id: $id, data: $data) {
          ...UserFragment
        }
      }
    `;

    const data = {
      username: faker.internet.username().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
    };

    const response = await request(url)
      .post('/')
      .send({
        query: UPDATE_USER_DATA_MUTATION,
        variables: {
          id: userId,
          data,
        },
      });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.updateUser).toHaveProperty('id');
    expect(response.body.data.updateUser).toHaveProperty('name');
    expect(response.body.data.updateUser).toHaveProperty('username');
    expect(response.body.data.updateUser).toHaveProperty('createdAt');
    expect(response.body.data.updateUser).toHaveProperty('updatedAt');
  });

  test('delete an user by id', async () => {
    const DELETE_USER_MUTATION = `
      mutation($id: String) {
        deleteUser(id: $id)
      }
    `;

    const response = await request(url)
      .post('/')
      .send({
        query: DELETE_USER_MUTATION,
        variables: {
          id: userId,
        },
      });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.deleteUser).toBeDefined();
    expect(typeof response.body.data.deleteUser === 'string').toBe(true);
  });
});
