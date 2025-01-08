import { Container } from 'inversify';
import { TYPES } from './types';

import { UserRepository } from '@repositories/user.repository';

import { UserService } from '@services/user.service';

import { UserResolver } from '@resolvers/user.resolver';

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserResolver>(UserResolver).toSelf();

export { container };
